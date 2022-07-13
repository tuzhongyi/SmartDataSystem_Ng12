import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { Protocol } from 'src/app/network/model/protocol.model';
import { SRServer, SRServerAddress } from 'src/app/network/model/sr-server';
import { SRServerOperateBusiness } from './sr-server-operate.business';
import { ValidIP } from 'src/app/common/tools/tool';


@Component({
  selector: 'howell-sr-server-operate',
  templateUrl: './sr-server-operate.component.html',
  styleUrls: ['./sr-server-operate.component.less'],
  providers: [
    SRServerOperateBusiness
  ]
})
export class SRServerOperateComponent implements OnInit, AfterViewInit {
  private _server?: SRServer;


  myForm = this._fb.group({
    Name: ['', Validators.required],
    ProtocolType: ['Howell', Validators.required],
    Username: '',
    Password: '',
    Address: this._fb.array<FormGroup>([])
  })

  currentIndex = 0;
  maxLength = 7;

  get Name() {
    return this.myForm.get('Name') as FormControl;
  }
  get Address() {
    return this.myForm.get('Address') as FormArray
  }

  get title() {
    if (this.state == FormState.add) {
      return '添加流转服务';
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

  constructor(private _business: SRServerOperateBusiness, private _toastrService: ToastrService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.init();
  }
  ngAfterViewInit(): void {
    // console.log(this.Address.length)
  }
  async init() {
    if (this.state == FormState.add) {
      this.addAddress()
    } else if (this.state == FormState.edit) {
      this._server = await this._business.getServer(this.serverId);
      console.log(this._server)
    }
    this._updateForm();
  }
  newAddress() {
    return this._fb.group({
      IPAddress: ['', [Validators.required, Validators.pattern(ValidIP)]],
      Port: ['', Validators.required],
      IsInternet: '1',
      IsDefault: '1',
      RtspPort: "554",
      RtmpPort: "1935",
      HttpPort: '',
      WsPort: ''
    })
  }

  addAddress() {
    if (this.Address.length < 7)
      this.Address.push(this.newAddress())
  }
  deleteAddress(index: number, e: Event) {
    e.stopPropagation();
    if (index == this.Address.length - 1) {
      this.Address.removeAt(index);
      if (this.currentIndex == index) {
        this.currentIndex = index - 1;
      }
    } else {
      this._toastrService.warning('请依次删除')
    }
  }
  touchSpinChange(value: string, index: number, propertyName: string) {
    let group = this.Address.at(index) as FormGroup;
    group.patchValue({
      [propertyName]: value
    })
  }
  async onSubmit() {

    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new SRServer();
        model.Id = '';
        model.Name = this.myForm.value.Name ?? '';
        model.ProtocolType = this.myForm.value.ProtocolType ?? "";
        model.Username = this.myForm.value.Username ?? "";
        model.Password = this.myForm.value.Password ?? "";


        let arr = <IAddress[]>(this.myForm.value.Address ?? []);
        let address_arr = arr.map(item => {
          let address = new SRServerAddress();
          address.IPAddress = item.IPAddress;
          address.Port = +item.Port;
          address.IsInternet = item.IsInternet == '1' ? true : false;
          address.IsDefault = item.IsDefault == '1' ? true : false;
          address.RtspPort = +item.RtspPort;
          address.RtmpPort = +item.RtmPort;
          address.HttpPort = +item.HttpPort;
          address.WsPort = +item.WsPort;

          return address
        })
        model.Addresses = address_arr;


        let res = await this._business.createServer(model);
        if (res) {
          this._toastrService.success('操作成功');
          this.closeEvent.emit(true);
        }
      } else if (this.state == FormState.edit) {
        if (this._server) {
          this._server.Name = this.myForm.value.Name ?? '';
          this._server.ProtocolType = this.myForm.value.ProtocolType ?? "";
          this._server.Username = this.myForm.value.Username ?? "";
          this._server.Password = this.myForm.value.Password ?? "";

          let arr = <IAddress[]>(this.myForm.value.Address ?? []);
          let address_arr = arr.map(item => {
            let address = new SRServerAddress();
            address.IPAddress = item.IPAddress;
            address.Port = +item.Port;
            address.IsInternet = item.IsInternet == '1' ? true : false;
            address.IsDefault = item.IsDefault == '1' ? true : false;
            address.RtspPort = +item.RtspPort;
            address.RtmpPort = +item.RtmPort;
            address.HttpPort = +item.HttpPort;
            address.WsPort = +item.WsPort;

            return address
          })
          this._server.Addresses = address_arr;


          let res = await this._business.updateServer(this._server);
          if (res) {
            this._toastrService.success('操作成功');
            this.closeEvent.emit(true);
          }
        }
      }
    }


  }
  onReset() {
    this.closeEvent.emit(false)

  }
  private _updateForm() {
    if (this.state == FormState.add) {


    } else if (this.state == FormState.edit) {
      if (this._server) {

        this.myForm.patchValue({
          Name: this._server.Name,
          ProtocolType: this._server.ProtocolType,
          Username: this._server.Username,
          Password: this._server.Password,
        })

        this.Address.clear();
        this._server.Addresses.forEach(item => {
          let address = this.newAddress();
          address.setValue({
            IPAddress: item.IPAddress,
            Port: item.Port.toString(),
            IsInternet: item.IsInternet ? '1' : '0',
            IsDefault: item.IsDefault ? '1' : '0',
            RtspPort: item.RtspPort ? item.RtspPort.toString() : '',
            RtmpPort: item.RtmpPort ? item.RtmpPort.toString() : '',
            HttpPort: item.HttpPort ? item.HttpPort.toString() : '',
            WsPort: item.WsPort ? item.WsPort.toString() : ''
          })

          this.Address.push(address)
        })

      }
    }
  }
  private _checkForm() {
    if (this.Name.invalid) {
      this._toastrService.error('请输入名称');
      return false;
    }
    if (this.myForm.valid)
      return true

    return false;
  }

}

interface IAddress {
  IPAddress: string;
  Port: string;
  IsInternet: string;
  IsDefault: string;
  RtspPort: string;
  RtmPort: string;
  HttpPort: string;
  WsPort: string;
}