import { NgModule } from '@angular/core';
import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { AuditComponentsModule } from './components/audit-components.module';

@NgModule({
  declarations: [AuditComponent],
  imports: [AuditRoutingModule, AuditComponentsModule],
})
export class AuditModule {}
