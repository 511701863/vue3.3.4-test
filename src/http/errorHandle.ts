
import Codes from './errorCode';
import { createDiscreteApi } from 'naive-ui';
import { useAppStore } from '@/store/modules/app';
const { message } = createDiscreteApi(['message']);

const obj:any = {
  401: () => {
    message.error('用户信息已过期');
    const appStore = useAppStore();
    appStore.logout();
  },
  default: (errorCode:string, msg:string) => {
    if (!errorCode) {
      return;
    }

    const ErrorCode:Record<string, any> = Codes;

    // errorCode不存在错误码时展示后端返回errorMessage, 否则展示映射提示
    if(!ErrorCode[errorCode]) {
      return message.error(msg);
    }

    message.error(ErrorCode[errorCode]);
    if(['server-admin.0123', 'server-admin.0125'].includes(errorCode)) {
      const appStore = useAppStore();
      appStore.logout();
    }
    return;
  }
};

export default function(res:Record<string, any>) {
  if (Object.prototype.hasOwnProperty.call(obj, res.errorCode)) {
    obj[res.errorCode](res.msg || res.errorMessage);
    return;
  }

  obj.default(res.errorCode, res.errorMessage);
}
