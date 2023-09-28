import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Language } from 'src/app/common/tools/language';
import { DapuqiaoMainSuperviseDetailsBusiness } from './dapuqiao-main-supervise-details.business';
import { GarbageDropEventRecordModel } from './dapuqiao-main-supervise-details.model';
import { DapuqiaoMainSuperviseDetailsService } from './dapuqiao-main-supervise-details.service';

@Component({
  selector: 'dapuqiao-main-supervise-details',
  templateUrl: './dapuqiao-main-supervise-details.component.html',
  styleUrls: ['./dapuqiao-main-supervise-details.component.less'],
  providers: [
    DapuqiaoMainSuperviseDetailsService,
    DapuqiaoMainSuperviseDetailsBusiness,
  ],
})
export class DapuqiaoMainSuperviseDetailsComponent implements OnInit {
  @Input() eventId?: string;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() supervise: EventEmitter<string> = new EventEmitter();
  constructor(
    private business: DapuqiaoMainSuperviseDetailsBusiness,
    private toastr: ToastrService
  ) {}

  Language = Language;
  model?: GarbageDropEventRecordModel;

  ngOnInit(): void {
    if (this.eventId) {
      this.loadData(this.eventId);
    }
  }
  loadData(id: string) {
    this.business.load(id).then((x) => {
      this.model = x;
    });
  }
  onclick() {
    this.close.emit();
  }
  onsupervise() {
    if (
      this.model &&
      (this.model.Data.SuperVisionData?.SupervisedState === 1 ||
        this.model.Data.IsHandle)
    ) {
      return;
    }
    if (this.eventId) {
      this.business
        .supervise(this.eventId)
        .then((x) => {
          this.toastr.success('操作成功');
          this.supervise.emit(this.eventId);
        })
        .catch((e) => {
          console.error(e);
          this.toastr.error('操作失败');
        });
    }
  }
}
