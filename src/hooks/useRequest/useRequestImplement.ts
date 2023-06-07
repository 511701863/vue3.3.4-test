import { HttpError, Options, PluginMethodsType, PluginReturn, Result, RequestType, UseRequestPlugin } from '@/types/http';
import { isEmpty } from 'lodash-es';
const defaultQueries = Symbol('default');

function useRequestImplement<T extends RequestType, P extends any[] = any[]>(
  service: T,
  options: Options<T, P> = {},
  plugins: UseRequestPlugin<T, P>[]
) {
  //请求计数  包括取消了的请求
  const count = ref(0);
  const {
    manual = false,
    defaultParams = ([] as unknown as P),
    repeatCancel = false,
    refreshDeps = null,
    refreshDepsParams = null,
    queryKey = null
  } = options;

  const queries = reactive<Record<string | symbol, Result<T>>>({
    [defaultQueries]: {
      data: null,
      loading: false,
      cancel: () => null,
      err: undefined
    }
  });
  //组件使用方法
  const pluginMethods: PluginMethodsType = reactive({
    currentKey: defaultQueries,
    setData: (data: any) => {
      queries[pluginMethods.currentKey].data = data;
    },
    cancelService: () => {
      queries[pluginMethods.currentKey].cancel?.();
    }
  });
  const serviceFn = async(...args: P) => {
    //请求计数  如果请求取消 两者将不一致 不会出发插件的onFinally
    count.value += 1;
    const currentCount = count.value;
    //有queryKey为并发请求，设置queryKey为请求唯一标识key
    const key = queryKey ? queryKey(...args) : defaultQueries;
    //记录当前请求的唯一key
    pluginMethods.currentKey = key;
    if (!queries[key]) {
      queries[key] = {} as any;
    }
    //是否清空之前未完成的重复请求，并发请求不触发cancel
    if (!queryKey && repeatCancel) {
      queries[key].cancel?.();
    }
    queries[key].loading = true;
    // 请求前返回
    options.onBefore?.(args);
    const instance = service(...args);
    const cancel = instance.cancel;
    queries[key].cancel = () => {
      count.value += 1;
      cancel?.value?.();
      runPluginHandler('onCancel', args);
    };
    runPluginHandler('onBefore', args);
    instance.then((res) => {
      queries[key].data = res.data.total ? res.data : res.data.data;
      runPluginHandler('onSuccess', args, queries[key].data);
      // 请求成功时清空之前的错误信息
      queries[key].err = undefined;
      if (typeof options.onSuccess === 'function') {
        options.onSuccess?.(res.data.total ? res.data : res.data.data, args);
      }

    })
      .catch((err: HttpError) => {
        queries[key].err = err;
        runPluginHandler('onError', args, err);
        if (typeof options.onError === 'function') {
          options.onError?.(err, args);
        }
      })
      .finally(() => {
        if (currentCount === count.value) {
          runPluginHandler('onFinally', args, queries[key].data);
        }
        if (typeof options.onFinally === 'function') {
          options.onFinally?.(args);
        }
        queries[key].loading = false;
      });
  };
  //插件生命周期列表
  const pluginsImf: any = ref([]);
  // 初始运行插件,类似洋葱模型
  const pluginsServers = plugins.reduce((pre, cur) => {
    //fn被插件包装过后的方法  rest为插件生命周期
    const { fn, ...rest } = cur(pre, Object.assign(options, toRefs(pluginMethods), { queries }));
    if (!isEmpty(rest)) {
      pluginsImf.value.push(rest);
    }
    return fn;
  }, serviceFn);
  //插件生命周期触发
  function runPluginHandler(event: keyof PluginReturn<T, P>, ...rest: any[]) {
    const r = (pluginsImf.value.map((i: any) => i[event]?.(...rest)) ?? [])?.filter(Boolean);
    return Object.assign({}, ...r);
  }
  // 依赖更新
  if (refreshDeps) {
    watch(refreshDeps, () => {
      pluginsServers(...(refreshDepsParams?.value || ([] as unknown as P)));
    }, { deep: true });
  }
  const run = pluginsServers;

  // 自动执行
  if (!manual) {
    if (queryKey && Array.isArray(defaultParams[0])) {
      defaultParams.forEach((item) => {
        run(...item);
      });
    } else {
      run(...defaultParams as P);
    }
  }

  // 组件卸载的时候取消所有请求
  onUnmounted(() => {
    for (const key in queries) {
      queries[key]?.cancel?.();
    }
  });
  return {
    run,
    queries,
    ...toRefs(queries[defaultQueries])
  };
}
export default useRequestImplement;
