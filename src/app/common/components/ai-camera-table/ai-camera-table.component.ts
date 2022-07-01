import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { AICameraModelManageModel } from 'src/app/view-model/ai-camera-model-manage.model';

@Component({
  selector: 'howell-ai-camera-table',
  templateUrl: './ai-camera-table.component.html',
  styleUrls: ['./ai-camera-table.component.less']
})
export class AICameraTableComponent implements OnInit {
  private selection!: SelectionModel<AICameraModelManageModel>;

  dataSource: AICameraModelManageModel[] = [];
  // 组件更新数据时，自动更新 table 数据
  @Input()
  dataSubject = new BehaviorSubject<AICameraModelManageModel[]>([]);


  // 单选表 || 多选表
  @Input('tableSelectStrategy')
  selectModel = SelectStrategy.Single;

  constructor() { }

  ngOnInit(): void {

    this.dataSubject.subscribe(data => {
      // let selected = this.selection.selected;
      // // 页数据切换时，清除状态
      // this.selection.clear();

      // // 当前页数据更新时，保留状态
      // for (let i = 0; i < selected.length; i++) {
      //   let item = selected[i];
      //   let d = data.find((d: any) => d.Id == item.Id);
      //   // 用新对象替换原对象，维持高亮状态
      //   if (d) {
      //     this.selection.deselect(item);
      //     this.selection.select(d)
      //   }

      // }
      this.dataSource = data;

      console.log(this.dataSource)
    })
  }

}
