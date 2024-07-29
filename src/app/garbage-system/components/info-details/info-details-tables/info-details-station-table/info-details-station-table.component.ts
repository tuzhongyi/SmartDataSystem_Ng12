import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import {
  InfoDetailsStationTableBusiness,
  InfoDetailsStationTableProviders,
} from './business/info-details-station-table.business';
import {
  InfoDetailsStationTableArgs,
  InfoDetailsStationTableItem,
} from './info-details-station-table.model';

@Component({
  selector: 'info-details-station-table',
  templateUrl: './info-details-station-table.component.html',
  styleUrls: ['./info-details-station-table.component.less'],
  providers: [...InfoDetailsStationTableProviders],
})
export class InfoDetailsStationTableComponent implements OnInit {
  @Input() args = new InfoDetailsStationTableArgs();
  @Input('load') input_load?: EventEmitter<InfoDetailsStationTableArgs>;
  @Input('download') input_download?: EventEmitter<Division>;
  @Input() init = false;
  @Output() inited = new EventEmitter<void>();

  constructor(private business: InfoDetailsStationTableBusiness) {}

  datas: InfoDetailsStationTableItem[] = [];
  widths = ['8%', '18%', '8%', '8%', '8%', '10%', '8%', '8%', '8%', '8%', '8%'];
  Language = Language;

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

  load(args: InfoDetailsStationTableArgs) {
    this.business.load(args).then((x) => {
      this.datas = x;
    });
  }
}
