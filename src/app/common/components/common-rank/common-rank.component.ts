import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CollectionScoreRankComponent } from 'src/app/garbage-system/garbage-collection/components/collection-score-rank/collection-score-rank.component';
import { CommonRankBusiness } from './common-rank.business';
import {
  CommonRankData,
  CommonRankModel,
  COMMON_RANK_TOKEN,
  ICommonRankBusiness,
} from './common-rank.model';

@Component({
  selector: 'common-rank',
  templateUrl: './common-rank.component.html',
  styleUrls: ['./common-rank.component.less'],
  providers: [
    {
      provide: COMMON_RANK_TOKEN,
      useClass: CommonRankBusiness,
    },
  ],
})
export class CommonRankComponent implements OnInit {
  @Input('business') _business: ICommonRankBusiness;
  @Input() title = '';
  @Input() model?: CommonRankModel;

  @Output() clickEvent = new EventEmitter();

  trackByFn = (index: number, item: CommonRankData) => {
    return item.Id;
  };

  constructor(@Inject(COMMON_RANK_TOKEN) business: ICommonRankBusiness) {
    this._business = business;
  }

  async ngOnInit() {
    this._init();
  }

  private async _init() {
    this.model = await this._business.init();
  }

  clickItem(item: CommonRankData) {
    this.clickEvent.emit(item);
  }
}
