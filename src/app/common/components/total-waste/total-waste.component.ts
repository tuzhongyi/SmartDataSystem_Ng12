import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { User } from 'src/app/network/model/garbage-station/user.model';
import {
  GlobalStorageService,
  SystemType,
} from '../../service/global-storage.service';
import { LocalStorageService } from '../../service/local-storage.service';
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
    public global: GlobalStorageService,
    private local: LocalStorageService
  ) {
    this.user = this.local.user;
  }

  user: User;
  model: TotalWasteModel = new TotalWasteModel();
  Type = GarbageType;
  SystemType = SystemType;

  ngOnInit(): void {
    this.global.defaultDivisionId.then((id) => {
      this.business.load(id).then((x) => {
        this.model = x;
      });
    });
  }

  todetails(type: GarbageType) {
    this.details.emit(type);
  }
}
