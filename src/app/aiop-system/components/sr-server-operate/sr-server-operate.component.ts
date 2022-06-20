import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { Protocol } from 'src/app/network/model/protocol.model';
import { SRServer, SRServerAddress } from 'src/app/network/model/sr-server';
import { SRServerOperateBusiness } from './sr-server-operate.business';

@Component({
  selector: 'howell-sr-server-operate',
  templateUrl: './sr-server-operate.component.html',
  styleUrls: ['./sr-server-operate.component.less'],
  providers: [
    SRServerOperateBusiness
  ]
})
export class SRServerOperateComponent implements OnInit {
  private _server?: SRServer;


  myForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    ProtocolType: new FormControl('Howell', Validators.required),
    Username: new FormControl(''),
    Password: new FormControl(''),

  });


  get Name() {
    return this.myForm.get('Name') as FormControl;
  }

  get title() {
    if (this.state == FormState.add) {
      return '添加平台';
    } else if (this.state == FormState.edit) {
      return '编辑' + this._server?.Name;
    }
    return ''
  }

  @Input()
  state: FormState = FormState.none;

  @Input()
  serverId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>()

  constructor(private _business: SRServerOperateBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    if (this.state == FormState.edit) {
      this._server = await this._business.getServer(this.serverId);
      console.log(this._server)
    }
    this._updateForm();
  }
  async onSubmit() {
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return;
    }
    let model = new SRServer();
    model.Name = 'test';
    model.ProtocolType = 'Howell'
    let addr = new SRServerAddress();
    addr.IPAddress = '192.168.21.230';
    addr.Port = 8899;
    addr.IsInternet = true;
    addr.IsDefault = true;


    model.Addresses = [
      addr
    ]
    if (this.state == FormState.add) {
      model.Id = '';
      let res = await this._business.addServer(model);
      console.log(res)
    }

  }
  onReset() {
    this.closeEvent.emit(false)

  }
  private _updateForm() {

  }

}
