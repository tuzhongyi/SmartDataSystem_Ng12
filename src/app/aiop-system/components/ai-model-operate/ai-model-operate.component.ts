import { DOCUMENT, KeyValue } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { decode } from 'js-base64';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { FormState } from 'src/app/enum/form-state.enum';
import {
  CameraAIModel,
  CameraAIModelDTOLabel,
} from 'src/app/network/model/garbage-station/camera-ai.model';
import Icons from 'src/assets/json/ai-icon.json';
import { AIModelOperateBusiness } from './ai-model-operate.business';

@Component({
  selector: 'howell-ai-model-operate',
  templateUrl: './ai-model-operate.component.html',
  styleUrls: ['./ai-model-operate.component.less'],
  providers: [AIModelOperateBusiness],
})
export class AIModelOperateComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private _operateModel?: CameraAIModel;
  private _parsedAIModel?: CameraAIModel;

  FormState = FormState;
  myForm = new FormGroup({
    ModelName: new FormControl('', Validators.required),
    ModelType: new FormControl('AIOP', Validators.required),
    FilePath: new FormControl('', Validators.required),
    Version: new FormControl({ value: '', disabled: true }),
    TransformType: new FormControl({ value: '', disabled: true }),
    ModelJson: new FormControl(''),
    Label: new FormControl('', [Validators.required]),
  });

  showList = false;
  imgBase = 'assets/img/ai-model/';
  selectedIconKey = '';

  myIcons = Icons;
  iconsMap = new Map(Object.entries(Icons));
  iconsValue = Array.from(this.iconsMap.values());
  iconsKey = Array.from(this.iconsMap.keys());
  iconsEntries = Array.from(this.iconsMap.entries());

  subscription!: Subscription;

  modelLabelsSubject = new BehaviorSubject<CameraAIModelDTOLabel[]>([]);

  get title() {
    if (this.state == FormState.add) {
      return '添加AI模型';
    } else if (this.state == FormState.edit) {
      return '编辑 ' + this._operateModel?.ModelName;
    }
    return '';
  }
  // 切换选中Icon
  get selectedIcon() {
    if (this.selectedIconValue) return this.imgBase + this.selectedIconValue;
    return '';
  }
  get selectedIconValue() {
    return this.iconsMap.get(this.selectedIconKey);
  }

  @Input()
  state: FormState = FormState.none;

  @Input()
  operateId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  @ViewChild('fileBtn') fileBtn?: ElementRef<HTMLInputElement>;

  constructor(
    private _business: AIModelOperateBusiness,
    private _toastrService: ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    if (this.state == FormState.edit) {
      this._operateModel = await this._business.getAIModel(this.operateId);
      console.log('编辑', this._operateModel);

      // 初始化AIModel树
      this.modelLabelsSubject.next(
        this._operateModel.ModelDTO ? this._operateModel.ModelDTO.Labels : []
      );
    }
    this.modelLabelsSubject.subscribe((labels) => {
      console.log('模型数据更新了');
    });
    this._updateForm();
  }

  ngAfterViewInit() {
    this.subscription = fromEvent(this.document.body, 'click').subscribe(() => {
      this.showList = false;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // 选择ModelJson文件
  triggerSelect() {
    if (this.fileBtn) {
      this.fileBtn.nativeElement.click();
    }
  }
  // 选中文件回调
  async selectFile(input: HTMLInputElement) {
    let filePath = input.value;
    let fileContent = '';

    if (input.files && input.files.length) {
      fileContent = (await this._readFileContent(input.files[0])) as string;
      fileContent = fileContent.replace('data:application/json;base64,', '');
    }

    // 每次切换模型文件，都重置状态
    this.myForm.patchValue({
      FilePath: filePath,
      ModelJson: fileContent,
      Version: '',
      TransformType: '',
    });

    if (this.state == FormState.edit) {
      this._parsedAIModel = void 0;
      if (filePath == '') {
        this.modelLabelsSubject.next(
          this._operateModel?.ModelDTO ? this._operateModel.ModelDTO.Labels : []
        );
        this.myForm.patchValue({
          Version: this._operateModel?.Version,
          TransformType: this._operateModel?.TransformType,
        });
      }
    }
  }
  // 应用模型
  async parseFile() {
    if (this.myForm.value.FilePath) {
      let jsonData = this.myForm.value.ModelJson!;
      let res = (await this._business.parseAIModel(jsonData)) as CameraAIModel;
      this._parsedAIModel = res;
      this.modelLabelsSubject.next(res.ModelDTO ? res.ModelDTO.Labels : []);
      // console.log('parsed', res);

      this.myForm.patchValue({
        Version: res.Version,
        TransformType: res.TransformType,
      });
    } else {
      this._toastrService.warning('请选择模型文件');
    }
  }
  toggleList(e: Event) {
    this.showList = !this.showList;
    e.stopPropagation();
  }
  clickIcon(icon: KeyValue<string, string>, e: Event) {
    console.log(icon);
    this.selectedIconKey = icon.key;
    this.myForm.patchValue({
      Label: this.selectedIconKey.toString(),
    });
    e.stopPropagation();
  }

  async onSubmit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model: CameraAIModel;

        if (this._parsedAIModel) {
          //如果已经解析过模型，则使用解析后的对象提交
          model = this._parsedAIModel;
          this._parsedAIModel.ModelName = this.myForm.value.ModelName ?? '';
          this._parsedAIModel.ModelType = this.myForm.value.ModelType ?? '';
          this._parsedAIModel.Label = +(this.myForm.value.Label ?? '');
        } else {
          model = new CameraAIModel();
          model.Id = '';
          model.ModelName = this.myForm.value.ModelName ?? '';
          model.ModelType = this.myForm.value.ModelType ?? '';
          model.ModelJSON = this.myForm.value.ModelJson ?? '';
          model.Label = +(this.myForm.value.Label ?? '');
          model.CreateTime = new Date().toISOString();
          model.UpdateTime = new Date().toISOString();
        }

        let res = await this._business.createAIModel(model);
        if (res) {
          this._toastrService.success('添加成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._operateModel) {
          // 解析后的对象Id是'',要用 _operateModel 提交
          this._operateModel.ModelName = this.myForm.value.ModelName ?? '';
          this._operateModel.ModelType = this.myForm.value.ModelType ?? '';
          this._operateModel.Label = +(this.myForm.value.Label ?? '');
          this._operateModel.ModelJSON = this.myForm.value.ModelJson ?? '';
          this._operateModel.UpdateTime = new Date().toISOString();

          // 如果选择了新模型文件,则清空 ModelDTO
          if (this.myForm.value.FilePath) {
            this._operateModel.ModelDTO = void 0;
          } else {
            this._operateModel.ModelJSON = '';
          }
          // 如果选择了新文件,且解析了Model,则使用解析后的Model
          if (this._parsedAIModel) {
            this._operateModel.ModelJSON = '';
            this._operateModel.ModelDTO = this._parsedAIModel.ModelDTO;
          }

          let res = await this._business.updateAIModel(this._operateModel);
          if (res) {
            this._toastrService.success('编辑成功');
            this.closeEvent.emit(true);
          }
        }
      }
    }
  }
  onReset() {
    this.closeEvent.emit(false);
  }

  downLoadModel() {
    let modelJson = this.myForm.value.ModelJson;
    if (modelJson) {
      let res = decode(modelJson);
      let blob = new Blob([res]);
      const a = document.createElement('a');
      let url = URL.createObjectURL(blob);
      a.href = url;
      a.download = (this.myForm.value.ModelName ?? 'demo') + '.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  private _readFileContent(file: File) {
    return new Promise((resolve, reject) => {
      if (!file) reject('No File!!!');

      let reader = new FileReader();
      reader.addEventListener('load', function () {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }
  private _updateForm() {
    if (this.state == FormState.add) {
    } else if (this.state == FormState.edit) {
      if (this._operateModel) {
        this.myForm.patchValue({
          ModelJson: this._operateModel.ModelJSON,
          ModelName: this._operateModel.ModelName,
          ModelType: this._operateModel.ModelType,
          Version: this._operateModel.Version,
          TransformType: this._operateModel.TransformType,
          Label: this._operateModel.Label.toString(),
        });
        this.selectedIconKey = this._operateModel.Label.toString();
      }
    }
  }
  private _checkForm() {
    if (this.myForm.get('ModelName')?.invalid) {
      this._toastrService.warning('请输入模型名称');
      return;
    }
    if (this.state == FormState.add) {
      if (this.myForm.get('FilePath')?.invalid) {
        this._toastrService.warning('请选择模型文件');
        return;
      }
    }
    if (this.myForm.get('Label')?.invalid) {
      this._toastrService.warning('请选择模型图标');
      return;
    }

    return true;
  }
}
