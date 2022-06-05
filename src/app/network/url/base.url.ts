/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:38
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-13 15:41:24
 */
const BaseGarbageUrl = '/api/howell/ver10/aiop_service/garbage_management';
const BaseUserUrl = '/howell/ver10/data_service/user_system';
const BaseAiopUrl = '/api/howell/ver10/aiop_service';
const BaseSmsUrl = "/howell/ver10/data_service/short_message/sms";

export interface InnerUrl {
  basic(): string;
}

export { BaseGarbageUrl, BaseUserUrl, BaseAiopUrl, BaseSmsUrl };
