import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { SelectCameraBusiness } from './select-camera.business';
import { SelectCameraArgs } from './select-camera.model';

@Component({
  selector: 'howell-select-camera',
  templateUrl: './select-camera.component.html',
  styleUrls: ['./select-camera.component.less'],
  providers: [SelectCameraBusiness],
})
export class SelectCameraComponent implements OnInit {
  @Input() divisionId?: string;
  @Input() stationId?: string;

  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  constructor(private business: SelectCameraBusiness) {}

  datas: Camera[] = [];
  args = new SelectCameraArgs();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      if (this.args.divisionId != this.divisionId) {
        this.args.divisionId = this.divisionId;
        if (changes.divisionId.isFirstChange() == false) {
          this.load();
        }
      }
    }
    if (changes.stationId) {
      if (this.args.stationId != this.stationId) {
        this.args.stationId = this.stationId;
        if (changes.stationId.isFirstChange() == false) {
          this.load();
        }
      }
    }
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
    });
  }
  onchange() {
    this.selectedIdChange.emit(this.selectedId);
  }
}
