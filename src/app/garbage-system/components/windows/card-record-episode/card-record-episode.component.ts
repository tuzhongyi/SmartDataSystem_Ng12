import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { wait } from 'src/app/common/tools/tool';
import { StationType } from 'src/app/enum/station-type.enum';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { MixedIntoEventRecord } from 'src/app/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CardRecordEpisodeBusiness } from './card-record-episode.business';
import {
  CardRecordEpisodeRecordArgs,
  CardRecordEpisodeUrl,
  CardRecordEpisodeVideoArgs,
} from './card-record-episode.model';
import { CardRecordEpisodeService } from './card-record-episode.service';

@Component({
  selector: 'card-record-episode',
  templateUrl: './card-record-episode.component.html',
  styleUrls: ['./card-record-episode.component.less'],
  providers: [CardRecordEpisodeService, CardRecordEpisodeBusiness],
})
export class CardRecordEpisodeComponent implements OnInit, OnDestroy {
  @Input()
  record?: MixedIntoEventRecord;
  @Output()
  close: EventEmitter<void> = new EventEmitter();
  constructor(private business: CardRecordEpisodeBusiness) {}

  args = {
    record: new CardRecordEpisodeRecordArgs(),
    video: new CardRecordEpisodeVideoArgs(),
  };

  station?: GarbageStation;
  cardRecords: AIGarbageRfidCardRecord[] = [];
  stop: EventEmitter<void> = new EventEmitter();
  url: CardRecordEpisodeUrl = {};
  playing = false;
  StationType = StationType;

  ngOnInit(): void {
    if (this.record) {
      this.loadData(this.record);
    }
  }
  ngOnDestroy(): void {
    this.stop.unsubscribe();
  }

  loadData(record: MixedIntoEventRecord) {
    this.args.video.cameraId = record.ResourceId;
    this.args.video.time = record.EventTime;
    this.args.record.stationId = record.Data.StationId;
    this.args.record.duration = DateTimeTool.before(record.EventTime, 5 * 60);
    if (record.ImageUrl) {
      this.url.image = this.business.img(record.ImageUrl);
    }
    if (this.record) {
      this.business.get(this.record.Data.StationId).then((station) => {
        this.station = station;
      });
    }

    // this.cardRecords = plainToClass(
    //   AIGarbageRfidCardRecord,
    //   AIGarbageRfidCardRecordData
    // );

    this.business.record(this.args.record).then((x) => {
      this.cardRecords = x;
    });
  }

  toplay() {
    this.business.playback(this.args.video).then((x) => {
      this.url.video = x.Url;
      if (x.WebUrl) {
        this.url.web = x.WebUrl;
      }
    });
  }
  onplay() {
    this.playing = true;
  }

  onstop() {
    this.url.video = undefined;
    this.url.web = undefined;
    this.playing = false;
    this.stop.unsubscribe();
    this.stop = new EventEmitter();
  }

  oncamerachange() {
    this.stop.emit();
    if (this.station && this.station.Cameras) {
      let camera = this.station.Cameras.find(
        (x) => x.Id === this.args.video.cameraId
      );
      if (camera && camera.ImageUrl) {
        this.url.image = this.business.img(camera.ImageUrl);
      }
    }
  }
  onrecordclicked(item: AIGarbageRfidCardRecord) {
    if (this.playing) {
      this.stop.emit();
    }
    wait(
      () => {
        return !this.playing;
      },
      () => {
        this.args.video.time = item.Time;
        this.toplay();
      }
    );
  }
}
let AIGarbageRfidCardRecordData = [
  {
    Id: '64461a69ec7930850e9ed60d',
    CardId: 2937205848,
    Time: '2023-04-24T13:57:41.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1003室',
    CreationTime: '2023-04-24T13:58:01.500+08:00',
  },
  {
    Id: '64461a69ec7930850e9ed60c',
    CardId: 2937205846,
    Time: '2023-04-24T13:58:01.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1001室',
    CreationTime: '2023-04-24T13:58:01.495+08:00',
  },
  {
    Id: '644616c2ec7930850e9ed60b',
    CardId: 2937205848,
    Time: '2023-04-24T13:42:07.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1003室',
    CreationTime: '2023-04-24T13:42:26.642+08:00',
  },
  {
    Id: '644616c2ec7930850e9ed60a',
    CardId: 2937205846,
    Time: '2023-04-24T13:42:27.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1001室',
    CreationTime: '2023-04-24T13:42:26.641+08:00',
  },
  {
    Id: '644616bcec7930850e9ed609',
    CardId: 2937205848,
    Time: '2023-04-24T13:42:01.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1003室',
    CreationTime: '2023-04-24T13:42:20.764+08:00',
  },
  {
    Id: '644616bcec7930850e9ed608',
    CardId: 2937205846,
    Time: '2023-04-24T13:42:21.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1001室',
    CreationTime: '2023-04-24T13:42:20.763+08:00',
  },
  {
    Id: '644616b7ec7930850e9ed607',
    CardId: 2937205848,
    Time: '2023-04-24T13:41:56.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1003室',
    CreationTime: '2023-04-24T13:42:15.950+08:00',
  },
  {
    Id: '644616b7ec7930850e9ed606',
    CardId: 2937205846,
    Time: '2023-04-24T13:42:16.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1001室',
    CreationTime: '2023-04-24T13:42:15.949+08:00',
  },
  {
    Id: '644616b3ec7930850e9ed605',
    CardId: 2937205848,
    Time: '2023-04-24T13:41:51.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1003室',
    CreationTime: '2023-04-24T13:42:11.421+08:00',
  },
  {
    Id: '644616b3ec7930850e9ed604',
    CardId: 2937205846,
    Time: '2023-04-24T13:42:11.000+08:00',
    DeviceId: '100001',
    DeviceName: '1号',
    GarbageStationId: '310110019027001000',
    GarbageStationName: '逸仙路167弄2号',
    RegionId: '310110019027001',
    RegionName: '逸仙路167弄',
    BuildingNo: '32号',
    RoomNo: '1001室',
    CreationTime: '2023-04-24T13:42:11.420+08:00',
  },
];
