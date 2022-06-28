import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/enum/form-state.enum';
import { CameraAIModel, CameraAIModelDTOLabel, EnumValue } from 'src/app/network/model/camera-ai.model';
import { AIModelOperateBusiness } from './ai-model-operate.business';
import Icons from "src/assets/json/ai-icon.json"
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { Camera } from 'src/app/network/model/camera.model';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

export interface NestedTreeNode {
  name: string;
  children?: Array<NestedTreeNode>
}

@Component({
  selector: 'howell-ai-model-operate',
  templateUrl: './ai-model-operate.component.html',
  styleUrls: ['./ai-model-operate.component.less'],
  providers: [
    AIModelOperateBusiness
  ]
})
export class AIModelOperateComponent implements OnInit, AfterViewInit, OnDestroy {

  private _cameraAIModel?: CameraAIModel;


  data: CameraAIModelDTOLabel[] = [

  ]

  public dataSource = new MatTreeNestedDataSource<CameraAIModelDTOLabel>();
  public treeControl = new NestedTreeControl(
    (node: CameraAIModelDTOLabel) => {
      // if (!!node.IsLeaf) {
      //   return node.EnumValues || []
      // }
      // else {

      // }
      return node.Labels
    }
  )

  hasChild = (_: number, node: CameraAIModelDTOLabel) => {
    return !node.IsLeaf
  }

  FormState = FormState;
  myForm = new FormGroup({
    ModelName: new FormControl('', Validators.required),
    ModelType: new FormControl('AIOP', Validators.required),
    FilePath: new FormControl('', Validators.required),
    Version: new FormControl({ value: '', disabled: true }),
    TransformType: new FormControl({ value: '', disabled: true }),
    ModelJson: new FormControl(''),
    Label: new FormControl('', [Validators.required])
  })

  showList = false;
  imgBase = 'assets/img/ai-model/';
  selectedIconKey = '';

  iconsMap = new Map(Object.entries(Icons));
  iconsValue = Array.from(this.iconsMap.values());
  iconsKey = Array.from(this.iconsMap.keys())
  iconsEntries = Array.from(this.iconsMap.entries())

  maskSub!: Subscription;

  get title() {
    if (this.state == FormState.add) {
      return '添加AI模型';
    } else if (this.state == FormState.edit) {
      return '编辑' + this._cameraAIModel?.ModelName;
    }
    return ''
  }
  // 切换选中Icon
  get selectedIcon() {
    if (this.selectedIconValue)
      return this.imgBase + this.selectedIconValue
    return '';
  }
  get selectedIconValue() {
    return this.iconsMap.get(this.selectedIconKey)
  }

  @Input()
  state: FormState = FormState.none;


  @Input()
  aiModelId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>()

  @ViewChild('fileBtn') fileBtn?: ElementRef<HTMLInputElement>;

  @ViewChild('mask') mask!: ElementRef<HTMLDivElement>;

  constructor(private _business: AIModelOperateBusiness, private _toastrService: ToastrService,
    private _converter: TreeConverter, @Inject(DOCUMENT) private document: any) {
    this.dataSource.data = this.data;
  }


  async ngOnInit() {
    if (this.state == FormState.edit) {
      this._cameraAIModel = await this._business.getAIModel(this.aiModelId)
      console.log(this._cameraAIModel)
      this.data = this._cameraAIModel.ModelDTO?.Labels || [];

      this.dataSource.data = this.data;

    }
    this._updateForm()
  }

  ngAfterViewInit() {
    // fromEvent(this.document.body, 'click').subscribe(() => {
    //   this.showList = false;
    // })
    this.maskSub = fromEvent(this.mask.nativeElement, 'click').subscribe(() => {
      this.showList = false;
    })
  }
  ngOnDestroy(): void {
    this.maskSub.unsubscribe();
  }
  // 选择ModelJson文件
  triggerSelect() {
    if (this.fileBtn) {
      this.fileBtn.nativeElement.click()
    }
  }
  // 选中文件回调
  async selectFile(input: HTMLInputElement) {
    let filePath = input.value;
    let fileContent = ''
    if (input.files && input.files.length) {
      fileContent = await this._readFileContent(input.files[0]) as string;
      fileContent = fileContent.replace("data:application/json;base64,", '')
    }
    this.myForm.patchValue({
      FilePath: filePath,
      ModelJson: fileContent
    })
  }
  // 应用模型
  async parseFile() {
    let jsonData = this.myForm.value.ModelJson;
    if (jsonData) {
      let res = await this._business.parseAIModel(jsonData);
      this.myForm.patchValue({
        Version: res.Version,
        TransformType: res.TransformType
      })
    }

  }
  toggleList(e: Event) {
    this.showList = !this.showList;
    e.stopPropagation();
  }
  clickIcon(icon: [string, string], e: Event) {

    this.selectedIconKey = icon[0];
    this.myForm.patchValue({
      Label: this.selectedIconKey.toString()
    })

    e.stopPropagation()
  }

  async onSubmit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {

        let model = new CameraAIModel();
        model.Id = '';
        model.ModelName = this.myForm.value.ModelName ?? '';
        model.ModelType = this.myForm.value.ModelType ?? '';
        model.ModelJSON = this.myForm.value.ModelJson ?? "";
        model.Label = + (this.myForm.value.Label ?? '');
        model.CreateTime = new Date().toISOString();
        model.UpdateTime = new Date().toISOString();
        let res = await this._business.createAIModel(model)
        if (res) {
          this._toastrService.success('添加成功');
          this.closeEvent.emit(true)
        }

      } else if (this.state == FormState.edit) {
        if (this._cameraAIModel) {
          this._cameraAIModel.ModelName = this.myForm.value.ModelName ?? '';
          this._cameraAIModel.ModelType = this.myForm.value.ModelType ?? '';
          this._cameraAIModel.ModelJSON = this.myForm.value.ModelJson ?? ""
          this._cameraAIModel.Label = + (this.myForm.value.Label ?? '');
          this._cameraAIModel.UpdateTime = new Date().toISOString();

          let res = await this._business.setAIModel(this._cameraAIModel)
          if (res) {
            this._toastrService.success('编辑成功');
            this.closeEvent.emit(true)
          }

        }

      }
    }
  }
  onReset() {
    this.closeEvent.emit(false)
  }

  private _readFileContent(file: File) {
    return new Promise((resolve, reject) => {
      if (!file)
        reject('No File!!!');

      let reader = new FileReader();
      reader.addEventListener('load', function () {
        resolve(reader.result)
      })
      reader.readAsDataURL(file)
    })
  }
  private _updateForm() {
    if (this.state == FormState.add) {


    } else if (this.state == FormState.edit) {
      if (this._cameraAIModel) {
        this.myForm.patchValue({
          ModelName: this._cameraAIModel.ModelName,
          ModelType: this._cameraAIModel.ModelType,
          Version: this._cameraAIModel.Version,
          TransformType: this._cameraAIModel.TransformType,
          Label: this._cameraAIModel.Label.toString()
        })
        this.selectedIconKey = this._cameraAIModel.Label.toString();
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
        this._toastrService.warning('请选择模型');
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
