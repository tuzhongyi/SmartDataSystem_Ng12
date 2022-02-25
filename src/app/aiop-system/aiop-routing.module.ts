/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-01-27 10:47:24
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
import { AiModelListComponent } from './components/ai-model-list/ai-model-list.component';
import { AiCameraEventsComponent } from './components/ai-camera-events/ai-camera-events.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'system-mode',
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
      },
      {
        path: 'super-vision',
        component: SuperVisionComponent,

        children: [
          {
            path: '',
            redirectTo: 'supervise-platform',
          },
          {
            path: 'supervise-platform',
            children: [
              {
                path: '',
                redirectTo: 'division-manage',
              },
              {
                path: 'division-manage',
                component: DivisionManageComponent,
              },
              {
                path: 'deploy-map',
                component: DeployMapComponent,
              },
              {
                path: 'garbage-station-manage',
                component: GarbageStationManageComponent,
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
          },
          {
            path: 'events',
            children: [
              {
                path: '',
                redirectTo: 'illegal-drop-record',
              },
              {
                path: 'illegal-drop-record',
                component: IllegalDropRecordComponent,
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
          },
          {
            path: 'platform',
            children: [
              { path: '', redirectTo: 'platform-manage' },
              {
                path: 'platform-manage',
                component: PlatformManageComponent,
              },
              {
                path: 'proxy-manage',
                component: ProxyManageComponent,
              },
            ],
          },
          {
            path: 'region',
            children: [
              {
                path: '',
                redirectTo: 'region-manage',
              },

              {
                path: 'region-manage',
                component: RegionManageComponent,
              },
            ],
          },
          {
            path: 'device',
            children: [
              {
                path: 'camera-manage',
                component: CameraManageComponent,
              },
              {
                path: 'encode-device-manage',
                component: EncodeDeviceManageComponent,
              },
              {
                path: 'camera-model-manage',
                component: CameraModelManageComponent,
              },
              {
                path: '',
                redirectTo: 'camera-manage',
              },
            ],
          },
          {
            path: 'ai',
            children: [
              {
                path: 'ai-model-list',
                component: AiModelListComponent,
              },
            ],
          },
          {
            path: 'ai-events',
            children: [
              {
                path: 'ai-camera-events',
                component: AiCameraEventsComponent,
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
