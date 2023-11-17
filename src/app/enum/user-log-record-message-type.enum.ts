export enum UserLogRecordMessageType {
  /**	登录成功	1 */
  Login = 1,
  /**	注销	2 */
  Logout = 2,
  /**	登录失败	3 */
  LoginFailed = 3,
  /**	创建用户	4 */
  CreateUser = 4,
  /**	删除用户	5 */
  DeleteUser = 5,
  /**	修改用户	6 */
  SetUser = 6,
  /**	创建角色	7 */
  CreateRole = 7,
  /**	删除角色	8 */
  DeleteRole = 8,
  /**	修改角色	9 */
  SetRole = 9,
  /**	修改用户密码	10 */
  ChangePassword = 10,
}
