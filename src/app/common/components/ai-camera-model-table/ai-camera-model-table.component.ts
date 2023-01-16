import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AICameraModelManageEvent, AICameraModelManageModel, AICameraModelOperateData, AICameraModelOperateType } from 'src/app/aiop-system/components/camera-model-manage/camera-model-manage.model';
import { AIModelManageModel } from 'src/app/view-model/ai-model-manage.model';

@Component({
  selector: 'howell-ai-camera-model-table',
  templateUrl: './ai-camera-model-table.component.html',
  styleUrls: ['./ai-camera-model-table.component.less']
})
export class AICameraModelTableComponent implements OnInit, AfterViewInit {
  private selection!: SelectionModel<AICameraModelManageModel>;


  dataSource: AICameraModelManageModel[] = [];
  maxLength = 4;// 摄像机最大绑定AI模型数量

  highLight = (model: AICameraModelManageModel) => {
    return this.selection.isSelected(model);
  };

  // 组件更新数据时，自动更新 table 数据
  @Input()
  dataSubject = new BehaviorSubject<AICameraModelManageModel[]>([]);

  @Input('selectStrategy')
  selectStrategy = SelectStrategy.Multiple;

  @Input() disablehover = false;

  @Output() selectTableRow: EventEmitter<AICameraModelManageModel[]> = new EventEmitter<
    AICameraModelManageModel[]
  >();


  @Output() operateTableRow: EventEmitter<AICameraModelManageEvent> = new EventEmitter();

  constructor(private _toastrService: ToastrService) { }

  ngOnInit(): void {

    if (this.selectStrategy == SelectStrategy.Single) {
      this.selection = new SelectionModel<AICameraModelManageModel>();
    } else {
      this.selection = new SelectionModel<AICameraModelManageModel>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTableRow.emit(change.source.selected);
    });
    this.dataSubject.subscribe(data => {
      // this.dataSource = data;

      let selected = this.selection.selected;
      // 页数据切换时，清除状态
      this.selection.clear();

      // 当前页数据更新时，保留状态
      for (let i = 0; i < selected.length; i++) {
        let item = selected[i];
        let d = data.find((d: AICameraModelManageModel) => d.Id == item.Id);
        // 用新对象替换原对象，维持高亮状态
        if (d) {
          this.selection.deselect(item);
          this.selection.select(d)
        }

      }
      this.dataSource = data;

      // console.log(this.dataSource)
    })

  }

  ngAfterViewInit(): void {

  }

  selectAll() {
    this.selection.select(...this.dataSource);
  }
  selectReverse() {

    this.dataSource.forEach((data) => this.selection.toggle(data));

  }
  selectCancel() {
    this.selection.clear();
  }

  dragenter(e: DragEvent, row: AICameraModelManageModel) {
    // 临时高亮,不会将 row 加入 selected 池中
    if (!this.selection.isSelected(row)) {
      let target = e.currentTarget as HTMLDivElement;
      target.classList.add('high-light')
    }
    e.preventDefault();
  }
  dragleave(e: DragEvent, row: AICameraModelManageModel) {
    // 临时高亮
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
      if (!this.selection.isSelected(row)) {
        let target = e.currentTarget as HTMLDivElement;
        target.classList.remove('high-light')
      }
    }
  }
  dragover(e: DragEvent, row: AICameraModelManageModel) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }
  drop(e: DragEvent, row: AICameraModelManageModel) {
    console.log('drop')

    if (e.dataTransfer) {
      let tmp = e.dataTransfer.getData('text/plain');
      if (tmp) {
        let model = JSON.parse(tmp);
        let data: Array<AICameraModelOperateData> = [];


        // 如果拉取到已选中项上，则给所有选中项添加
        if (this.selection.isSelected(row)) {
          // 排除已经有该模型的摄像机
          for (let i = 0; i < this.selection.selected.length; i++) {
            let selected = this.selection.selected[i];
            let res = this._getOperateData(selected, model);
            if (res) {
              data.push(res)
            }
          }

        } else {
          let res = this._getOperateData(row, model);
          // console.log(res)
          if (res) {
            data.push(res);
            this.selection.select(row)
          } else {
            let target = e.currentTarget as HTMLDivElement;
            target.classList.remove('high-light')
          }



        }

        if (data.length != 0) {
          this.operateTableRow.emit({
            type: AICameraModelOperateType.add,
            data
          })
        }
        console.log(data)

      }
    }
  }
  clickRow(row: AICameraModelManageModel) {
    this.selection.toggle(row)
  }

  delete(e: Event, row: AICameraModelManageModel, model: AIModelManageModel) {
    e.stopPropagation();
    this.operateTableRow.emit({
      type: AICameraModelOperateType.delete,
      data: [{
        CameraId: row.Id,
        CameraName: row.Name,
        ModelId: model.Id
      }]
    })
  }

  private _getOperateData(row: AICameraModelManageModel, model: AIModelManageModel) {

    if (row.AIModels.length < this.maxLength && row.AIModels.every(m => m.Id != model.Id)) {
      return {
        CameraId: row.Id,
        CameraName: row.Name,
        ModelId: model.Id
      }
    }
    return false;
  }

}
