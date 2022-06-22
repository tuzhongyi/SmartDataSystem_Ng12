import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { Platform } from 'src/app/network/model/platform.model';
import { Protocol } from 'src/app/network/model/protocol.model';
import { PlatformManageModel } from 'src/app/view-model/platform-manage.model';
import { PlatformOperateBusiness } from './platform-operate.business';

@Component({
  selector: 'howell-platform-operate',
  templateUrl: './platform-operate.component.html',
  styleUrls: ['./platform-operate.component.less'],
  providers: [
    PlatformOperateBusiness
  ]
})
export class PlatformOperateComponent implements OnInit {

  private _platform?: Platform;

  myForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    ProtocolType: new FormControl('', Validators.required),
    Username: new FormControl(''),
    Password: new FormControl(''),
    Hostname: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)]),
    Port: new FormControl('', [Validators.required, Validators.pattern(/^\d*$/), Validators.max(65535), Validators.min(0)]),
    EventRecvPort: new FormControl("", [Validators.pattern(/^\d*$/), Validators.max(65535), Validators.min(0)]),
    EventRecvIPAddress: new FormControl("", Validators.pattern(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/)),
    EventCodes: new FormControl(""),
  });
  FormState = FormState;
  protocols: Array<Protocol> = [];

  get Name() {
    return this.myForm.get('Name') as FormControl;
  }
  get Username() {
    return this.myForm.get('Username') as FormControl;
  }
  get Password() {
    return this.myForm.get('Password') as FormControl;
  }
  get ProtocolType() {
    return this.myForm.get('ProtocolType') as FormControl;
  }
  get Hostname() {
    return this.myForm.get('Hostname') as FormControl;
  }
  get Port() {
    return this.myForm.get('Port') as FormControl;
  }
  get EventRecvIPAddress() {
    return this.myForm.get('EventRecvIPAddress') as FormControl;
  }
  get EventRecvPort() {
    return this.myForm.get('EventRecvPort') as FormControl;
  }

  get EventCodes() {
    return this.myForm.get('EventCodes') as FormControl;
  }

  get title() {
    if (this.state == FormState.add) {
      return '添加平台';
    } else if (this.state == FormState.edit) {
      return '编辑' + this._platform?.Name;
    }
    return ''
  }

  @Input()
  state: FormState = FormState.none;

  @Input()
  platformId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>()


  constructor(private _business: PlatformOperateBusiness, private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    this.protocols = await this._business.getProtocols()
    if (this.state == FormState.edit) {
      this._platform = await this._business.getPlatform(this.platformId);
      // console.log(this._platform)
    }
    this._updateForm();
  }

  async onSubmit() {
    // this.closeEvent.emit()
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return;
    }
    if (this.ProtocolType.invalid) {
      this._toastrService.error('请选择协议类型');
      return;
    }
    if (this.Hostname.invalid) {
      if (this.Hostname.errors && 'required' in this.Hostname.errors) {
        this._toastrService.error('请输入IP地址');
        return;
      }
      if (this.Hostname.errors && 'pattern' in this.Hostname.errors) {
        this._toastrService.error('IP地址无效');
        return;
      }

    }
    if (this.Port.invalid) {
      if (this.Port.errors && 'required' in this.Port.errors) {
        this._toastrService.error('请输入端口号');
        return;
      }
      if (this.Port.errors && 'pattern' in this.Port.errors) {
        this._toastrService.error('端口号无效');
        return;
      }
      if (this.Port.errors && 'min' in this.Port.errors) {
        this._toastrService.error('端口号不能小于0');
        return;
      }
      if (this.Port.errors && 'max' in this.Port.errors) {
        this._toastrService.error('端口号最大为65535');
        return;
      }
    }
    if (this.EventRecvIPAddress.invalid) {
      this._toastrService.error('事件IP地址无效')
      return;
    }
    if (this.EventRecvPort.invalid) {
      this._toastrService.error('事件端口号无效')
      return;
    }

    let model = new Platform();
    model.Name = this.Name.value;
    model.ProtocolType = this.ProtocolType.value;
    model.Username = this.Username.value;
    model.Password = this.Password.value;
    model.EventRecvIPAddress = this.EventRecvIPAddress.value;
    model.EventRecvPort = this.EventRecvPort.value;
    model.EventCodes = this.EventCodes.value;
    model.Url = "http://" + this.Hostname.value + ":" + this.Port.value;
    model.UpdateTime = new Date().toISOString();

    if (this.state == FormState.add) {
      model.Id = '';
      model.State = 0;
      model.CreateTime = new Date().toISOString();
      let res = await this._business.addPlatform(model)
      if (res) {
        this._toastrService.success('添加成功')
        this.closeEvent.emit(true)
      }
    } else if (this.state == FormState.edit) {
      model.Id = this._platform?.Id ?? "";
      model.State = this._platform?.State ?? 0;;
      model.CreateTime = this._platform!.CreateTime ?? new Date().toISOString();

      console.log('_platform', this._platform)
      let res = await this._business.updatePlatform(model);
      if (res) {
        console.log('res', res)
        this._toastrService.success('编辑成功')
        this.closeEvent.emit(true)
      }
    }
  }
  onReset() {
    this.closeEvent.emit(false)
  }
  private _updateForm() {
    if (this.state == FormState.add) {
      if (this.protocols.length) {
        let protocol = this.protocols[0];
        let url = new URL(protocol.Url);
        this.myForm.patchValue({
          Name: protocol.Name,
          ProtocolType: protocol.ProtocolType,
          Username: protocol.Username,
          Password: protocol.Password,
          Hostname: url.hostname,
          Port: url.port
        })
      }

    } else if (this.state == FormState.edit) {
      if (this._platform) {
        let url = new URL(this._platform.Url);
        this.myForm.patchValue({
          Name: this._platform.Name,
          ProtocolType: this._platform.ProtocolType,
          Username: this._platform.Username,
          Password: this._platform.Password,
          Hostname: url.hostname,
          Port: url.port
        })
      }

    }
  }

}



