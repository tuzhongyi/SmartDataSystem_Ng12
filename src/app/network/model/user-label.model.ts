import { UserLabelType } from 'src/app/enum/user-label-type.enum';

/** 用户自定义标签信息 */
export class UserLabel {
  /**	String	标签ID，同类型的标签ID必须唯一	M	RW */
  LabelId!: string;
  /**	String	标签名称	O	RW */
  LabelName?: string;
  /**	Int32	标签类型，1-厢房手机号码	M	RW */
  LabelType!: UserLabelType;
  /**	String	标签内容	O	RW */
  Content?: string;
  /**	String	描述信息	O	RW */
  Note?: string;
  /**	DateTime	创建时间	M	R */
  CreateTime!: Date;
  /**	DateTime	更新时间	M	R */
  UpdateTime!: Date;
}
