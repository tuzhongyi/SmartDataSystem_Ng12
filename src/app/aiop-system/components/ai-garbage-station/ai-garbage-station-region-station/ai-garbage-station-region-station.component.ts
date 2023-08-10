import { Component, Input } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';

@Component({
  selector: 'app-ai-garbage-station-region-station',
  templateUrl: './ai-garbage-station-region-station.component.html',
  styleUrls: ['./ai-garbage-station-region-station.component.less'],
  providers: [],
})
export class AIGarbageStationRegionStationComponent {
  @Input()
  model?: AIGarbageRegion;
  Language = Language;
}
