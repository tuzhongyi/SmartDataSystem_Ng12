import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageDropWindow } from 'src/app/network/model/ai-garbage/drop-window.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageStationDeviceDropWindowBusiness } from './ai-garbage-station-device-drop-window.business';
import { AIGarbageStationDeviceDropWindow } from './ai-garbage-station-device-drop-window.model';

@Component({
  selector: 'app-ai-garbage-station-device-drop-window',
  templateUrl: './ai-garbage-station-device-drop-window.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-drop-window.component.less',
  ],
  providers: [AIGarbageStationDeviceDropWindowBusiness],
})
export class AIGarbageStationDeviceDropWindowComponent implements OnInit {
  @Input()
  model?: AIGarbageDevice;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(private business: AIGarbageStationDeviceDropWindowBusiness) {}

  ngOnInit(): void {
    if (this.model) {
      if (this.model.DropWindows && this.model.DropWindows.length > 0) {
        this.selected = this.model.DropWindows[0];
      }
    }
  }
  selected?: AIGarbageDropWindow;
  window = new AIGarbageStationDeviceDropWindow();
  Language = Language;

  onclose() {
    this.close.emit();
  }
  tocommand() {
    this.window.confirm.show = true;
  }
  oncommand() {
    if (this.model && this.selected) {
      this.business
        .command(this.model.Id, this.selected.No)
        .then((x) => {
          MessageBar.response_success('操作成功');
        })
        .catch((x) => {
          MessageBar.response_Error('操作失败');
        })
        .finally(() => {
          this.window.close();
        });
    }
  }
}
