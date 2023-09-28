import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { ExportType } from 'src/app/enum/export-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DaPuQiaoGarbageDropStationCountTableBusiness } from './dapuqiao-garbage-drop-station-count-table.business';
import { DaPuQiaoGarbageDropStationCountTableDownload } from './dapuqiao-garbage-drop-station-count-table.download';
import {
  DaPuQiaoGarbageDropStationCountTableArgs,
  DaPuQiaoGarbageDropStationCountTableSortKey,
  NumberStatisticModel,
} from './dapuqiao-garbage-drop-station-count-table.model';
import { DaPuQiaoGarbageDropStationCountTableService } from './dapuqiao-garbage-drop-station-count-table.service';

@Component({
  selector: 'dapuqiao-garbage-drop-station-count-table',
  templateUrl: './dapuqiao-garbage-drop-station-count-table.component.html',
  styleUrls: [
    '../../table-overflow.less',
    './dapuqiao-garbage-drop-station-count-table.component.less',
  ],
  providers: [
    DaPuQiaoGarbageDropStationCountTableService,
    DaPuQiaoGarbageDropStationCountTableBusiness,
    DaPuQiaoGarbageDropStationCountTableDownload,
  ],
})
export class DaPuQiaoGarbageDropStationCountTableComponent
  implements IComponent<IModel, NumberStatisticModel[]>, OnInit
{
  @Input() business: DaPuQiaoGarbageDropStationCountTableBusiness;
  @Input() args: DaPuQiaoGarbageDropStationCountTableArgs =
    new DaPuQiaoGarbageDropStationCountTableArgs();
  @Input() load?: EventEmitter<DaPuQiaoGarbageDropStationCountTableArgs>;
  @Input() download?: EventEmitter<ExportType>;
  constructor(business: DaPuQiaoGarbageDropStationCountTableBusiness) {
    this.business = business;
  }
  widths = [
    undefined,
    '180px',
    '150px',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  datas: NumberStatisticModel[] = [];
  loading = false;
  SortKey = DaPuQiaoGarbageDropStationCountTableSortKey;
  selected?: NumberStatisticModel;
  sort?: Sort;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
    if (this.download) {
      this.download.subscribe((x) => {
        this.business.download.download(x, this.args, this.datas);
      });
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.business.load(this.args).then((x) => {
      this.datas = x;
      this.loading = false;
    });
  }

  onselect(item: NumberStatisticModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  sortData(sort: Sort) {
    this.sort = sort;
    const isAsc = sort.direction === 'asc';
    this.datas = this.datas.sort((a, b) => {
      switch (sort.active) {
        case this.SortKey.Name:
          return LocaleCompare.compare(a[sort.active], b[sort.active], isAsc);
        case this.SortKey.DivisionName:
          return 0;
        case this.SortKey.Level1Number:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level1Number,
            b.Level3Statistic?.Level1Number,
            isAsc
          );
        case this.SortKey.Level2Number:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level2Number,
            b.Level3Statistic?.Level2Number,
            isAsc
          );
        case this.SortKey.Level3Number:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level3Number,
            b.Level3Statistic?.Level3Number,
            isAsc
          );
        case this.SortKey.AllLevelNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.AllLevelNumber,
            b.Level3Statistic?.AllLevelNumber,
            isAsc
          );
        case this.SortKey.Level1FeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level1FeedbackNumber,
            b.Level3Statistic?.Level1FeedbackNumber,
            isAsc
          );
        case this.SortKey.Level2FeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level2FeedbackNumber,
            b.Level3Statistic?.Level2FeedbackNumber,
            isAsc
          );
        case this.SortKey.Level3FeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.Level3FeedbackNumber,
            b.Level3Statistic?.Level3FeedbackNumber,
            isAsc
          );
        case this.SortKey.PropertyFeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.PropertyFeedbackNumber,
            b.Level3Statistic?.PropertyFeedbackNumber,
            isAsc
          );
        case this.SortKey.ThirdPartFeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.ThirdPartFeedbackNumber,
            b.Level3Statistic?.ThirdPartFeedbackNumber,
            isAsc
          );
        case this.SortKey.FeedbackNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.FeedbackNumber,
            b.Level3Statistic?.FeedbackNumber,
            isAsc
          );
        case this.SortKey.AvgFeedbackSeconds:
          return LocaleCompare.compare(
            a.Level3Statistic?.AvgFeedbackSeconds,
            b.Level3Statistic?.AvgFeedbackSeconds,
            isAsc
          );
        case this.SortKey.FeedbackRatio:
          return LocaleCompare.compare(a.FeedbackRatio, b.FeedbackRatio, isAsc);
        case this.SortKey.SupervisedNumber:
          return LocaleCompare.compare(
            a.Level3Statistic?.SupervisedNumber,
            b.Level3Statistic?.SupervisedNumber,
            isAsc
          );
        case this.SortKey.SupervisedRatio:
          return LocaleCompare.compare(
            a.SupervisedRatio,
            b.SupervisedRatio,
            isAsc
          );
        default:
          return 0;
      }
    });
  }
}
