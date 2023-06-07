import { AppAxiosResponse } from '@/types/http';
import axios, { AxiosRequestConfig, Canceler } from 'axios';
import { signUrl } from '@/utils/signurl';
import ErrorHandle from './errorHandle';
import { isFileStream } from '../utils/is';
import { AxiosCanceler } from './axiosCanceler';
const axiosCanceler = new AxiosCanceler();
import { load } from '@/utils/loading.js';

const instance = axios.create({
  timeout: 30 * 1000,
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL
});

/**
 * request 成功回调
 * @param {*} config
 * @returns
 */
const requestSuccess = function(request:any) {
  const signUrls = signUrl(request);

  request.params = Object.assign(signUrls, request.params);
  return request;
};

/**
 * request 失败回调
 * @param {*} err
 * @returns
 */
const requestError = function(err:any) {
  return Promise.reject(err);
};

/**
 * response 成功回调
 * @param {*} response
 * @returns
 */
const responseSuccess = function(response:any) {
  // 请求完成后将该请求在 axiosCanceler 移除
  axiosCanceler.removePending(response.config);
  const res = response.data;
  if (!isFileStream(res) && res.status !== 'SUCCEED' && res.code !== 200) {
    ErrorHandle(res);
    return Promise.reject(res);
  }
  return Promise.resolve(response);
};

/**
 * response 失败回调
 * @param {*} err
 * @returns
 */
const responseError = function(err:any) {
  // 判断当前请求错误的原因是否是主动 Cancel
  if (axios.isCancel(err)) {
    return Promise.reject(err);
  }
  ErrorHandle((err || {}).response);
  return Promise.reject(err);
};

instance.interceptors.request.use(requestSuccess, requestError);
instance.interceptors.response.use(responseSuccess, responseError);

export function request<T = any>(config: AxiosRequestConfig & { hasLoading?: boolean, NewOrgId?:boolean, needCancel?:boolean }): Promise<AppAxiosResponse<T>> {
  const { hasLoading, needCancel = true } = config;
  if(hasLoading) {
    load.show();
  }
  const cancel = ref<Canceler>();
  //是否记录取消请求，防止请求重复触发
  if(needCancel) {
    cancel.value = axiosCanceler.addPending(config);
  }else{
    config.cancelToken = new axios.CancelToken((c) => {
      cancel.value = c;
    });
  }
  const request = instance({
    ...config
  }).then((res) => {
    if(res.data?.status === 'FAILED') {
      ErrorHandle(res.data);
      return Promise.reject(res.data);
    }
    return res;
  }).catch((err) => {
    ErrorHandle(err?.response?.data);
    return Promise.reject(err);
  }).finally(() => {
    if(hasLoading) {
      load.hide();
    }
  });
  request.cancel = cancel;

  return request;
}
