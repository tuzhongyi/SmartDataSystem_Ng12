/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-20 17:04:58
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularResizeEventModule } from 'angular-resize-event';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { GarbageCollectionIndexComponent } from './collection-index/collection-index.component';
import { GarbageCollectionDivisionListComponent } from './collection-division-list/collection-division-list.component';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { NegativeCommentRankComponent } from './negative-comment-rank/negative-comment-rank.component';
import { GarbageComponentsModule } from 'src/app/garbage-system/components/garbage-components.module';
import { GarbageVehiclesDeviceStateComponent } from './collection-device-state/collection-device-state.component';
import { CollectionVehicleComponent } from './collection-vehicle/collection-vehicle.component';
import { CollectionPointWeightComponent } from './collection-point-weight/collection-point-weight.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CollectionScoreRankComponent } from './collection-score-rank/collection-score-rank.component';
import { CollectionMapControlComponent } from './collection-map-control/collection-map-control.component';
import { CollectionMapRouteComponent } from './collection-map-route/collection-map-route.component';
import { CollectionMapRouteQueryComponent } from './collection-map-route/collection-map-route-query/collection-map-route-query.component';

import { CollectionScorePieComponent } from './collection-score-pie/collection-score-pie.component';
import { CollectionPointPieComponent } from './collection-point-pie/collection-point-pie.component';
import { CollectionWeightLineComponent } from './collection-weight-line/collection-weight-line.component';
import { CollectionMapRouteControlComponent } from './collection-map-route/collection-map-route-control/collection-map-route-control.component';
import { CollectionMapRouteVideoComponent } from './collection-map-route/collection-map-route-video/collection-map-route-video.component';
import { CollectionScoreBarComponent } from './collection-score-bar/collection-score-bar.component';
import {
  CollectionListWindowComponent,
  CollectionMemberWindowComponent,
  CollectionPointWindowComponent,
  CollectionRecordWindowComponent,
  CollectionVehicleWindowComponent,
} from './windows';
import { CollectionDivisionTreeComponent } from './collection-division-tree/collection-division-tree.component';

@NgModule({
  declarations: [
    GarbageCollectionIndexComponent,
    GarbageCollectionDivisionListComponent,
    NegativeCommentRankComponent,
    GarbageVehiclesDeviceStateComponent,
    CollectionVehicleComponent,
    CollectionPointWeightComponent,
    CollectionScoreRankComponent,
    CollectionMapControlComponent,
    CollectionMapRouteComponent,
    CollectionMapRouteVideoComponent,
    CollectionMapRouteQueryComponent,
    CollectionMapRouteControlComponent,
    CollectionScorePieComponent,
    CollectionPointPieComponent,
    CollectionWeightLineComponent,
    CollectionScoreBarComponent,
    CollectionVehicleWindowComponent,
    CollectionListWindowComponent,
    CollectionMemberWindowComponent,
    CollectionPointWindowComponent,
    CollectionRecordWindowComponent,
    CollectionDivisionTreeComponent,
  ],
  imports: [
    CommonModule,
    AngularResizeEventModule,
    HowellModule,
    MaterialModule,
    FormsModule,
    GarbageComponentsModule,
    NgxEchartsModule,
  ],
  providers: [DownloadBusiness],
  exports: [],
})
export class GarbageCollectionComponentsModule {}
