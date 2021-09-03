import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarbageRetentionRankComponent } from './garbage-retention-rank/garbage-retention-rank.component';

/**
 *  author:pmx
 *  create time:2021/09/03
 *
 *  管理所有组件
 */
@NgModule({
  declarations: [GarbageRetentionRankComponent],
  imports: [CommonModule],
  exports: [GarbageRetentionRankComponent],
})
export class ComponentsModule {}
