import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordGetBackRoutingModule } from './password-get-back-routing.module';
import { PasswordCheckNameComponent } from './check-name/password-check-name.component';
import { PasswordGetBackIndexComponent } from './index/password-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordGetBackIndexComponent, PasswordCheckNameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordGetBackRoutingModule,
  ],

  exports: [],
})
export class PasswordGetBackModule {}
