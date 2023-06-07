import { AxiosResponse, Canceler } from 'axios';
import { ComputedRef, WatchSource, Ref } from 'vue';
import { request } from '@/http';

export type RequestType = (...args:any) => ReturnType<typeof request>

export type Response<T> = {
  status: number;
  data: T;
  total?:number;
};

export type AppAxiosResponse<T = any> = AxiosResponse<Response<T>>;

//获取api层定义的返回类型
export type getTReturnType<D> = Awaited<ReturnType<D>>['data']['data']

export interface HttpError<T = any> {
  status: number | string;
  data: T;
  mag: string;
}

export type Service<T, P extends any[]> = (...args: P) => Promise<AppAxiosResponse<T>>;

export interface Options<T, P extends any[]> {
  // 是否手动发起请求
  manual?: boolean;

  // 当 manual 为 false 时，自动执行的默认参数
  defaultParams?: P | P[];

  // 依赖项更新
  refreshDeps?: WatchSource<any>[];
  refreshDepsParams?: ComputedRef<P>;

  // 是否关闭重复请求，当 queryKey 存在时，该字段无效
  repeatCancel?: boolean;

  // 并发请求
  queryKey?: (...args: P) => string;
  // 请求前
  onBefore?: (params: P) => void;
  // 成功回调
  onSuccess?: (response: getTReturnType<T>, params: P) => void;
  // 最终回调
  onFinally?: (params: P) => void;

  // 失败回调
  onError?: (err: HttpError, params: P) => void;
  // 防抖
  debounceWait?:number | Ref<number>;
  // 防抖是否立即执行
  debounceLeading?:boolean | Ref<boolean>;
  // 防抖指定在延迟结束后调用
  debounceTrailing?:boolean | Ref<boolean>;
  // 节流
  throttleWait?:number | Ref<number>;
  // 节流是否立即执行
  throttleLeading?:boolean | Ref<boolean>;
  // 节流指定在延迟结束后调用
  throttleTrailing?:boolean | Ref<boolean>;
  //错误重试间隔
  retryInterval?:number | Ref<number>;
  //错误重试次数
  retryCount?:number | Ref<number>;
  polling?:boolean;
  pollingInterval?:number | Ref<number>;
}

export interface Result<T = any> {
  data: getTReturnType<T>;
  loading?: boolean;
  cancel?: Canceler;
  err?: HttpError;
}

export interface PluginReturn<T, P extends any[]> {
  onBefore?: (params: P) => void
  onSuccess?: (params: P, data: getTReturnType<T>) => void
  onError?: (params: P, e: Error) => void
  onFinally?: (params: P, data?: getTReturnType<T>) => void
  onCancel?: (params: P) => void
}

export interface UseRequestPlugin<T, P extends unknown[] = unknown[], TPlugin = any> {
  (
    requestInstance: (...arg:any) => any,
    options: Options<getTReturnType<T>, P>,
  ): PluginReturn<getTReturnType<T>, P> & {fn:(...arg:any) => any}
}

export interface PluginMethodsType {
  currentKey: string | symbol
  setData?: (...arg:any) => void
  cancelService?: () => void
}

declare global {
  interface Promise{
    cancel: any;
  }
}
