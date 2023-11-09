import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { AIGarbageStationRegionTableArgs } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-region-table/ai-garbage-station-region-table.model';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIGarbageStationRegionManagerBusiness } from './ai-garbage-station-region-manager.business';
import { AIGarbageStationRegionWindow } from './ai-garbage-station-region-manager.model';

@Component({
  selector: 'app-ai-garbage-station-region-manager',
  templateUrl: './ai-garbage-station-region-manager.component.html',
  styleUrls: [
    '../../../../../assets/less/confirm.less',
    './ai-garbage-station-region-manager.component.less',
  ],
  providers: [AIGarbageStationRegionManagerBusiness],
})
export class AIGarbageStationRegionManagerComponent {
  constructor(private business: AIGarbageStationRegionManagerBusiness) {}

  title: string = '区域';
  args: AIGarbageStationRegionTableArgs = new AIGarbageStationRegionTableArgs();
  load: EventEmitter<AIGarbageStationRegionTableArgs> = new EventEmitter();
  selecteds: AIGarbageRegion[] = [];
  window = new AIGarbageStationRegionWindow();

  selectDivisionClick(nodes: CommonFlatNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (
        node.RawData instanceof Division &&
        node.RawData.DivisionType === DivisionType.County
      ) {
        this.args.divisionId = node.RawData.Id;
        this.args.tofirst = true;
        this.load.emit(this.args);
      }
    }
  }
  todelete(item?: AIGarbageRegion) {
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
  ondelete(models: AIGarbageRegion[]) {
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
  ondetails(item: AIGarbageRegion) {
    this.window.details.model = item;
    this.window.details.show = true;
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
        this.business.upload(t_files[0]).then((x) => {
          MessageBar.response_success('操作成功');
          this.args.tofirst = false;
          this.load.emit(this.args);
        });
        this.file.nativeElement.value = null;
      }
    }
  }
  onbuilding(item: AIGarbageRegion) {
    // if (item && item.Buildings && item.Buildings.length > 0) {
    this.window.building.model = item;
    this.window.building.show = true;
    // }
  }
  onstation(item: AIGarbageRegion) {
    if (item && item.GarbageStations && item.GarbageStations.length > 0) {
      this.window.station.model = item;
      this.window.station.style.height =
        this.window.station.model &&
        this.window.station.model.GarbageStations &&
        this.window.station.model.GarbageStations.length > 8
          ? '564px'
          : 'auto';
      this.window.station.show = true;
    }
  }
  closewindow() {
    this.window.clear();
    this.window.close();
  }
}
