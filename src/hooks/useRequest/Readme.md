# useRequest
网络请求的hooks
- 1.基础用法
- 2.自动请求/手动请求
- 3.防抖
- 4.节流
- 5.轮询
- 6.错误重试
- 7.依赖刷新
- 8.并发请求
- 9.自定义插件

## 1.基础用法 

注意:返回值类型和参数类型定义在api层面

```typescript
import useRequest from '@/hooks/useRequest/index.ts'
const { run, data, loading } = useRequest(getUserInfo);

const eventFn = (e: Event | any) => {
	run(e?.target?.value)
}
```
<DemoPreview compName="Request" demoName="default" />

## 2.手动触发

默认自动触发 如果设置了 `options.manual = true`，则 `useRequest` 不会默认执行，需要通过 `run` 来触发执行。
```typescript
const { run, data, loading } = useRequest(getUserInfo,{manual: true});
```
<DemoPreview compName="Request" demoName="manual" />

## 3.防抖

`useRequest` 提供了一个 `options.debounceWait` 参数，进入防抖模式，此时如果频繁触发 `run` ，则会以防抖策略进行请求。
```typescript
const { run: run1, data: data1, loading: loading1 } = useRequest(getUserInfo, {
  manual: true,
  debounceWait: 2000
});
const { run: run2, data: data2, loading: loading2 } = useRequest(getUserInfo, {
  debounceLeading: true,
  debounceTrailing: false,
  manual: true,
  debounceWait: 2000
});
```
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| debounceWait | 防抖等待时间, 单位为毫秒，设置后，进入防抖模式 | `number` | - |
| debounceLeading | 在延迟开始前执行调用 | `boolean`\|`Ref<boolean>` | `false` |
| debounceTrailing | 在延迟结束后执行调用 | `boolean`\|`Ref<boolean>` | `true` |

<DemoPreview compName="Request" demoName="debounce" />

## 4.节流

`useRequest` 提供了一个 `options.debounceWait` 参数，进入防抖模式，此时如果频繁触发 `run` ，则会以防抖策略进行请求。
```typescript
const { run, data, loading } = useRequest(getUserInfo, {
  manual: true,
  throttleWait: 2000
});
```
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| throttleWait | 节流等待时间, 单位为毫秒，设置后，进入节流模式 | `number` | - |
| throttleLeading | 在节流开始前执行调用 | `boolean`\|`Ref<boolean>` | `true` |
| throttleTrailing | 在节流结束后执行调用 | `boolean`\|`Ref<boolean>` | `true` |

<DemoPreview compName="Request" demoName="throttle" />

## 5.轮询

通过设置 `options.polling`，进入轮询模式，`useRequest` 会定时触
发 `service` 执行，`pollingInterval`不填默认2000。
```typescript
const { run, data, loading } = useRequest(getUserInfo, {
  manual: true,
  polling: true,
  pollingInterval:3000
});
```
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| polling | 是否开启轮询 | `boolean`\|`Ref<boolean>` | - |
| pollingInterval | 轮询间隔 | `number`\|`Ref<number>` | 2000 |

<DemoPreview compName="Request" demoName="polling" />

## 6.错误重试

`useRequest` 提供了一个 `options.retryCount` 参数，指定错误重试次数，则 `useRequest` 在失败后会进行重试

```typescript
const { run, data, loading } = useRequest(getUserInfoErr, {
  manual: true,
  retryCount: 3,
  retryInterval: 2000
});
```
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| retryCount | 错误重试次数。如果设置为 `-1`，则无限次重试。 | `number`\|`Ref<number>` | - |
| retryInterval | 重试时间间隔，单位为毫秒。如果不设置，默认采用简易的指数退避算法，取 `1000 * 2 ** retryCount`，也就是第一次重试等待 2s，第二次重试等待 4s，以此类推，如果大于 30s，则取 30s | `number`\|`Ref<number>` | - |

