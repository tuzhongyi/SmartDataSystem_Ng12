import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { InfoDetailsDivisionCountyChildrenTableController } from './controller/info-details-division-county-children-table.controller';
import { InfoDetailsDivisionCountyStatisticController } from './controller/info-details-division-county-statistic.controller';
import { InfoDetailsDivisionCountyProviders } from './info-details-division-county.provider';

@Component({
  selector: 'info-details-division-county',
  templateUrl: './info-details-division-county.component.html',
  styleUrls: ['./info-details-division-county.component.less'],
  providers: [InfoDetailsDivisionCountyProviders],
})
export class InfoDetailsDivisionCountyComponent implements OnInit {
  @Input() divisionId?: string;
  @Output() info = new EventEmitter<Division>();

  constructor(
    public statistic: InfoDetailsDivisionCountyStatisticController,
    public children: InfoDetailsDivisionCountyChildrenTableController
  ) {}

  Language = Language;

  ngOnInit(): void {
    if (this.divisionId) {
      this.load(this.divisionId);
    }
  }

  private load(divisionId: string) {
    this.statistic.load(divisionId).then(() => {
      this.children.load(divisionId);
    });
  }

  ondownload() {
    if (this.statistic.division) {
      this.children.download(this.statistic.division);
    }
  }
  onchildinfo(item: Division) {
    this.info.emit(item);
  }
}
