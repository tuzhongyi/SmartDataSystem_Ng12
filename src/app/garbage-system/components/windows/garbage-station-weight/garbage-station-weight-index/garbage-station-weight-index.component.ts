import { Component, Input } from '@angular/core';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { GarbageStationWeightPage as GarbageStationWeightIndexPage } from './garbage-station-weight-index.model';

@Component({
  selector: 'garbage-station-weight-index',
  templateUrl: './garbage-station-weight-index.component.html',
  styleUrls: ['./garbage-station-weight-index.component.less'],
  providers: [],
})
export class GarbageStationWeightIndexComponent {
  @Input()
  type?: GarbageType;
  page: GarbageStationWeightIndexPage = GarbageStationWeightIndexPage.list;
  Page = GarbageStationWeightIndexPage;
}
