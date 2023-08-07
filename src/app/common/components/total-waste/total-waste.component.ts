import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { GlobalStorageService } from '../../service/global-storage.service';
import { wait } from '../../tools/tool';
import { TotalWasteBusiness } from './total-waste.business';
import { TotalWasteModel } from './total-waste.model';

@Component({
  selector: 'app-total-waste',
  templateUrl: './total-waste.component.html',
  styleUrls: ['./total-waste.component.less'],
  providers: [TotalWasteBusiness],
})
export class TotalWasteComponent implements OnInit {
  @Output() details: EventEmitter<GarbageType> = new EventEmitter();

  constructor(
    private business: TotalWasteBusiness,
    private global: GlobalStorageService
  ) {}

  model: TotalWasteModel = new TotalWasteModel();
  Type = GarbageType;

  ngOnInit(): void {
    wait(
      () => {
        return !!this.global.defaultDivisionId;
      },
      () => {
        this.business.load(this.global.defaultDivisionId!).then((x) => {
          this.model = x;
        });
      }
    );
  }

  todetails(type: GarbageType) {
    this.details.emit(type);
  }
}
