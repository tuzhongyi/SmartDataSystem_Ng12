import { Transform } from 'class-transformer';
export class User {
  /// <signature>
  /// <summary>User</summary>
  /// <field name='Id' type='String'>唯一标识符 M</field>
  /// <field name='Username' type='String'>用户名 M</field>
  /// <field name='Password' type='String'>密码 O</field>
  /// <field name='PasswordHash' type='String'>密码HASH值 O</field>
  /// <field name='PasswordSalt' type='String'>密码SALT值 O</field>
  /// <field name='FirstName' type='String'>名字 O</field>
  /// <field name='LastName' type='String'>性 O</field>
  /// <field name='Gender' type='Int32'>性别 O</field>
  /// <field name='MobileNo' type='String'>手机号码 O</field>
  /// <field name='Email' type='String'>邮箱 O</field>
  /// <field name='Note' type='String'>描述信息 O</field>
  /// <field name='ExpiredTime' type='DateTime'>过期时间 M</field>
  /// <field name='CreateTime' type='DateTime'>创建时间 M</field>
  /// <field name='UpdateTime' type='DateTime'>更新时间 M</field>
  /// <field name='State' type='Int32'>0-正常 M</field>
  /// <field name='Role' type='Role[]'>用户角色列表 M</field>
  /// </signature>
  Id!: string;
  Username!: string;
  Password?: string;
  PasswordHash?: string;
  PasswordSalt?: string;
  FirstName?: string;
  LastName?: string;
  Gender?: number;
  MobileNo?: string;
  Email?: string;
  Note?: string;
  //   @Transform(transformDate)
  //   ExpiredTime!: string;
  //   @Transform(transformDate)
  //   CreateTime!: string;
  //   @Transform(transformDate)
  //   UpdateTime!: Date;
  //   State!: number;
  //   Role!: Role[];
  //   Resources?: UserResourceRole[];
  OffEvents?: number[];
}
