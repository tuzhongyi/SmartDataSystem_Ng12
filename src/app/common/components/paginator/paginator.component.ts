/*
 * @Author: pmx
 * @Date: 2021-12-30 15:27:11
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-30 15:51:51
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatPaginatorDefaultOptions,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  _MatPaginatorBase,
} from '@angular/material/paginator';
import { off } from 'process';
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
export class PaginatorComponent
  extends _MatPaginatorBase<MatPaginatorDefaultOptions>
  implements AfterViewInit
{
  @Input()
  get pagerCount(): number {
    return this._pagerCount;
  }
  set pagerCount(value: number) {
    this._pagerCount =
      value <= 0 ? this.getNumberOfPages() : value < 3 ? 3 : value;
  }
  private _pagerCount = this.getNumberOfPages(); // 在 updatePageRange 中重新赋值

  @Input() currentCount = 0;

  public pagers: number[] = [];
  public showFirst: boolean = false;
  public showLast: boolean = false;

  constructor(
    public intl: PaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }
  ngAfterViewInit(): void {
    this.updatePageRange();
  }

  swipePage(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.updatePageRange();
  }
  firstPage() {
    super.firstPage();
    this.updatePageRange();
  }
  lastPage() {
    super.lastPage();
    this.updatePageRange();
  }
  previousPage() {
    super.previousPage();
    this.updatePageRange();
  }
  nextPage() {
    super.nextPage();
    this.updatePageRange();
  }
  previousGroup() {
    this.pageIndex -= this.pagerCount - 2;
    this.updatePageRange();
  }
  nextGroup() {
    this.pageIndex += this.pagerCount - 2;
    this.updatePageRange();
  }
  updatePageRange() {
    console.log('pageIndex', this.pageIndex);
    this.pagers = [];
    this.showFirst = false;
    this.showLast = false;
    if (this.pagerCount <= 0) {
      this.pagerCount = this.getNumberOfPages();
    }

    let halfPagerCount = Math.ceil((this.pagerCount - 1) / 2); //2

    // console.log('halfPagerCount', halfPagerCount);

    if (this.getNumberOfPages() > this.pagerCount) {
      if (this.pageIndex + 1 > 1 + halfPagerCount) {
        this.showFirst = true;
      }
      if (this.pageIndex + 1 < this.getNumberOfPages() - halfPagerCount) {
        this.showLast = true;
      }
    }

    if (this.showFirst && !this.showLast) {
      let startPage = this.getNumberOfPages() - (this.pagerCount - 2);
      for (let i = startPage; i < this.getNumberOfPages(); i++) {
        this.pagers.push(i);
      }
    } else if (!this.showFirst && this.showLast) {
      for (let i = 2; i < this.pagerCount; i++) {
        this.pagers.push(i);
      }
    } else if (this.showFirst && this.showLast) {
      // 去掉首尾后分半
      let offset = Math.floor((this.pagerCount - 2) / 2); //1

      // 注意 pageIndex从0开始计数
      for (
        let i = this.pageIndex + 1 - offset;
        i <= this.pageIndex + 1 + offset;
        i++
      ) {
        this.pagers.push(i);
      }
    } else {
      for (let i = 2; i < this.getNumberOfPages(); i++) {
        this.pagers.push(i);
      }
    }
  }
}
