/*
 * @Author: pmx
 * @Date: 2021-12-30 15:27:11
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-30 15:51:51
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  MatPaginatorDefaultOptions,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  _MatPaginatorBase,
} from '@angular/material/paginator';
import { PaginatorIntl } from './paginator-intl';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.less'],
  host: { class: 'paginator' },
  providers: [PaginatorIntl],
  exportAs: 'paginator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent extends _MatPaginatorBase<MatPaginatorDefaultOptions> {
  color: ThemePalette = 'primary';
  count: number = 0;
  constructor(
    public intl: PaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }
  // override ngOnInit(): void {
  //   super.ngOnInit();
  //   console.log('on init');
  //   console.log(this._intl);
  // }
}
