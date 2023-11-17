import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AICameraEventsComponent } from './components/ai-camera-events/ai-camera-events.component';
import { AIGarbageStationDeviceManagerComponent } from './components/ai-garbage-station/ai-garbage-station-device-manager/ai-garbage-station-device-manager.component';
import { AIGarbageStationDeviceRecordCommandManagerComponent } from './components/ai-garbage-station/ai-garbage-station-device-record-command-manager/ai-garbage-station-device-record-command-manager.component';
import { AIGarbageStationDeviceRecordEventManagerComponent } from './components/ai-garbage-station/ai-garbage-station-device-record-event-manager/ai-garbage-station-device-record-event-manager.component';
import { AIGarbageStationRegionManagerComponent } from './components/ai-garbage-station/ai-garbage-station-region-manager/ai-garbage-station-region-manager.component';
import { AIGarbageStationRfidCardManagerComponent } from './components/ai-garbage-station/ai-garbage-station-rfid-card-manager/ai-garbage-station-rfid-card-manager.component';
import { AIModelManageComponent } from './components/ai-model-manage/ai-model-manage.component';
import { AIOPGarbageStationManagerComponent } from './components/aiop-garbage-station-manager/aiop-garbage-station-manager.component';
import { AIOPGarbageCollectionPointManagerComponent } from './components/aiop-garbage-vehicles/aiop-garbage-collection-point-manager/aiop-garbage-collection-point-manager.component';
import { GarbageVehicleCameraManagerComponent } from './components/aiop-garbage-vehicles/aiop-garbage-vehicle-camera-manager/garbage-vehicle-camera-manager.component';
import { AIOPGarbageVehicleManageComponent } from './components/aiop-garbage-vehicles/aiop-garbage-vehicle-manager/aiop-garbage-vehicle-manager.component';
import { GarbageCollectionMemberComponent } from './components/aiop-garbage-vehicles/garbage-collection-member/garbage-collection-member.component';
import { GarbageCollectionPointTrashCanManagerComponent } from './components/aiop-garbage-vehicles/garbage-collection-point-trashcan-manager/garbage-collection-point-trashcan-manager.component';
import { GarbageVehicleDivisionManageComponent } from './components/aiop-garbage-vehicles/garbage-vehicle-division-manage/garbage-vehicle-division-manage.component';
import { AIOPRoleManagerComponent } from './components/aiop-user-setting/aiop-role-manager/aiop-role-manager.component';
import { AIOPUserLogRecordManagerComponent } from './components/aiop-user-setting/aiop-user-log-record-manager/aiop-user-log-record-manager.component';
import { AIOPUserManagerComponent } from './components/aiop-user-setting/aiop-user-manager/aiop-user-manager.component';
import { AIOPUserSettingComponent } from './components/aiop-user-setting/aiop-user-setting.component';
import { CameraManageComponent } from './components/camera-manage/camera-manage.component';
import { CameraModelManageComponent } from './components/camera-model-manage/camera-model-manage.component';
import { DeployMapComponent } from './components/deploy-map/deploy-map.component';
import { DivisionManageComponent } from './components/division-manage/division-manage.component';
import { EncodeDeviceManageComponent } from './components/encode-device-manage/encode-device-manage.component';
import { GarbageEventsComponent } from './components/garbage-events/garbage-events.component';
import { GarbageStationAboutComponent } from './components/garbage-station-about/garbage-station-about.component';
import { IllegalDropAbout } from './components/illegal-drop-about/illegal-drop-about.component';
import { MixIntoManageComponent } from './components/mix-into-manage/mix-into-manage.component';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { PlatformManageComponent } from './components/platform-manage/platform-manage.component';
import { RegionManageComponent } from './components/region-manage/region-manage.component';
import { SRServerManageComponent } from './components/sr-server-manage/sr-server-manage.component';
import { AIOPSystemModeComponent as SystemModeComponent } from './components/system-mode/system-mode.component';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';
import { UnderwaterComponent } from './components/underwater/underwater.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'system-mode',
    pathMatch: 'full',
  },
  {
    path: 'system-mode',
    component: SystemModeComponent,
  },
  {
    path: 'underwater',
    component: UnderwaterComponent,

    children: [
      {
        path: '',
        redirectTo: 'monitor-platform',
        pathMatch: 'full',
      },
      {
        path: 'monitor-platform',
        component: MonitorPlatformComponent,

        children: [
          {
            path: '',
            redirectTo: 'garbage-classify',
            pathMatch: 'full',
          },
          {
            path: 'garbage-classify',

            children: [
              {
                path: '',
                redirectTo: 'division-manage',
                pathMatch: 'full',
              },
              {
                path: 'division-manage',
                component: DivisionManageComponent,
                data: {
                  breadcrumb: '区划管理',
                },
              },
              {
                path: 'deploy-map',
                component: DeployMapComponent,
                data: {
                  breadcrumb: '地图布控',
                },
              },
              {
                path: 'garbage-station-manage',
                component: AIOPGarbageStationManagerComponent,
                data: {
                  breadcrumb: '垃圾厢房管理',
                },
              },
            ],
          },
          {
            path: 'garbage-collection',

            children: [
              {
                path: '',
                redirectTo: 'collection-division-manage',
                pathMatch: 'full',
              },
              {
                path: 'collection-division-manage',
                component: GarbageVehicleDivisionManageComponent,
                data: {
                  breadcrumb: '区划管理',
                },
              },
              {
                path: 'garbage-vehicle-manage',
                component: AIOPGarbageVehicleManageComponent,
                data: {
                  breadcrumb: '清运车管理',
                },
              },
              {
                path: 'garbage-vehicle-camera-manager',
                component: GarbageVehicleCameraManagerComponent,
                data: {
                  breadcrumb: '摄像机管理',
                },
              },
              {
                path: 'garbage-collection-point',
                component: AIOPGarbageCollectionPointManagerComponent,
                data: {
                  breadcrumb: '收运点管理',
                },
              },
              {
                path: 'garbage-collection-point-trashcan-manager',
                component: GarbageCollectionPointTrashCanManagerComponent,
                data: {
                  breadcrumb: '垃圾桶管理',
                },
              },
              {
                path: 'garbage-collection-member',
                component: GarbageCollectionMemberComponent,
                data: {
                  breadcrumb: '人员信息',
                },
              },
              {
                path: '',
                redirectTo: 'division-manage',
                pathMatch: 'full',
              },
            ],
          },
        ],
      },
      {
        path: 'garbage-events',
        component: GarbageEventsComponent,
        children: [
          {
            path: '',
            redirectTo: 'events',
            pathMatch: 'full',
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                redirectTo: 'illegal-drop-about',
                pathMatch: 'full',
              },
              {
                path: 'illegal-drop-about',
                component: IllegalDropAbout,
                data: {
                  breadcrumb: '垃圾落地',
                },
              },
              {
                path: 'mix-into-manage',
                component: MixIntoManageComponent,
                data: {
                  breadcrumb: '混合投放',
                },
              },
              {
                path: 'garbage-station-about',
                component: GarbageStationAboutComponent,
                data: {
                  breadcrumb: '投放点',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'system-setting',
        component: SystemSettingComponent,
        children: [
          {
            path: '',
            redirectTo: 'platform',
            pathMatch: 'full',
          },
          {
            path: 'platform',
            children: [
              {
                path: '',
                redirectTo: 'platform-manage',
                pathMatch: 'full',
              },
              {
                path: 'platform-manage',
                component: PlatformManageComponent,
                data: {
                  breadcrumb: '平台管理',
                },
              },
              {
                path: 'srserver-manage',
                component: SRServerManageComponent,
                data: {
                  breadcrumb: '流转服务管理',
                },
              },
            ],
          },
          {
            path: 'region',
            children: [
              {
                path: '',
                redirectTo: 'region-manage',
                pathMatch: 'full',
              },

              {
                path: 'region-manage',
                component: RegionManageComponent,
                data: {
                  breadcrumb: '区域管理',
                },
              },
            ],
          },
          {
            path: 'device',
            children: [
              {
                path: '',
                redirectTo: 'camera-manage',
                pathMatch: 'full',
              },
              {
                path: 'camera-manage',
                component: CameraManageComponent,
                data: {
                  breadcrumb: '监控点',
                },
              },
              {
                path: 'encode-device-manage',
                component: EncodeDeviceManageComponent,
                data: {
                  breadcrumb: '编码器',
                },
              },
              {
                path: 'camera-model-manage',
                component: CameraModelManageComponent,
                data: {
                  breadcrumb: '监控点模型',
                },
              },
            ],
          },
          {
            path: 'ai',
            children: [
              {
                path: '',
                redirectTo: 'ai-model-manage',
                pathMatch: 'full',
              },
              {
                path: 'ai-model-manage',
                component: AIModelManageComponent,
                data: {
                  breadcrumb: 'AI模型列表',
                },
              },
            ],
          },
          {
            path: 'ai-station',
            children: [
              {
                path: '',
                redirectTo: 'manager',
                pathMatch: 'full',
              },
              {
                path: 'manager',
                component: AIGarbageStationDeviceManagerComponent,
                data: {
                  breadcrumb: '设备管理',
                },
              },
              {
                path: 'rfid',
                component: AIGarbageStationRfidCardManagerComponent,
                data: {
                  breadcrumb: 'RFID管理',
                },
              },
              {
                path: 'region',
                component: AIGarbageStationRegionManagerComponent,
                data: {
                  breadcrumb: '区域管理',
                },
              },
              {
                path: 'record-event',
                component: AIGarbageStationDeviceRecordEventManagerComponent,
                data: {
                  breadcrumb: '设备事件记录',
                },
              },
              {
                path: 'record-command',
                component: AIGarbageStationDeviceRecordCommandManagerComponent,
                data: {
                  breadcrumb: '命令执行记录',
                },
              },
            ],
          },
          {
            path: 'ai-events',
            children: [
              {
                path: '',
                redirectTo: 'ai-camera-events',
                pathMatch: 'full',
              },
              {
                path: 'ai-camera-events',
                component: AICameraEventsComponent,
                data: {
                  breadcrumb: 'AI摄像机事件',
                },
              },
            ],
          },
        ],
      },
      {
        path: 'user-setting',
        component: AIOPUserSettingComponent,
        children: [
          {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full',
          },
          {
            path: 'user',
            children: [
              {
                path: '',
                redirectTo: 'user-manager',
                pathMatch: 'full',
              },
              {
                path: 'user-manager',
                component: AIOPUserManagerComponent,
                data: {
                  breadcrumb: '用户管理',
                },
              },
              {
                path: 'role-manager',
                component: AIOPRoleManagerComponent,
                data: {
                  breadcrumb: '角色管理',
                },
              },
              {
                path: 'log-record',
                component: AIOPUserLogRecordManagerComponent,
                data: {
                  breadcrumb: '操作日志',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
