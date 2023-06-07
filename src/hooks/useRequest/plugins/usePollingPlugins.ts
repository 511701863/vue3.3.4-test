import { Options, PluginMethodsType } from '../../../types/http';

function usePollingPlugins<T, P extends any[] = any[]>(
  serviceFn: any,
  { polling, pollingInterval }: Options<T, P> & PluginMethodsType
) {
  const timer: any = ref(null);
  if (!polling) {
    return { fn: serviceFn };
  }
  const stopPolling = () => {
    if (timer.value) {
      clearTimeout(timer.value);
    }
  };
  onUnmounted(() => {
    stopPolling();
  });
  watchEffect(() => {
    if (!unref(polling)) {
      stopPolling();
    }
  });
  return {
    fn:serviceFn,
    onBefore:() => {
      stopPolling();
    },
    onFinally: (arg: any) => {
      console.log('onFinally', ...arg);
      timer.value = setTimeout(() => {
        serviceFn(...arg);
      }, unref(pollingInterval) ?? 2000);
    },
    onCancel: () => {
      stopPolling();
    }
  };
}

export default usePollingPlugins;
