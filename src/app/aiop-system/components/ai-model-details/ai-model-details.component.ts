import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileReadType } from 'src/app/common/components/upload-control/upload-control.model';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { AIModelDetailsBusiness } from './ai-model-details.business';
import { AIModelDetailsCreater as Creater } from './ai-model-details.creater';
import {
  AIModelDetailsIconSelection,
  AIModelDetailsLabelSelection,
  AIModelDetailsUploadModel,
} from './ai-model-details.model';

@Component({
  selector: 'ai-model-details',
  templateUrl: './ai-model-details.component.html',
  styleUrls: ['./ai-model-details.component.less'],
  providers: [AIModelDetailsBusiness],
})
export class AIModelDetailsComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  constructor(
    private business: AIModelDetailsBusiness,
    private toastr: ToastrService
  ) {}

  data: CameraAIModel = Creater.CameraAIModel();
  model?: CameraAIModel;
  FileReadType = FileReadType;
  imgBase = 'assets/img/ai-model/';

  icon = new AIModelDetailsIconSelection();
  label = new AIModelDetailsLabelSelection();
  upload = new AIModelDetailsUploadModel();

  ngOnInit(): void {
    if (this.id) {
      this.load(this.id);
    } else {
      this.model = this.data;
      this.icon.select(this.data.Label.toString());
    }

    this.icon.regist();
  }
  ngOnDestroy(): void {
    this.icon.destroy();
  }

  load(id: string) {
    this.business.get(id).then((x) => {
      this.data = x;
      this.model = x;
      this.icon.select(this.data.Label.toString());
      this.label.load(this.model.ModelDTO?.Labels);
    });
  }

  onparse() {
    if (this.upload.data) {
      this.business.parse(this.upload.data).then((x) => {
        this.model = x;
        this.model.ModelName = this.data.ModelName;
        this.model.ModelType = this.data.ModelType;
        this.label.load(this.model.ModelDTO?.Labels);
      });
    } else {
      this.toastr.warning('请选择模型文件');
    }
  }

  ondownload() {
    if (this.model) {
      this.business.download(
        this.model.ModelName ?? this.model.Id,
        this.model.ModelJSON
      );
    }
  }

  oncancel() {
    this.cancel.emit();
  }

  onok() {
    if (!this.model) return;
    let promise: Promise<CameraAIModel>;

    this.model.ModelName = this.data.ModelName;
    this.model.ModelType = this.data.ModelType;
    this.model.Label = parseInt(this.icon.selected.key);
    if (this.id) {
      promise = this.business.update(this.model);
    } else {
      promise = this.business.create(this.model);
    }
    promise
      .then((x) => {
        this.toastr.success('操作成功');
        this.ok.emit();
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }
}
