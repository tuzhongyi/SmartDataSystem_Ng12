import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { HwPlatform } from 'src/app/network/model/platform.model';
import { Protocol } from 'src/app/network/model/protocol.model';
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

  myForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    ProtocolType: new FormControl('', Validators.required),
    Username: new FormControl(''),
    Password: new FormControl(''),
    Hostname: new FormControl('', Validators.required),
    Port: new FormControl('', Validators.required),
    EventRecvPort: new FormControl(""),
    EventRecvIPAddress: new FormControl(""),
    EventCodes: new FormControl(""),
  });
  FormState = FormState;
  protocols: Array<Protocol> = [];

  get Name() {
    return this.myForm.get('Name') as FormControl;
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

  get title() {
    if (this.state == FormState.add) {
      return '添加平台';
    } else if (this.state == FormState.edit) {
      return '编辑';
    }
    return ''

  }

  @Input()
  state: FormState = FormState.none;

  @Output()
  closeEvent = new EventEmitter<boolean>()


  constructor(private _business: PlatformOperateBusiness, private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    this.protocols = await this._business.getProtocols()
    console.log(this.protocols)
    this._updateForm();
  }

  async onSubmit() {
    this.closeEvent.emit(true)
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return;
    }
    if (this.ProtocolType.invalid) {
      this._toastrService.error('请选择协议类型');
      return;
    }
    if (this.Hostname.invalid) {
      this._toastrService.error('请输入IP地址');
      return;
    }
    if (this.Port.invalid) {
      this._toastrService.error('请输入端口号');
      return;
    }
    // if (this.state == FormState.add) {
    //   let model = new HwPlatform();
    //   model.Id = '';
    //   model.Name = 'test2';
    //   model.ProtocolType = 'Artemis';
    //   model.State = 0;
    //   model.Url = 'http://192.168.21.39:50533'
    //   model.UpdateTime = new Date().toISOString();
    //   model.CreateTime = new Date().toISOString();

    //   let res = await this._business.addPlatform(model)
    //   console.log(res)
    // } else if (this.state == FormState.edit) {

    // }
  }
  onReset() {
    this.closeEvent.emit(true)
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

    }
  }

}
