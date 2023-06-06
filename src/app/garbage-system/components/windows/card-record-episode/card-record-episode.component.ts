import { Component, Input, OnInit } from '@angular/core';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CardRecordEpisodeBusiness } from './card-record-episode.business';
import { CardRecordEpisodeService } from './card-record-episode.service';

@Component({
  selector: 'card-record-episode',
  templateUrl: './card-record-episode.component.html',
  styleUrls: ['./card-record-episode.component.less'],
  providers: [CardRecordEpisodeService, CardRecordEpisodeBusiness],
})
export class CardRecordEpisodeComponent implements OnInit {
  @Input()
  record?: MixedIntoEventRecord;

  constructor(private business: CardRecordEpisodeBusiness) {}

  station?: GarbageStation;
  url = {
    video: '',
    image: '',
    web: '',
  };

  ngOnInit(): void {
    if (this.record) {
      if (this.record.ImageUrl) {
        this.url.image = this.business.img(this.record.ImageUrl);
      }
      this.business.get(this.record.Data.StationId).then((x) => {
        this.station = x;
        console.log(this.station);
      });
    }
  }

  toplay() {
    if (this.record?.ResourceId) {
      this.business
        .playback(this.record.ResourceId, this.record.EventTime)
        .then((x) => {
          this.url.video = x.Url;
          if (x.WebUrl) {
            this.url.web = x.WebUrl;
          }
        });
    }
  }

  onstop() {
    this.url.video = '';
    this.url.web = '';
  }
}
