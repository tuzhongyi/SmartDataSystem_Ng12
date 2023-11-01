import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { VideoDownloader } from './video-downloader.model';

@Component({
  selector: 'howell-video-download-panel',
  templateUrl: './video-download-panel.component.html',
  styleUrls: ['./video-download-panel.component.less'],
})
export class VideoDownloadPanelComponent
  implements IComponent<IModel, VideoDownloader[]>, OnInit
{
  @Input()
  type: EventType = EventType.MixedInto;
  @Input()
  business!: IBusiness<IModel, VideoDownloader[]>;

  @Output()
  download: EventEmitter<VideoDownloader> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor() {}

  models?: VideoDownloader[];
  selected?: VideoDownloader;

  async ngOnInit() {
    let usage: CameraUsage;
    switch (this.type) {
      case EventType.GarbageFull:
        usage = CameraUsage.GarbageFull;
        break;
      case EventType.GarbageVolume:
        usage = CameraUsage.Volume;
        break;
      case EventType.IllegalDrop:
        usage = CameraUsage.IllegalDrop;
        break;
      case EventType.Sewage:
        usage = CameraUsage.Sewage;
        break;
      case EventType.MixedInto:
      default:
        usage = CameraUsage.MixedInto;
        break;
    }
    this.models = await this.business.load(usage);
  }

  ondownload() {
    if (this.selected) {
      this.download.emit(this.selected);
    }
  }
  oncancel() {
    this.cancel.emit();
  }
}
