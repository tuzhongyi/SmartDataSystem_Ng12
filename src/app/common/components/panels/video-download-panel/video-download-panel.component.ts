import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { WindowViewModel } from '../../window-control/window.model';
import { VideoDownloader } from './video-downloader.model';

@Component({
  selector: 'howell-video-download-panel',
  templateUrl: './video-download-panel.component.html',
  styleUrls: ['./video-download-panel.component.less'],
})
export class VideoDownloadPanelComponent
  implements IComponent<IModel, VideoDownloader[]>, OnInit
{
  models?: VideoDownloader[];

  selected?: VideoDownloader;

  constructor() {}

  @Input()
  business!: IBusiness<IModel, VideoDownloader[]>;

  @Output()
  download: EventEmitter<VideoDownloader> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  async ngOnInit() {
    this.models = await this.business.load();
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
