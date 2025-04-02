import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  InfoDetailsDivisionTableBusiness,
  InfoDetailsDivisionTableProviders,
} from './business/info-details-division-table.business';
import {
  InfoDetailsDivisionTableArgs,
  InfoDetailsDivisionTableItem,
} from './info-details-division-table.model';

@Component({
  selector: 'info-details-division-table',
  templateUrl: './info-details-division-table.component.html',
  styleUrls: ['./info-details-division-table.component.less'],
  providers: [InfoDetailsDivisionTableProviders],
})
export class InfoDetailsDivisionTableComponent implements OnInit {
  @Input() args = new InfoDetailsDivisionTableArgs();
  @Input('load') input_load?: EventEmitter<InfoDetailsDivisionTableArgs>;
  @Input('download') input_download?: EventEmitter<Division>;
  @Input() init = false;
  @Output() inited = new EventEmitter<void>();
  @Output() info = new EventEmitter<Division>();

  constructor(private business: InfoDetailsDivisionTableBusiness) {}

  datas: InfoDetailsDivisionTableItem[] = [];
  widths = ['10%', '20%', '15%', '15%', '15%', '15%', '10%'];

  ngOnInit(): void {
    if (this.input_load) {
      this.input_load.subscribe((x) => {
        this.args = x;
        this.load(x);
      });
    }
    if (this.input_download) {
      this.input_download.subscribe((x) => {
        this.business.downloader.download(x, this.datas);
      });
    }
    if (this.init) {
      this.load(this.args);
    }
    this.inited.emit();
  }

  load(args: InfoDetailsDivisionTableArgs) {
    this.business.load(args).then((x) => {
      this.datas = x;
    });
  }

  oninfo(item: InfoDetailsDivisionTableItem) {
    this.business.division.get(item.Id).then((x) => {
      this.info.emit(x);
    });
  }
}
