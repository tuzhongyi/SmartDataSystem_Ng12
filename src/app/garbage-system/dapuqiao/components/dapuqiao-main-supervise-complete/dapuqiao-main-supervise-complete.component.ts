import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DapuqiaoMainSuperviseCompleteBusiness } from './dapuqiao-main-supervise-complete.business';
import {
  DapuqiaoMainSuperviseCompleteImageArgs,
  DapuqiaoMainSuperviseCompleteModel,
  GarbageDropEventRecordModel,
} from './dapuqiao-main-supervise-complete.model';
import { DapuqiaoMainSuperviseCompleteService } from './dapuqiao-main-supervise-complete.service';

@Component({
  selector: 'dapuqiao-main-supervise-complete',
  templateUrl: './dapuqiao-main-supervise-complete.component.html',
  styleUrls: ['./dapuqiao-main-supervise-complete.component.less'],
  providers: [
    DapuqiaoMainSuperviseCompleteService,
    DapuqiaoMainSuperviseCompleteBusiness,
  ],
})
export class DapuqiaoMainSuperviseCompleteComponent implements OnInit {
  @Input() eventId?: string;
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() image: EventEmitter<DapuqiaoMainSuperviseCompleteImageArgs> =
    new EventEmitter();

  constructor(private business: DapuqiaoMainSuperviseCompleteBusiness) {}

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

  onclose() {
    this.close.emit();
  }

  onimage(item: DapuqiaoMainSuperviseCompleteModel, index: number) {
    this.image.emit({
      model: item,
      index: index,
    });
  }
}
