/*
 * @Author: pmx 
 * @Date: 2022-11-06 15:33:37 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:35:07
 */
import { VehicleMemberType } from 'src/app/enum/member-type.enum';
import { IParams, PagedParams } from '../IParams.interface';

export class GetVehicleMembersParams extends PagedParams implements IParams {

  // 人员ID
  Ids?: string[];

  // 人员名称，支持LIKE	
  Name?: string;

  // 手机号码，支持LIKE
  MobileNo?: string;

  // 人员类型
  MemberType?: VehicleMemberType;

  // 区划ID
  DivisionId?: string;

  // 唯一编号
  No?: string;

}
