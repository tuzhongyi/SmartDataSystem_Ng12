import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncodedDeviceType } from 'src/app/enum/device-type.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { ProtocolType } from 'src/app/enum/protocol-type.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { TransType } from 'src/app/enum/trans-type.enum';
import { EncodeDevice } from 'src/app/network/model/garbage-station/encode-device';
import { Protocol } from 'src/app/network/model/garbage-station/protocol.model';
import { ResourceLabel } from 'src/app/network/model/garbage-station/resource-label.model';
import { EncodeDeviceOperateBusiness } from './encode-device-operate.business';

@Component({
  selector: 'howell-encode-device-operate',
  templateUrl: './encode-device-operate.component.html',
  styleUrls: ['./encode-device-operate.component.less'],
  providers: [EncodeDeviceOperateBusiness],
})
export class EncodeDeviceOperateComponent implements OnInit {
  @Input()
  state: FormState = FormState.none;

  @Input()
  encodeDeviceId?: string;

  @Output()
  closeEvent = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private _business: EncodeDeviceOperateBusiness,
    private _toastrService: ToastrService
  ) {}
  private _encodeDevice?: EncodeDevice;

  selectedLabels: ResourceLabel[] = [];
  resourceLabels: ResourceLabel[] = [];

  protocols: Array<Protocol> = [];
  FormState = FormState;
  myForm = this.fb.group({
    Name: ['', Validators.required],
    TransType: [TransType.TCP],
    ProtocolType: [ProtocolType.NVR],
    Url: ['', Validators.required],
    Username: [''],
    Password: [''],
    DeviceType: [EncodedDeviceType.None],
    Model: [''],
    SerialNumber: [''],
    Manufactory: [''],
    FirmwareVersion: [''],
    SoftwareVersion: [''],
    HardwareVersion: [''],
  });

  get title() {
    if (this.state == FormState.add) {
      return '添加平台';
    } else if (this.state == FormState.edit) {
      return '编辑 ' + this._encodeDevice?.Name;
    }
    return '';
  }
  get Name() {
    return this.myForm.get('Name') as FormControl;
  }
  get Url() {
    return this.myForm.get('Url') as FormControl;
  }
  async ngOnInit() {
    this.protocols = await this._business.getProtocols();
    // console.log("协议", this.protocols);

    if (this.state == FormState.edit) {
      this._encodeDevice = await this._business.getEncodeDevice(
        this.encodeDeviceId!
      );
      // console.log('编码器', this._encodeDevice)
      this.resourceLabels = await this._business.getResourceLabels(
        this.encodeDeviceId!
      );
    }
    this._updateForm();
  }
  selectLabelEvent(labels: ResourceLabel[]) {
    this.selectedLabels = labels;
  }
  async onSubmit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let encodeDevice = new EncodeDevice();
        encodeDevice.ResourceType = ResourceType.EncodeDevice;
        encodeDevice.Id = '';
        encodeDevice.Name = this.myForm.value.Name!;
        encodeDevice.TransType = +this.myForm.value.TransType!;
        encodeDevice.ProtocolType = this.myForm.value.ProtocolType!;
        encodeDevice.Url = this.myForm.value.Url!;

        encodeDevice.Username = this.myForm.value.Username!;
        encodeDevice.Password = this.myForm.value.Password!;
        encodeDevice.DeviceType = this.myForm.value.DeviceType!;
        encodeDevice.Model = this.myForm.value.Model!;
        encodeDevice.SerialNumber = this.myForm.value.SerialNumber!;
        encodeDevice.Manufactory = this.myForm.value.Manufactory!;
        encodeDevice.FirmwareVersion = this.myForm.value.FirmwareVersion!;
        encodeDevice.SoftwareVersion = this.myForm.value.SoftwareVersion!;
        encodeDevice.HardwareVersion = this.myForm.value.HardwareVersion!;
        encodeDevice.CreateTime = new Date();
        encodeDevice.UpdateTime = new Date();

        let res = await this._business.createEncodeDevice(encodeDevice);
        if (res) {
          for (let i = 0; i < this.selectedLabels.length; i++) {
            let id = this.selectedLabels[i].Id;
            await this._business.addResourceLabel(res.Id, id);
          }
          this._toastrService.success('添加成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._encodeDevice) {
          this._encodeDevice.Name = this.myForm.value.Name!;
          this._encodeDevice.TransType = +this.myForm.value.TransType!;
          this._encodeDevice.ProtocolType = this.myForm.value.ProtocolType!;
          this._encodeDevice.Url = this.myForm.value.Url ?? '';
          this._encodeDevice.Username = this.myForm.value.Username!;
          this._encodeDevice.Password = this.myForm.value.Password!;
          this._encodeDevice.DeviceType = this.myForm.value.DeviceType!;
          this._encodeDevice.Model = this.myForm.value.Model!;
          this._encodeDevice.SerialNumber = this.myForm.value.SerialNumber!;
          this._encodeDevice.Manufactory = this.myForm.value.Manufactory!;
          this._encodeDevice.FirmwareVersion =
            this.myForm.value.FirmwareVersion!;
          this._encodeDevice.SoftwareVersion =
            this.myForm.value.SoftwareVersion!;
          this._encodeDevice.HardwareVersion =
            this.myForm.value.HardwareVersion!;
          this._encodeDevice.UpdateTime = new Date();

          let res = await this._business.updateEncodeDevice(this._encodeDevice);
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
      if (this.protocols.length) {
        let protocol = this.protocols[0];
        console.log(protocol);
        this.myForm.patchValue({
          Name: protocol.Name,
          ProtocolType: protocol.ProtocolType,
          Username: protocol.Username,
          Password: protocol.Password,
        });
        try {
          this.myForm.patchValue({
            Url: protocol.Url,
          });
        } catch (e) {}
      }
    } else if (this.state == FormState.edit) {
      if (this._encodeDevice) {
        this.myForm.patchValue({
          Name: this._encodeDevice.Name,
          TransType: this._encodeDevice.TransType,
          ProtocolType: this._encodeDevice.ProtocolType,
          Username: this._encodeDevice.Username,
          Password: this._encodeDevice.Password,
          DeviceType: this._encodeDevice.DeviceType,
          Model: this._encodeDevice.Model,
          SerialNumber: this._encodeDevice.SerialNumber,
          Manufactory: this._encodeDevice.Manufactory,
          FirmwareVersion: this._encodeDevice.FirmwareVersion,
          SoftwareVersion: this._encodeDevice.SoftwareVersion,
          HardwareVersion: this._encodeDevice.HardwareVersion,
        });

        try {
          let url = new URL(this._encodeDevice.Url);
          this.myForm.patchValue({ Url: this._encodeDevice.Url });
        } catch (e) {
          console.log('无效的url');
        } finally {
          console.log('finally');
        }
      }
    }
  }
  private _checkForm() {
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return false;
    }
    if (this.Url.invalid) {
      this._toastrService.error('请输入IP地址');
      return false;
      // if (this.Hostname.errors && 'pattern' in this.Hostname.errors) {
      //   this._toastrService.error('IP地址无效');
      //   return;
      // }
    }
    // if (this.Port.invalid) {
    //   if (this.Port.errors && 'required' in this.Port.errors) {
    //     this._toastrService.error('请输入端口号');
    //     return;
    //   }
    //   if (this.Port.errors && 'pattern' in this.Port.errors) {
    //     this._toastrService.error('端口号无效');
    //     return;
    //   }
    //   if (this.Port.errors && 'min' in this.Port.errors) {
    //     this._toastrService.error('端口号不能小于0');
    //     return;
    //   }
    //   if (this.Port.errors && 'max' in this.Port.errors) {
    //     this._toastrService.error('端口号最大为65535');
    //     return;
    //   }
    // }
    return true;
  }
}
