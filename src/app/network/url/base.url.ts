/*
 * @Author: pmx
 * @Date: 2021-09-13 15:05:38
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 14:46:28
 */
const BaseAiopUrl = '/api/howell/ver10/aiop_service';
const BaseGarbageUrl = '/api/howell/ver10/aiop_service/garbage_management';
const BaseUserUrl = '/howell/ver10/data_service/user_system';
const BaseSmsUrl = '/howell/ver10/data_service/short_message/sms';

// 垃圾清运
const BaseGarbageVehicleUrl = '/api/howell/ver10/aiop_service/garbage_vehicles';

export interface InnerUrl {
  basic(): string;
}

export {
  BaseGarbageUrl,
  BaseUserUrl,
  BaseAiopUrl,
  BaseSmsUrl,
  BaseGarbageVehicleUrl,
};
