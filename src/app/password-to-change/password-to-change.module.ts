import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordIndexComponent } from './index/password-index.component';
import { PasswordChangeComponent } from './change/password-change.component';
import { PasswordToChangeRoutingModule } from './password-to-change-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PasswordIndexComponent, PasswordChangeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordToChangeRoutingModule,
  ],

  exports: [],
})
export class PasswordToChangeModule {}