<DemoPreview compName="Request" demoName="retry" />

## 7.依赖收集

当 `refreshDeps` 传入的是响应式对象数组的时候，当它的值变化后，会重新触发请求，参数为`refreshDepsParams` 。

当`selectValue.value`改变时重新请求，参数为{ id: 2 }
```typescript
const { run, data, loading } = useRequest(getUserInfo, {
  manual: false,
  refreshDeps: [() => selectValue.value],
  refreshDepsParams: computed(() => { return [{ id: 2 }]; })
});
```
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| refreshDeps | 依赖响应式对象数组,和 `vue` 的 `watch` 传入监听的对象用法一致。| `WatchSource[]` | `-` |
| refreshDepsParams | 依赖响应后的请求参数，可以动态变化。| `ComputedRef<Params>` | `-` |

<DemoPreview compName="Request" demoName="watch" />


## 8.并发请求 （同请求 参数不同 使用地方不同）

当多个地方使用同一个请求，参数不同且使用返回数据独立时可以使用该功能，传入必要参数 `queryKey` ,获取每个请求的唯一标识, queryKey返回的参数需要是唯一的，获取到的data,loading,cancel,err需要通过该标识获取

```typescript
const { run, queries: dataList } = useRequest(getUserInfo, {
  manual: false,
  queryKey: (params) => String(params.id),
  defaultParams: [{ id: '对应的key,要能再queryKey内生成key' }]
});

const { run, queries: dataList } = useRequest(getUserInfo, {
  manual: false,
  queryKey: (params) => String(params.id),
  defaultParams: [[{ id: 2 }], [{ id: 3 }], [{ id: 1 }]]
});
```

注意:如上例子，获取到的数据记录在`queries`内，通过`params.id`区分
注意！！！:manual为false时且需要并发请求，defaultParams需要是数组形式的P,即P[]
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| queryKey | 获取 key，用于注入 useRequest 的 queries中达到唯一效果 | `(...args: P) => string ` | `-` |
| defaultParams | 默认参数,manual为false时，defaultParams必填 | `和参数类型相同`P|P[] | `-` |

<DemoPreview compName="Request" demoName="concurrency" />


## 9.自定义插件

当用户需要自定义处理请求前中后的逻辑时，可使用约定式插件使其具备定制化能力 。通过设置第三个参数plugins，为useRequest 添加插件，useRequest 会触发插件执行。
插件作为一个符合 useRequest 插件运行的函数，需要符合运行规范进行开发。
倡导以 use 作为开头,以 Plugin 结尾命名的插件，useXxxxPlugin

```typescript
const { run, data } = useRequest(getUserInfo, {
  manual: true
}, [useCustomPlugin]);
//拦截请求，自定义返回内容
function useCustomPlugin(server: (...arg: any) => any, options: any) {
  return {
    fn: server,
    onBefore: () => {
      options.cancelService.value();
    },
    onSuccess: (args:any) => {
      //...
    },
    onCancel: (args:any) => {
      options.setData.value({ name: '我是自定义组件内容', id: args[0].id });
    }
  };
}
```
- 第一个参数server

自定义插件返回的函数必须返回一个fn参数，为处理后或原封不动的请求（来自于函数的第一个参数`server`）
其余返回值为可选的插件触发生命周期
```typescript
interface PluginReturn<T, P extends any[]> {
  fn:(...arg:any) => any
  onBefore?: (params: P) => void
  onSuccess?: (params: P, data: T) => void
  onError?: (params: P, e: Error) => void
  onFinally?: (params: P, data?: T) => void
  onCancel?: (params: P) => void
}
```

- 第二个参数options

包含useRequest传入的所有options和内置方法
```typescript
interface PluginMethodsType {
  currentKey: string | symbol //当前请求的唯一key
  setData?: (...arg:any) => void //修改当前的返回值data
  cancelService?: () => void //取消当前请求
}
```

<DemoPreview compName="Request" demoName="custom" />


