import { Options } from '../../../types/http';

function useRetryPlugins<T, P extends any[] = any[]>(
  serviceFn: any,
  { retryInterval, retryCount }: Options<T, P>
) {
  if (!retryCount) {
    return { fn: serviceFn };
  }
  const timer: any = ref(null);
  //错误数
  const countRef = ref(0);
  const triggerFlag = ref(false);
  return {
    fn: serviceFn,
    onBefore: (arg: any) => {
      //如果连续点击，只有当定时器回调执行时才开始计数
      if (!triggerFlag.value) {
        countRef.value = 0;
      }
      triggerFlag.value = false;
      //如果连续点击不触发定时器内容
      if (timer.value) {
        clearTimeout(timer.value);
      }
    },
    onSuccess: (arg: any) => {
      countRef.value = 0;
    },
    onCancel: (arg: any) => {
      countRef.value = 0;
      if (timer.value) {
        clearTimeout(timer.value);
      }
    },
    onError: (arg: any) => {
      countRef.value += 1;

      if (retryCount === -1 || countRef.value <= retryCount) {
        timer.value = setTimeout(() => {
          triggerFlag.value = true;
          serviceFn(...arg);
        }, unref(retryInterval) ?? Math.min(1000 * 2 ** countRef.value, 20000));
      } else {
        //如果超过重试次数，清空错误数，停止重试
        countRef.value = 0;
      }
    }
  };
}

export default useRetryPlugins;
