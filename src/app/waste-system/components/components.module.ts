import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankComponent } from './rank/rank.component';

/**
 *  author:pmx
 *  create time:2021/09/03
 *
 *  管理所有组件
 */
@NgModule({
  declarations: [RankComponent],
  imports: [CommonModule],
  exports: [RankComponent],
})
export class ComponentsModule {}
