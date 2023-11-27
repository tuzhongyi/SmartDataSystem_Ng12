import { Component, EventEmitter, OnInit } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import {
  AuditLogVideoTableArgs,
  AuditLogVideoTableSearchName,
} from 'src/app/common/components/tables/audit-log-video-table/audit-log-video-table.model';
import { VideoOperationType } from 'src/app/enum/video-operation-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

@Component({
  selector: 'audit-log-video-manager',
  templateUrl: './audit-log-video-manager.component.html',
  styleUrls: ['../audit.less', './audit-log-video-manager.component.less'],
})
export class AuditLogVideoManagerComponent implements OnInit {
  args = new AuditLogVideoTableArgs();
  load = new EventEmitter<AuditLogVideoTableArgs>();
  NameType = AuditLogVideoTableSearchName;
  Operation = VideoOperationType;
  nodes: CommonFlatNode<DivisionTreeSource>[] = [];
  showDivision = false;
  constructor() {}

  ngOnInit(): void {}

  onsearch() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
  ondivision(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.nodes = nodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.args.divisionId = node.Id;
      this.showDivision = false;
      this.args.tofirst = true;
      this.load.emit(this.args);
      return;
    }
  }
}
