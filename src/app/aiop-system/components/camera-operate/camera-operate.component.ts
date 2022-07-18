import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { CameraOperateBusiness } from './camera-operate.business';

@Component({
  selector: 'howell-camera-operate',
  templateUrl: './camera-operate.component.html',
  styleUrls: ['./camera-operate.component.less'],
  providers: [
    CameraOperateBusiness
  ]
})
export class CameraOperateComponent implements OnInit {


  @Input()
  state: FormState = FormState.none;

  @Input()
  cameraId: string = '';

  @Output()
  closeEvent = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private _business: CameraOperateBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
  }

}
