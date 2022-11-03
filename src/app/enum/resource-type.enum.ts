/*
 * @Author: pmx
 * @Date: 2022-11-03 16:15:32
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-03 16:17:13
 */
export enum ResourceType {
  /**监控点 */
  Camera = 'Camera',
  /**编码设备 */
  EncodeDevice = 'EncodeDevice',
  /**物联网传感器 */
  IoTSensor = 'IoTSensor',
  /**垃圾房 */
  GarbageStation = 'GarbageStation',
}

export enum VehicleResourceType {
  // 监控点
  Camera = 'Camera',

  // 清运车辆
  GarbageVehicle = 'GarbageVehicle',
}
