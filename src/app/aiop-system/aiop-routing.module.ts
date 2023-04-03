/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-07-29 23:26:10
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiopComponent } from './aiop.component';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { IllegalDropAbout } from './components/illegal-drop-about/illegal-drop-about.component';
import { DivisionManageComponent } from './components/division-manage/division-manage.component';
import { StationStatusComponent } from './components/station-status/station-status.component';
import { AIOPSystemModeComponent as SystemModeComponent } from './components/system-mode/system-mode.component';
import { GarbageEventsComponent } from './components/garbage-events/garbage-events.component';
import { DeployMapComponent } from './components/deploy-map/deploy-map.component';
import { GarbageStationManageComponent } from './components/garbage-station-manage/garbage-station-manage.component';
import { PlatformManageComponent } from './components/platform-manage/platform-manage.component';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { RegionManageComponent } from './components/region-manage/region-manage.component';
import { CameraManageComponent } from './components/camera-manage/camera-manage.component';
import { EncodeDeviceManageComponent } from './components/encode-device-manage/encode-device-manage.component';
import { CameraModelManageComponent } from './components/camera-model-manage/camera-model-manage.component';
import { AIModelManageComponent } from './components/ai-model-manage/ai-model-manage.component';
import { AICameraEventsComponent } from './components/ai-camera-events/ai-camera-events.component';
import { SRServerManageComponent } from './components/sr-server-manage/sr-server-manage.component';
import { MixIntoManageComponent } from './components/mix-into-manage/mix-into-manage.component';
import { GarbageVehicleDivisionManageComponent } from './components/garbage-vehicles/garbage-vehicle-division-manage/garbage-vehicle-division-manage.component';
import { GarbageVehicleManageComponent } from './components/garbage-vehicles/garbage-vehicle-manage/garbage-vehicle-manage.component';
import { GarbageCollectionMemberComponent } from './components/garbage-vehicles/garbage-collection-member/garbage-collection-member.component';
import { GarbageVehicleCameraBindingComponent } from './components/garbage-vehicles/garbage-vehicle-camera-binding/garbage-vehicle-camera-binding.component';
import { GarbageCollectionPointComponent } from './components/garbage-vehicles/garbage-collection-point/garbage-collection-point.component';
import { GarbageCollectionPointTrashCanManagerComponent } from './components/garbage-vehicles/garbage-collection-point-trashcan-manager/garbage-collection-point-trashcan-manager.component';
import { GarbageVehicleCameraManagerComponent } from './components/garbage-vehicles/garbage-vehicle-camera-manager/garbage-vehicle-camera-manager.component';
import { GarbageStationAboutComponent } from './components/garbage-station-about/garbage-station-about.component';

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
                component: GarbageStationManageComponent,
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
                component: GarbageVehicleManageComponent,
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
                component: GarbageCollectionPointComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
