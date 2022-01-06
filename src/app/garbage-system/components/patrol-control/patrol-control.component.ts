import { Component, OnInit } from '@angular/core';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { Camera } from 'src/app/network/model/camera.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { MediaControlViewModel } from '../media-control/media-control.model';
import { PatrolControlBusiness } from './patrol-control.business';
import { PatrolControlModel } from './patrol-control.model';

@Component({
  selector: 'app-patrol-control',
  templateUrl: './patrol-control.component.html',
  styleUrls: ['./patrol-control.component.less'],
  providers: [PatrolControlBusiness],
})
export class PatrolControlComponent implements OnInit {
  model?: PatrolControlModel;

  constructor(private business: PatrolControlBusiness) {}

  sqrt = 1;

  async ngOnInit() {
    let array = await this.business.load();
    this.model = array[1];
  }
}
