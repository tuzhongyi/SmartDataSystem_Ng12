import { Component, Inject, Input, OnInit } from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { ElementListBusiness } from './element-list.business';
import { ElementListConverter } from './element-list.converter';
import {
  ElementListModel,
  ElementListToken,
  IElementListBusiness,
} from './element-list.model';

@Component({
  selector: 'element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.less'],
  providers: [
    {
      provide: ElementListToken,
      useClass: ElementListBusiness,
    },
    ElementListConverter,
  ],
})
export class ElementListComponent implements OnInit {
  // @Input() business?: IElementListBusiness<any>;

  model: ElementListModel<IModel> | null = null;
  selectedModel: ElementListModel<IModel> | null = null;

  constructor(
    @Inject(ElementListToken) private _business: IElementListBusiness<IModel>
  ) {}

  async ngOnInit() {
    this.model = await this._business.init();
  }

  click(model: ElementListModel<IModel>) {
    this.selectedModel = model;
  }
}
