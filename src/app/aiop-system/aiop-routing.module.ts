/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-06-17 15:35:37
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiopComponent } from './aiop.component';
import { AiopSystemManageComponent } from './components/aiop-manage/aiop-manage.component';
import { IllegalDropRecordComponent } from './components/illegal-drop-record/illegal-drop-record.component';
import { DivisionManageComponent } from './components/division-manage/division-manage.component';
import { StationStatusComponent } from './components/station-status/station-status.component';
import { AIOPSystemModeComponent } from './components/system-mode/system-mode.component';
import { GarbageEventsComponent } from './components/garbage-events/garbage-events.component';
import { DeployMapComponent } from './components/deploy-map/deploy-map.component';
import { GarbageStationManageComponent } from './components/garbage-station-manage/garbage-station-manage.component';
import { PlatformManageComponent } from './components/platform-manage/platform-manage.component';
import { ProxyManageComponent } from './components/proxy-manage/proxy-manage.component';
import { SystemSettingComponent } from './components/system-setting/system-setting.component';
import { SuperVisionComponent } from './components/super-vision/super-vision.component';
import { RegionManageComponent } from './components/region-manage/region-manage.component';
import { CameraManageComponent } from './components/camera-manage/camera-manage.component';
import { EncodeDeviceManageComponent } from './components/encode-device-manage/encode-device-manage.component';
import { CameraModelManageComponent } from './components/camera-model-manage/camera-model-manage.component';
import { AIModelManageComponent } from './components/ai-model-manage/ai-model-manage.component';
import { AiCameraEventsComponent } from './components/ai-camera-events/ai-camera-events.component';
import { IllegalDropRecord2Component } from './components/drop-record2/illegal-drop-record.component';
import { SRServerManageComponent } from './components/sr-server-manage/sr-server-manage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'system-mode',
    pathMatch: "full"
  },
  {
    path: 'system-mode',
    component: AIOPSystemModeComponent,
  },
  {
    path: 'aiop-manage',
    component: AiopSystemManageComponent,

    children: [
      {
        path: '',
        redirectTo: 'super-vision',
        pathMatch: 'full'
      },
      {
        path: 'super-vision',
        component: SuperVisionComponent,

        children: [
          {
            path: '',
            redirectTo: 'supervise-platform', pathMatch: 'full'
          },
          {
            path: 'supervise-platform',

            children: [
              {
                path: '',
                redirectTo: 'division-manage', pathMatch: 'full'
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
        ],
      },
      {
        path: 'garbage-events',
        component: GarbageEventsComponent,
        children: [
          {
            path: '',
            redirectTo: 'events', pathMatch: 'full'
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                redirectTo: 'illegal-drop-record', pathMatch: 'full'
              },
              {
                path: 'illegal-drop-record',
                component: IllegalDropRecordComponent,
                data: {
                  breadcrumb: '垃圾落地',
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
            redirectTo: 'platform', pathMatch: 'full'
          },
          {
            path: 'platform',
            children: [
              { path: '', redirectTo: 'platform-manage', pathMatch: 'full' },
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
                redirectTo: 'region-manage', pathMatch: 'full'
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
              {
                path: '',
                redirectTo: 'camera-manage', pathMatch: 'full'
              },
            ],
          },
          {
            path: 'ai',
            children: [
              {
                path: 'ai-model-manage',
                component: AIModelManageComponent,
                data: {
                  breadcrumb: 'AI模型管理',
                },
              },
            ],
          },
          {
            path: 'ai-events',
            children: [
              {
                path: 'ai-camera-events',
                component: AiCameraEventsComponent,
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
export class AiopRoutingModule { }
