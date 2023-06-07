import useRequestImplement from './useRequestImplement';
import useDebouncePlugin from './plugins/useDebouncePlugin';
import usePollingPlugins from './plugins/usePollingPlugins';
import useThrottlePlugins from './plugins/useThrottlePlugins';
import useRetryPlugins from './plugins/useRetryPlugins';

import { Options, UseRequestPlugin, RequestType } from '@/types/http';

function useRequest<
  T extends RequestType,
  P extends unknown[] = unknown[],
  PluginsOptions extends UseRequestPlugin<T, P>[] = UseRequestPlugin<T, P>[]
>(
  service: T,
  options?: Options<T, P>,
  plugins?: PluginsOptions
) {
  return useRequestImplement<T, P>(service, options, [
    useDebouncePlugin,
    usePollingPlugins,
    useThrottlePlugins,
    useRetryPlugins,
    ...(plugins || [])
  ] as UseRequestPlugin<T, P>[]);
}

export default useRequest;
