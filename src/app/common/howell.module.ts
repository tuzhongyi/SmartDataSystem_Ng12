import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CUSTOM_COMPONENTS } from './components';
import { CUSTOM_PIPES } from './pipes';
import { CUSTOM_SERVICES } from './service';

@NgModule({
  declarations: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  imports: [CommonModule],
  exports: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  providers: [...CUSTOM_SERVICES],
})
export class HowellModule {}
