import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { AIGarbageStationDeviceTableArgs } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-device-table/ai-garbage-station-device-table.model';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageCamera } from 'src/app/network/model/ai-garbage/camera.model';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIGarbageStationDeviceManagerBusiness } from './ai-garbage-station-device-manager.business';
import { AIGarbageStationDeviceWindow } from './ai-garbage-station-device-manager.model';

@Component({
  selector: 'app-ai-garbage-station-device-manager',
  templateUrl: './ai-garbage-station-device-manager.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-device-manager.component.less',
  ],
  providers: [AIGarbageStationDeviceManagerBusiness],
})
export class AIGarbageStationDeviceManagerComponent {
  constructor(private business: AIGarbageStationDeviceManagerBusiness) {}

  title: string = '厢房设备';
  args: AIGarbageStationDeviceTableArgs = new AIGarbageStationDeviceTableArgs();
  load: EventEmitter<AIGarbageStationDeviceTableArgs> = new EventEmitter();
  selecteds: AIGarbageDevice[] = [];
  window = new AIGarbageStationDeviceWindow();

  selectDivisionClick(nodes: CommonFlatNode[]) {
    this.args.regionId = undefined;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.RawData instanceof AIGarbageRegion) {
        this.args.regionId = node.RawData.Id;
      }
    }

    this.load.emit(this.args);
  }
  tocreate() {
    this.window.details.show = true;
  }
  tosearch(value: string) {
    this.args.name = value;
    this.load.emit(this.args);
  }
  ondetails(item: AIGarbageDevice) {
    this.window.details.model = item;
    this.window.details.show = true;
  }
  oncommand(item: AIGarbageDevice) {
    this.window.command.model = item;
    this.window.command.show = true;
  }
  oncamera(item: AIGarbageDevice) {
    if (item.GarbageStationId) {
      this.window.camera.model = item;
      this.window.camera.show = true;
    } else if (item && item.Cameras && item.Cameras.length > 0) {
      this.window.camera.model = item;
      this.window.camera.show = true;
    }
  }
  ondropwindow(item: AIGarbageDevice) {
    if (item && item.DropWindows && item.DropWindows.length > 0) {
      this.window.drop.model = item;
      this.window.drop.show = true;
    }
  }
  onschedule(item: AIGarbageDevice) {
    this.window.schedule.model = item;
    this.window.schedule.show = true;
  }
  onexport() {
    this.business.download(this.title).then((x) => {
      MessageBar.response_success('操作成功');
    });
  }
  onimport() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  @ViewChild('file')
  file?: ElementRef;
  onfile() {
    if (this.file) {
      const t_files = this.file.nativeElement.files;
      if (t_files.length > 0) {
        this.business
          .upload(t_files[0])
          .then((x) => {
            MessageBar.response_success('操作成功');
            this.load.emit(this.args);
          })
          .catch((x) => {
            MessageBar.response_Error('操作失败');
          });
        this.file.nativeElement.value = null;
      }
    }
  }

  todelete(item?: AIGarbageDevice) {
    if (item) {
      this.window.confirm.models = [item];
      this.window.confirm.language = `删除 ${item.Name}`;
    } else if (this.selecteds.length > 0) {
      this.window.confirm.models = [...this.selecteds];
      this.window.confirm.language = `删除 ${this.window.confirm.models.length} 个区域`;
    } else {
      return;
    }
    this.window.confirm.show = true;
  }
  ondelete(models?: AIGarbageDevice[]) {
    if (models) {
      this.business
        .delete(models.map((x) => x.Id))
        .then((x) => {
          MessageBar.response_success('操作成功');
          this.load.emit(this.args);
        })
        .catch((x) => {
          console.error(x);
          MessageBar.response_Error('操作失败');
        })
        .finally(() => {
          this.closewindow();
        });
    }
  }
  closewindow() {
    this.window.clear();
    this.window.close();
  }
  onupdate() {
    this.load.emit(this.args);
    this.closewindow();
  }
  async onvideo(model: AIGarbageCamera) {
    if (model.CameraId) {
      this.window.video.title = model.Name;
      this.window.video.model = await this.business.preview(model.CameraId);
      this.window.video.show = true;
    }
  }
}
