import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import {
  AuditCameraDetailsTableConfig as TableConfig,
  AuditCameraDetailsTableConfigLanguage as TableConfigLanguage,
} from 'src/app/common/components/tables/audit-camera-details-table/audit-camera-details-table.model';
import { AuditListCameraManagerConfigBusiness } from './audit-list-camera-manager-config.business';
import { AuditListCameraManagerConfigConverter } from './audit-list-camera-manager-config.converter';
import { AuditListCameraManagerConfigItem as ConfigItem } from './audit-list-camera-manager-config.model';

@Component({
  selector: 'audit-list-camera-manager-config',
  templateUrl: './audit-list-camera-manager-config.component.html',
  styleUrls: ['./audit-list-camera-manager-config.component.less'],
  providers: [AuditListCameraManagerConfigBusiness],
})
export class AuditListCameraManagerConfigComponent implements OnInit {
  @Input() config = new TableConfig();
  @Output() configChange = new EventEmitter<TableConfig>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: AuditListCameraManagerConfigBusiness,
    private toastr: ToastrService
  ) {}

  data?: TableConfig;
  enableds: ConfigItem[] = [];
  all: ConfigItem[] = [];
  converter = new AuditListCameraManagerConfigConverter();
  ConfigLanguage = TableConfigLanguage;

  ngOnInit(): void {
    this.load();
  }

  load() {
    let plain = instanceToPlain(this.config);
    this.data = plainToInstance(TableConfig, plain);
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
