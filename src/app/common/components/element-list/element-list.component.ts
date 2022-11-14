import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';
import { ElementListBusiness } from './element-list.business';
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
  ],
})
export class ElementListComponent implements OnInit {
  @Input() business: IElementListBusiness<IModel>;

  @Output() itemClick = new EventEmitter();

  model: ElementListModel<IModel> | null = null;
  selectedModel: ElementListModel<IModel> | null = null;

  constructor(
    @Inject(ElementListToken) business: IElementListBusiness<IModel>
  ) {
    this.business = business;
  }

  async ngOnInit() {
    this.model = await this.business.init();
  }

  click(model: ElementListModel<IModel>) {
    this.selectedModel = model;

    this.itemClick.emit(model);
  }
}