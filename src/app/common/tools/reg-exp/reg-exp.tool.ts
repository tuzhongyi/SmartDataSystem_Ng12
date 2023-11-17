export class RegExpTool {
  static ValidIPExp =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  static ValidPhoneExp =
    /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,2,3,5-9])|19[0-9])\d{8}$/;

  static ValidLogitudeExp =
    /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{1,})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,}|180)$/;

  static ValidLatitudeExp =
    /^(\-|\+)?([0-8]?\d{1}\.\d{0,}|90\.0{0,}|[0-8]?\d{1}|90)$/;

  // 后行断言+捕获+量词+非捕获
  static ValidPathExp =
    /(?<=\/[\w-]+\/[\w-]+\/)(?<first>[\w-]*)(?:\/(?<second>[\w-]*)(?:\/(?<third>[\w-]*))?)?\/?$/;

  static UserPassowrd = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,30}$/;
}
