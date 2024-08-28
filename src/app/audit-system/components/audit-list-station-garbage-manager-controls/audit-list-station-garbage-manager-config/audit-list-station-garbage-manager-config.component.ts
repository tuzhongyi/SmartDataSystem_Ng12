import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import {
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableConfigLanguage,
} from 'src/app/common/components/tables/audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditListStationGarbageManagerConfigBusiness } from './audit-list-station-garbage-manager-config.business';
import { AuditListStationGarbageManagerConfigConverter } from './audit-list-station-garbage-manager-config.converter';
import { AuditListStationGarbageManagerConfigItem as ConfigItem } from './audit-list-station-garbage-manager-config.model';

@Component({
  selector: 'audit-list-station-garbage-manager-config',
  templateUrl: './audit-list-station-garbage-manager-config.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-config.component.less'],
  providers: [AuditListStationGarbageManagerConfigBusiness],
})
export class AuditListStationGarbageManagerConfigComponent implements OnInit {
  @Input() config = new AuditGarbageStationDetailsTableConfig();
  @Output() configChange =
    new EventEmitter<AuditGarbageStationDetailsTableConfig>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: AuditListStationGarbageManagerConfigBusiness,
    private toastr: ToastrService
  ) {}

  data?: AuditGarbageStationDetailsTableConfig;
  enableds: ConfigItem[] = [];
  all: ConfigItem[] = [];
  converter = new AuditListStationGarbageManagerConfigConverter();
  ConfigLanguage = AuditGarbageStationDetailsTableConfigLanguage;

  ngOnInit(): void {
    this.load();
  }

  load() {
    let plain = instanceToPlain(this.config);
    this.data = plainToInstance(AuditGarbageStationDetailsTableConfig, plain);
    this.all = Object.keys(this.data).map((key) => {
      let data = this.data!;
      return {
        key: key,
        index: data[key].index,
        enabled: data[key].enabled,
      };
    });
    this.enableds = this.all
      .filter((x) => x.enabled)
      .sort((a, b) => {
        return a.index - b.index;
      });
  }

  onok() {
    let data = this.converter.convert(this.all, this.enableds);
    this.business
      .set(data)
      .then((x) => {
        this.configChange.emit(data);
        this.close.emit();
        this.toastr.success('保存成功');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  oncancel() {
    this.close.emit();
  }

  onclear() {
    this.business
      .clear()
      .then((x) => {
        this.toastr.success('删除成功');
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  ondrop(event: CdkDragDrop<ConfigItem[]>) {
    moveItemInArray(this.enableds, event.previousIndex, event.currentIndex);
  }

  onselect(item: ConfigItem) {
    let index = this.enableds.indexOf(item);
    if (index < 0) {
      this.enableds.push(item);
    } else {
      this.enableds.splice(index, 1);
    }
  }

  onselectall() {
    for (let i = 0; i < this.all.length; i++) {
      const item = this.all[i];
      if (!this.enableds.includes(item)) {
        this.enableds.push(item);
      }
    }
  }
  onselectreverse() {
    for (let i = 0; i < this.all.length; i++) {
      const item = this.all[i];
      let index = this.enableds.indexOf(item);
      if (index < 0) {
        this.enableds.push(item);
      } else {
        this.enableds.splice(index, 1);
      }
    }
  }

  onreset() {
    this.enableds = [...this.all];
  }
}
