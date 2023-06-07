import { throttle } from 'lodash-es';
import { Options } from '../../../types/http';

function useThrottlePlugins<T, P extends any[] = any[]>(
  serviceFn: any,
  { throttleWait, throttleLeading, throttleTrailing }: Options<T, P>
) {
  if (!throttleWait) {
    return {fn:serviceFn};
  }
  const options = computed(() => {
    return {
      leading:unref(throttleLeading) ?? true,
      trailing:unref(throttleTrailing) ?? true
    };
  });
  return {
    fn:throttle((...arg: any[]) => {
      serviceFn(...arg);
    }, unref(throttleWait), options.value),
    onSuccess:(arg:any) => {
      console.log('throttleSuccess', arg);
    }
  };
}

export default useThrottlePlugins;
