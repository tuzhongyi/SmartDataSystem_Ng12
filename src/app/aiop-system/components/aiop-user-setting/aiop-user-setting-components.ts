import { AIOPRoleDetailsComponent } from './aiop-role-details/aiop-role-details.component';
import { AIOPRoleListComponent } from './aiop-role-list/aiop-role-list.component';
import { AIOPRoleManagerComponent } from './aiop-role-manager/aiop-role-manager.component';
import { AIOPUserDetailsComponent } from './aiop-user-details/aiop-user-details.component';
import { AIOPUserLogRecordManagerComponent } from './aiop-user-log-record-manager/aiop-user-log-record-manager.component';
import { AiopUserLogRecordMessageTypeListComponent } from './aiop-user-log-record-message-type-list/aiop-user-log-record-message-type-list.component';
import { AIOPUserManagerComponent } from './aiop-user-manager/aiop-user-manager.component';
import { AiopUserPasswordChangeComponent } from './aiop-user-password-change/aiop-user-password-change.component';
import { AIOPUserSettingComponent } from './aiop-user-setting.component';
import { TestCryptionComponent } from './cryption/cryption.component';

export const AIOPUserSettingComponents = [
  TestCryptionComponent,
  AIOPUserSettingComponent,
  AIOPUserManagerComponent,
  AIOPUserDetailsComponent,
  AiopUserPasswordChangeComponent,

  AiopUserLogRecordMessageTypeListComponent,
  AIOPUserLogRecordManagerComponent,

  AIOPRoleListComponent,
  AIOPRoleDetailsComponent,
  AIOPRoleManagerComponent,
];
