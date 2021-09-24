import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CUSTOM_COMPONENTS } from './components';
import { CUSTOM_PIPES } from './pipes';
import { CUSTOM_SERVICES } from './service';

import { AngularResizeEventModule } from 'angular-resize-event';

@NgModule({
  declarations: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  imports: [CommonModule, MaterialModule, AngularResizeEventModule],
  exports: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  providers: [...CUSTOM_SERVICES],
})
export class HowellModule {}
