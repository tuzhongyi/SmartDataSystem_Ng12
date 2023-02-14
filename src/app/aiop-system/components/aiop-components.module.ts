/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-20 16:56:45
 */
import { Injector, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { AIOPSystemModeComponent } from './system-mode/system-mode.component';
import { AiopSystemManageComponent } from './aiop-manage/aiop-manage.component';
import { DivisionManageComponent } from './division-manage/division-manage.component';
import { GarbageEventsComponent } from './garbage-events/garbage-events.component';
import { DeployMapComponent } from './deploy-map/deploy-map.component';
import { GarbageStationManageComponent } from './garbage-station-manage/garbage-station-manage.component';
import { PlatformManageComponent } from './platform-manage/platform-manage.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import { SuperVisionComponent } from './super-vision/super-vision.component';
import { RegionManageComponent } from './region-manage/region-manage.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CameraManageComponent } from './camera-manage/camera-manage.component';
import { EncodeDeviceManageComponent } from './encode-device-manage/encode-device-manage.component';
import { CameraModelManageComponent } from './camera-model-manage/camera-model-manage.component';
import { AIModelManageComponent } from './ai-model-manage/ai-model-manage.component';
import { AICameraEventsComponent } from './ai-camera-events/ai-camera-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformOperateComponent } from './platform-operate/platform-operate.component';
import { SRServerManageComponent } from './sr-server-manage/sr-server-manage.component';
import { SRServerOperateComponent } from './sr-server-operate/sr-server-operate.component';
import { AIModelOperateComponent } from './ai-model-operate/ai-model-operate.component';
import { EncodeDeviceOperateComponent } from './encode-device-operate/encode-device-operate.component';
import { GarbageStationOperateComponent } from './garbage-station-operate/garbage-station-operate.component';
import { CameraOperateComponent } from './camera-operate/camera-operate.component';
import { CameraMoveComponent } from './camera-move/camera-move.component';
import { IllegalDropAbout } from './illegal-drop-about/illegal-drop-about.component';
import { MixIntoManageComponent } from './mix-into-manage/mix-into-manage.component';
import { GarbageVehicleDivisionManageComponent } from './garbage-vehicles/garbage-vehicle-division-manage/garbage-vehicle-division-manage.component';
import { GarbageVehicleManageComponent } from './garbage-vehicles/garbage-vehicle-manage/garbage-vehicle-manage.component';
import { GarbageVehicleOperateComponent } from './garbage-vehicles/garbage-vehicle-operate/garbage-vehicle-operate.component';
import { GarbageVehicleDivisionTreeComponent } from './garbage-vehicles/trees/garbage-vehicle-division-tree/garbage-vehicle-division-tree.component';
import { GarbageCollectionPointComponent } from './garbage-vehicles/garbage-collection-point/garbage-collection-point.component';
import { GarbageVehicleCameraBindingComponent } from './garbage-vehicles/garbage-vehicle-camera-binding/garbage-vehicle-camera-binding.component';
import { GarbageCollectionMemberComponent } from './garbage-vehicles/garbage-collection-member/garbage-collection-member.component';
import { GarbageCollectionPointDetailsWindowComponent } from './garbage-vehicles/garbage-collection-point-details-window/garbage-collection-point-details-window.component';
import { GarbageCollectionMemberDetailsWindowComponent } from './garbage-vehicles/garbage-collection-member-details-window/garbage-collection-member-details-window.component';
import { GarbageCollectionPointTrashCanManagerComponent } from './garbage-vehicles/garbage-collection-point-trashcan-manager/garbage-collection-point-trashcan-manager.component';
import { GarbageVehicleCameraBindingAICameraComponent } from './garbage-vehicles/garbage-vehicle-camera-binding/garbage-vehicle-camera-binding-aicamera/garbage-vehicle-camera-binding-aicamera.component';
import { GarbageCollectionPointTrashcanDetailsWindowComponent } from './garbage-vehicles/garbage-collection-point-trashcan-details-window/garbage-collection-point-trashcan-details-window.component';
import { GarbageCollectionPointTreeComponent } from './garbage-vehicles/trees/garbage-collection-point-tree/garbage-collection-point-tree.component';
import { GarbageVehicleCameraTreeComponent } from './garbage-vehicles/trees/garbage-vehicle-camera-tree/garbage-vehicle-camera-tree.component';
import { GarbageVehicleCameraManagerComponent } from './garbage-vehicles/garbage-vehicle-camera-manager/garbage-vehicle-camera-manager.component';
import { GarbageVehicleCameraDetailsWindowComponent } from './garbage-vehicles/garbage-vehicle-camera-details-window/garbage-vehicle-camera-details-window.component';
import { GarbageVehicleTreeComponent } from './garbage-vehicles/trees/garbage-vehicle-tree/garbage-vehicle-tree.component';
import { GarbageStationAboutComponent } from './garbage-station-about/garbage-station-about.component';
import { IllegalDropComponent } from 'src/app/common/components/illegal-drop/illegal-drop.component';
import { GarbageStationListComponent } from './garbage-station-list/garbage-station-list.component';

@NgModule({
  declarations: [
    AIOPSystemModeComponent,
    AiopSystemManageComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    DeployMapComponent,
    GarbageStationManageComponent,
    SystemSettingComponent,
    PlatformManageComponent,
    SuperVisionComponent,
    RegionManageComponent,
    SidenavComponent,
    CameraManageComponent,
    EncodeDeviceManageComponent,
    CameraModelManageComponent,
    AIModelManageComponent,
    AICameraEventsComponent,
    PlatformOperateComponent,
    SRServerManageComponent,
    SRServerOperateComponent,
    AIModelOperateComponent,
    EncodeDeviceOperateComponent,
    GarbageStationOperateComponent,
    CameraOperateComponent,
    CameraMoveComponent,
    IllegalDropAbout,
    MixIntoManageComponent,
    GarbageStationAboutComponent,
    IllegalDropComponent,
    GarbageStationListComponent,

    GarbageVehicleManageComponent,
    GarbageVehicleOperateComponent,
    GarbageVehicleDivisionManageComponent,
    GarbageVehicleDivisionTreeComponent,

    GarbageCollectionPointComponent,
    GarbageCollectionPointDetailsWindowComponent,

    GarbageVehicleCameraTreeComponent,
    GarbageVehicleCameraBindingComponent,
    GarbageVehicleCameraBindingAICameraComponent,

    GarbageCollectionMemberComponent,
    GarbageCollectionMemberDetailsWindowComponent,
    GarbageCollectionPointTrashCanManagerComponent,
    GarbageCollectionPointTrashcanDetailsWindowComponent,

    GarbageCollectionPointTreeComponent,

    GarbageVehicleCameraManagerComponent,
    GarbageVehicleCameraDetailsWindowComponent,

    GarbageVehicleTreeComponent,
  ],
  imports: [
    CommonModule,
    HowellModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class AiopComponentsModule {
  constructor() {}
}
