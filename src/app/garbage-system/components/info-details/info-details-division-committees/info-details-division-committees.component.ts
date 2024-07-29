import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { InfoDetailsDivisionCommitteesStationTableController } from './controller/info-details-division-committees-station-table.controller';
import { InfoDetailsDivisionCommitteesStatisticController } from './controller/info-details-division-committees-statistic.controller';
import { InfoDetailsDivisionCommitteesProviders } from './info-details-division-committees.provider';

@Component({
  selector: 'info-details-division-committees',
  templateUrl: './info-details-division-committees.component.html',
  styleUrls: ['./info-details-division-committees.component.less'],
  providers: [InfoDetailsDivisionCommitteesProviders],
})
export class InfoDetailsDivisionCommitteesComponent
  implements OnInit, AfterViewInit
{
  @Input() divisionId?: string;
  constructor(
    public statistic: InfoDetailsDivisionCommitteesStatisticController,
    public station: InfoDetailsDivisionCommitteesStationTableController
  ) {}

  Language = Language;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.divisionId) {
      this.load(this.divisionId);
    }
  }

  load(divisionId: string) {
    this.statistic.load(divisionId).then(() => {
      this.station.load(divisionId);
    });
  }

  ondownload() {
    if (this.statistic.division) {
      this.station.download(this.statistic.division);
    }
  }
}
