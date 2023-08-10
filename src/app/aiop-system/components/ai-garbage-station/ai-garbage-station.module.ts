import { AIGarbageStationDeviceCameraComponent } from './ai-garbage-station-device-camera/ai-garbage-station-device-camera.component';
import { AIGarbageStationDeviceCommandComponent } from './ai-garbage-station-device-command/ai-garbage-station-device-command.component';
import { AIGarbageStationDeviceDetailsComponent } from './ai-garbage-station-device-details/ai-garbage-station-device-details.component';
import { AIGarbageStationDeviceDropWindowComponent } from './ai-garbage-station-device-drop-window/ai-garbage-station-device-drop-window.component';
import { AIGarbageStationDeviceManagerComponent } from './ai-garbage-station-device-manager/ai-garbage-station-device-manager.component';
import { AIGarbageStationDeviceRecordCommandManagerComponent } from './ai-garbage-station-device-record-command-manager/ai-garbage-station-device-record-command-manager.component';
import { AIGarbageStationDeviceRecordEventManagerComponent } from './ai-garbage-station-device-record-event-manager/ai-garbage-station-device-record-event-manager.component';
import { AIGarbageStationDeviceScheduleComponent } from './ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.component';
import { AIGarbageStationRegionBuildingComponent } from './ai-garbage-station-region-building/ai-garbage-station-region-building.component';
import { AIGarbageStationRegionManagerComponent } from './ai-garbage-station-region-manager/ai-garbage-station-region-manager.component';
import { AIGarbageStationRegionStationComponent } from './ai-garbage-station-region-station/ai-garbage-station-region-station.component';
import { AIGarbageRegionTreeComponent } from './ai-garbage-station-region-tree/ai-garbage-station-region-tree.component';
import { AIGarbageStationRfidCardDetailsComponent } from './ai-garbage-station-rfid-card-details/ai-garbage-station-rfid-card-details.component';
import { AIGarbageStationRfidCardManagerComponent } from './ai-garbage-station-rfid-card-manager/ai-garbage-station-rfid-card-manager.component';

export const AIGarbageStationComponents = [
  AIGarbageStationRegionBuildingComponent,
  AIGarbageStationRegionStationComponent,
  AIGarbageStationRegionManagerComponent,

  AIGarbageStationDeviceCommandComponent,
  AIGarbageStationDeviceDetailsComponent,
  AIGarbageStationDeviceDropWindowComponent,
  AIGarbageStationDeviceCameraComponent,
  AIGarbageStationDeviceScheduleComponent,
  AIGarbageStationDeviceManagerComponent,

  AIGarbageStationDeviceRecordEventManagerComponent,
  AIGarbageStationDeviceRecordCommandManagerComponent,

  AIGarbageStationRfidCardDetailsComponent,
  AIGarbageStationRfidCardManagerComponent,

  AIGarbageRegionTreeComponent,
];
