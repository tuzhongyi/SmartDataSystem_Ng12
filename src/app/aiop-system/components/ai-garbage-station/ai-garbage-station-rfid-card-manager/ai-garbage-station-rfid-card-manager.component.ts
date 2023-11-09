import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { AIGarbageStationRfidCardTableArgs } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-rfid-card-table/ai-garbage-station-rfid-card-table.model';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { AIGarbageRfidCard } from 'src/app/network/model/ai-garbage/rfid-card.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIGarbageStationRfidCardManagerBusiness } from './ai-garbage-station-rfid-card-manager.business';
import { AIGarbageStationRfidCardWindow } from './ai-garbage-station-rfid-card-manager.model';

@Component({
  selector: 'app-ai-garbage-station-rfid-card-manager',
  templateUrl: './ai-garbage-station-rfid-card-manager.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-rfid-card-manager.component.less',
  ],
  providers: [AIGarbageStationRfidCardManagerBusiness],
})
export class AIGarbageStationRfidCardManagerComponent {
  constructor(private business: AIGarbageStationRfidCardManagerBusiness) {}

  title: string = 'Rfid';
  args: AIGarbageStationRfidCardTableArgs =
    new AIGarbageStationRfidCardTableArgs();
  load: EventEmitter<AIGarbageStationRfidCardTableArgs> = new EventEmitter();
  selecteds: AIGarbageRfidCard[] = [];
  window = new AIGarbageStationRfidCardWindow();

  selectDivisionClick(nodes: CommonFlatNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.RawData instanceof AIGarbageRegion) {
        this.args.regionId = node.RawData.Id;
        this.args.tofirst = true;
        this.load.emit(this.args);
      }
    }
  }
  todelete(item?: AIGarbageRfidCard) {
    if (item) {
      this.window.confirm.models = [item];
      this.window.confirm.language = `删除卡号 ${item.Id}`;
    } else if (this.selecteds.length > 0) {
      this.window.confirm.models = [...this.selecteds];
      this.window.confirm.language = `删除 ${this.window.confirm.models.length} 个${this.title}`;
    } else {
      return;
    }
    this.window.confirm.show = true;
  }
  ondelete(models: AIGarbageRfidCard[]) {
    this.business
      .delete(models.map((x) => x.Id))
      .then((x) => {
        MessageBar.response_success('操作成功');
        this.args.tofirst = false;
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
  tosearch(value: string) {
    this.args.name = value;
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
  ondetails(item: AIGarbageRfidCard) {
    this.window.details.model = item;
    this.window.details.show = true;
  }
  onexport() {
    if (this.args.regionId) {
      this.business.download(this.title, this.args.regionId).then((x) => {
        MessageBar.response_success('操作成功');
      });
    } else {
      MessageBar.response_warning('请选择区域');
    }
  }
  onimport() {
    if (this.file) {
      this.file.nativeElement.click();
    }
  }
  @ViewChild('file')
  file?: ElementRef;
  onfile() {
    if (this.args.regionId) {
      if (this.file) {
        const t_files = this.file.nativeElement.files;
        if (t_files.length > 0) {
          this.business.upload(t_files[0], this.args.regionId).then((x) => {
            MessageBar.response_success('操作成功');
            this.args.tofirst = false;
            this.load.emit(this.args);
          });
          this.file.nativeElement.value = null;
        }
      }
    } else {
      MessageBar.response_warning('请选择区域');
    }
  }
  closewindow() {
    this.window.clear();
    this.window.close();
  }
  onupdate() {
    this.args.tofirst = false;
    this.load.emit(this.args);
    this.closewindow();
  }
}
