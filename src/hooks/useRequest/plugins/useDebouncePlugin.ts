import { debounce } from 'lodash-es';
import { Options } from '../../../types/http';

function useDebouncePlugin<T, P extends any[] = any[]>(
  serviceFn: any,
  { debounceWait, debounceLeading, debounceTrailing }: Options<T, P>
) {
  if (!debounceWait) {
    return {fn:serviceFn};
  }
  const options = computed(() => {
    return {
      leading:unref(debounceLeading) ?? false,
      trailing:unref(debounceTrailing) ?? true
    };
  });
  return {
    fn:debounce((...arg: any[]) => {
      console.log('debounceon');
      serviceFn(...arg);
    }, unref(debounceWait), options.value),
    onSuccess:(arg:any) => {
      console.log('debounceonSuccess', arg);
    }
  };
}

export default useDebouncePlugin;
