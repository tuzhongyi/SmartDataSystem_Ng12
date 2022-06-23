import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Medium } from 'src/app/common/tools/medium';
import { ImageControlModel } from '../../../../view-model/image-control.model';

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

  constructor() { }
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
      (event.target as HTMLImageElement).src = Medium.default;
    }
  }

  clicked() {
    this.onclick.emit(this.model);
  }
}
