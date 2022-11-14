import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CameraState } from 'src/app/enum/camera-state.enum';
import { CameraType } from 'src/app/enum/camera-type.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { EncodeDevice } from 'src/app/network/model/encode-device';
import { ResourceLabel } from 'src/app/network/model/resource-label.model';
import { CameraOperateBusiness } from './camera-operate.business';

@Component({
  selector: 'howell-camera-operate',
  templateUrl: './camera-operate.component.html',
  styleUrls: ['./camera-operate.component.less'],
  providers: [CameraOperateBusiness],
})
export class CameraOperateComponent implements OnInit {
  private _AICamera?: AICamera;

  myForm = this.fb.group({
    Name: ['', Validators.required],
    CameraType: [CameraType.Gun, Validators.required],
    EncodeDeviceId: ['', Validators.required],
    ChannelNo: ['1', Validators.required],
    PTZControllable: [''],
    Storable: [''],
  });

  encodeDevices: EncodeDevice[] = [];
  selectedLabels: ResourceLabel[] = [];
  resourceLabels: ResourceLabel[] = [];

  get title() {
    if (this.state == FormState.add) {
      return '添加平台';
    } else if (this.state == FormState.edit) {
      return '编辑 ' + this._AICamera?.Name;
    }
    return '';
  }

  get Name() {
    return this.myForm.get('Name') as FormControl;
  }
  get CameraType() {
    return this.myForm.get('CameraType') as FormControl;
  }
  get EncodeDeviceId() {
    return this.myForm.get('EncodeDeviceId') as FormControl;
  }
  get ChannelNo() {
    return this.myForm.get('ChannelNo') as FormControl;
  }

  @Input()
  state: FormState = FormState.none;

  @Input()
  cameraId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private _business: CameraOperateBusiness,
    private _toastrService: ToastrService
  ) {}

  async ngOnInit() {
    this.encodeDevices = (await this._business.listEncodeDevice()).Data;

    if (this.state == FormState.edit) {
      this._AICamera = await this._business.getAICamera(this.cameraId);
      console.log('摄像机', this._AICamera);
      this.resourceLabels = await this._business.getResourceLabels(
        this.cameraId
      );
    }
    this._updateForm();
  }
  touchSpinChange(num: string) {
    this.myForm.patchValue({
      ChannelNo: num,
    });
  }
  selectLabelEvent(labels: ResourceLabel[]) {
    this.selectedLabels = labels;
  }
  async onSubmit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let camera = new AICamera();
        camera.Id = '';
        camera.ResourceType = ResourceType.Camera;
        camera.Name = this.myForm.value.Name ?? '';
        camera.CameraType = this.myForm.value.CameraType!;
        camera.EncodeDeviceId = this.myForm.value.EncodeDeviceId!;
        camera.CameraState = CameraState.None;
        camera.ChannelNo = +this.myForm.value.ChannelNo!;
        camera.PTZControllable =
          this.myForm.value.PTZControllable === '1' ? true : false;
        camera.Storable = this.myForm.value.Storable === '1' ? true : false;
        camera.CreateTime = new Date();
        camera.UpdateTime = new Date();

        let res = await this._business.createAICamera(camera);
        if (res) {
          for (let i = 0; i < this.selectedLabels.length; i++) {
            let id = this.selectedLabels[i].Id;
            await this._business.addResourceLabel(res.Id, id);
          }
          this._toastrService.success('添加成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._AICamera) {
          this._AICamera.Name = this.myForm.value.Name ?? '';
          this._AICamera.CameraType = this.myForm.value.CameraType!;
          this._AICamera.EncodeDeviceId = this.myForm.value.EncodeDeviceId!;
          this._AICamera.ChannelNo = +this.myForm.value.ChannelNo!;
          this._AICamera.PTZControllable =
            this.myForm.value.PTZControllable === '1' ? true : false;
          this._AICamera.Storable =
            this.myForm.value.Storable === '1' ? true : false;
          this._AICamera.UpdateTime = new Date();
          let res = await this._business.updateAICamera(this._AICamera);
          if (res) {
            let filtered = this.selectedLabels.filter((selected) => {
              return !this.resourceLabels.some(
                (resource) => resource.Id == selected.Id
              );
            });
            for (let i = 0; i < filtered.length; i++) {
              let id = filtered[i].Id;
              await this._business.addResourceLabel(res.Id, id);
            }

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

  private _updateForm() {
    if (this.state == FormState.add) {
    } else if (this.state == FormState.edit) {
      if (this._AICamera) {
        this.myForm.patchValue({
          Name: this._AICamera.Name,
          CameraType: this._AICamera.CameraType,
          EncodeDeviceId: this._AICamera.EncodeDeviceId,
          ChannelNo: this._AICamera.ChannelNo.toString(),
          PTZControllable: this._AICamera.PTZControllable === true ? '1' : '0',
          Storable: this._AICamera.Storable === true ? '1' : '0',
        });
      }
    }
  }
  private _checkForm() {
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return;
    }
    if (this.CameraType.invalid) {
      this._toastrService.error('请选择类型');
      return;
    }
    if (this.EncodeDeviceId.invalid) {
      this._toastrService.error('请选择编码设备');
      return;
    }
    if (this.ChannelNo.invalid) {
      this._toastrService.error('请输入通道号');
      return;
    }
    return true;
  }
}
