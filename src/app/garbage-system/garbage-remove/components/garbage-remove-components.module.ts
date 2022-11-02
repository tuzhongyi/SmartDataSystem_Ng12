/*
 * @Author: pmx
 * @Date: 2021-09-15 14:43:30
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-01 15:15:52
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularResizeEventModule } from 'angular-resize-event';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { GarbageRemoveIndexComponent } from './garbage-remove-index/garbage-remove-index.component';
import { GarbageRemoveDivisionListComponent } from './division-list/division-list.component';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { NegativeCommentRankComponent } from './negative-comment-rank/negative-comment-rank.component';
import { GarbageRemoveEventStatisticComponent } from './event-statistic/event-statistic.component';
import { GarbageComponentsModule } from 'src/app/garbage-system/components/garbage-components.module';

@NgModule({
  declarations: [
    GarbageRemoveIndexComponent,
    GarbageRemoveDivisionListComponent,
    NegativeCommentRankComponent,
    GarbageRemoveEventStatisticComponent,
  ],
  imports: [GarbageComponentsModule],
  providers: [DownloadBusiness],
  exports: [],
})
export class GarbageRemoveComponentsModule {}
