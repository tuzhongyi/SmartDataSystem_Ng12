import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  constructor(
    intl: PaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: MatPaginatorDefaultOptions
  ) {
    console.log(intl instanceof PaginatorIntl);
    // super(intl, changeDetectorRef, defaults);
  }
}
