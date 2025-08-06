import { AIGarbageStationDeviceCameraComponent } from './ai-garbage-station-device-camera/ai-garbage-station-device-camera.component';
import { AIGarbageStationDeviceCommandComponent } from './ai-garbage-station-device-command/ai-garbage-station-device-command.component';
import { AiGarbageStationDeviceCommandComponents } from './ai-garbage-station-device-commands/ai-garbage-station-device-commands.module';
import { AIGarbageStationDeviceDetailsComponent } from './ai-garbage-station-device-details/ai-garbage-station-device-details.component';
import { AIGarbageStationDeviceDropWindowComponent } from './ai-garbage-station-device-drop-window/ai-garbage-station-device-drop-window.component';
import { AIGarbageStationDeviceManagerComponent } from './ai-garbage-station-device-manager/ai-garbage-station-device-manager.component';
import { AIGarbageStationDeviceRecordCommandManagerComponent } from './ai-garbage-station-device-record-command-manager/ai-garbage-station-device-record-command-manager.component';
import { AIGarbageStationDeviceRecordEventManagerComponent } from './ai-garbage-station-device-record-event-manager/ai-garbage-station-device-record-event-manager.component';
import { AiGarbageStationDeviceScheduleDoorComponent } from './ai-garbage-station-device-schedule-door/ai-garbage-station-device-schedule-door.component';
import { AiGarbageStationDeviceScheduleFanComponent } from './ai-garbage-station-device-schedule-fan/ai-garbage-station-device-schedule-fan.component';
import { AiGarbageStationDeviceScheduleSprayComponent } from './ai-garbage-station-device-schedule-spray/ai-garbage-station-device-schedule-spray.component';
import { AIGarbageStationDeviceScheduleComponent } from './ai-garbage-station-device-schedule/ai-garbage-station-device-schedule.component';
import { AIGarbageStationDeviceSessionListComponent } from './ai-garbage-station-device-session-list/ai-garbage-station-device-session-list.component';
import { AIGarbageStationDeviceSessionManagerComponent } from './ai-garbage-station-device-session-manager/ai-garbage-station-device-session-manager.component';
import { AiGarbageStationDeviceSessionMessageHistoryManagerComponent } from './ai-garbage-station-device-session-message-history/ai-garbage-station-device-session-message-history-manager/ai-garbage-station-device-session-message-history-manager.component';
import { AiGarbageStationDeviceSessionMessageHistoryTableComponent } from './ai-garbage-station-device-session-message-history/ai-garbage-station-device-session-message-history-table/ai-garbage-station-device-session-message-history-table.component';
import { AiGarbageStationDeviceStatusFilterComponent } from './ai-garbage-station-device-status-filter/ai-garbage-station-device-status-filter.component';
import { AiGarbageStationDeviceStatusItems } from './ai-garbage-station-device-status-items/ai-garbage-station-device-status-items.module';
import { AiGarbageStationDeviceStatusComponent } from './ai-garbage-station-device-status/ai-garbage-station-device-status.component';
import { AIGarbageStationDropWindowListComponent } from './ai-garbage-station-drop-window-list/ai-garbage-station-drop-window-list.component';
import { AIGarbageStationRegionBuildingComponent } from './ai-garbage-station-region-building/ai-garbage-station-region-building.component';
import { AIGarbageStationRegionManagerComponent } from './ai-garbage-station-region-manager/ai-garbage-station-region-manager.component';
import { AIGarbageStationRegionStationComponent } from './ai-garbage-station-region-station/ai-garbage-station-region-station.component';
import { AIGarbageRegionTreeComponent } from './ai-garbage-station-region-tree/ai-garbage-station-region-tree.component';
import { AIGarbageStationRfidCardDetailsComponent } from './ai-garbage-station-rfid-card-details/ai-garbage-station-rfid-card-details.component';
import { AIGarbageStationRfidCardManagerComponent } from './ai-garbage-station-rfid-card-manager/ai-garbage-station-rfid-card-manager.component';
import { AiGarbageStationWeekListComponent } from './ai-garbage-station-week-list/ai-garbage-station-week-list.component';

export const AIGarbageStationComponents = [
  AIGarbageStationRegionBuildingComponent,
  AIGarbageStationRegionStationComponent,
  AIGarbageStationRegionManagerComponent,

  AIGarbageStationDeviceSessionListComponent,
  AIGarbageStationDeviceCommandComponent,
  ...AiGarbageStationDeviceCommandComponents,
  AIGarbageStationDeviceDetailsComponent,
  AIGarbageStationDeviceDropWindowComponent,
  AIGarbageStationDeviceCameraComponent,
  AiGarbageStationDeviceStatusFilterComponent,

  AIGarbageStationDeviceScheduleComponent,
  AiGarbageStationDeviceScheduleDoorComponent,
  AiGarbageStationDeviceScheduleFanComponent,
  AiGarbageStationDeviceScheduleSprayComponent,
  AIGarbageStationDeviceSessionManagerComponent,

  AiGarbageStationDeviceStatusComponent,
  ...AiGarbageStationDeviceStatusItems,
  AIGarbageStationDeviceManagerComponent,

  AIGarbageStationDeviceRecordEventManagerComponent,
  AIGarbageStationDeviceRecordCommandManagerComponent,

  AIGarbageStationRfidCardDetailsComponent,
  AIGarbageStationRfidCardManagerComponent,

  AIGarbageRegionTreeComponent,
  AIGarbageStationDropWindowListComponent,
  AiGarbageStationWeekListComponent,

  AiGarbageStationDeviceSessionMessageHistoryManagerComponent,
  AiGarbageStationDeviceSessionMessageHistoryTableComponent,
];
