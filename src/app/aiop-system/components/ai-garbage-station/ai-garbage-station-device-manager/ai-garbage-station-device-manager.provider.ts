import { AIGarbageStationDeviceManagerBusiness } from './ai-garbage-station-device-manager.business';
import { AIGarbageStationDeviceManagerDivisionController } from './controller/ai-garbage-station-device-manager-division.controller';
import { AIGarbageStationDeviceManagerStatusController } from './controller/ai-garbage-station-device-manager-status.controller';
import { AIGarbageStationDeviceManagerController } from './controller/ai-garbage-station-device-manager.controller';

export const AIGarbageStationDeviceManagerProviders = [
  AIGarbageStationDeviceManagerStatusController,
  AIGarbageStationDeviceManagerDivisionController,
  AIGarbageStationDeviceManagerController,
  AIGarbageStationDeviceManagerBusiness,
];
