import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { ImageControlModel } from '../../image-control/image-control.model';

@Component({
  selector: 'howell-garbage-drop-event-panel',
  templateUrl: './garbage-drop-event-panel.component.html',
  styleUrls: ['./garbage-drop-event-panel.component.less'],
})
export class GarbageDropEventPanelComponent implements OnInit, OnChanges {
  @Input()
  model?: ImageControlModel;

  @Output()
  onclick: EventEmitter<ImageControlModel> = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.model) {
    }
  }

  ngOnInit(): void {
    if (this.model) {
      this.model.onerror;
    }
  }

  onerror(event: Event) {
    if (event.target) {
      (event.target as HTMLImageElement).src = MediumRequestService.default;
    }
  }

  clicked() {
    this.onclick.emit(this.model);
  }
}
