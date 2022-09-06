import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/common/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { CommitteesNavicationModel } from '../../navication/navication.component.model';

@Injectable()
export class ElectricBikeIndexNavicationBusiness {
  constructor(private store: StoreService) {}
  root?: CommitteesNavicationModel;
  children: CommitteesNavicationModel[] = [];
  selected?: CommitteesNavicationModel;

  onchildclick(model: CommitteesNavicationModel<Division>) {
    this.selected = model;

    if (model.data) {
      this.store.divisionType = model.data.DivisionType;
      this.store.divisionId = model.data.Id;
      this.store.statusChange.emit();
    }
  }

  onrootclick(model: CommitteesNavicationModel<Division>) {
    this.selected = model;

    if (model.data) {
      this.store.divisionType = model.data.DivisionType;
      this.store.divisionId = model.data.Id;
      this.store.statusChange.emit();
    }
  }
}
