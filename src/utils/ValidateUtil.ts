import moment from 'moment';

export default class ValidateUtil {
  // eslint-disable-next-line
  static isEmpty = (value: any, chkRaw?: boolean): boolean => {
    if (value === undefined || value === null) return true;
    if (typeof value === 'string') {
      let str: string = <string>value;
      if (!chkRaw) str = str.trim();
      if (str.length === 0) return true;
    } else if (Array.isArray(value)) {
      if (value.length === 0) return true;
    }
    return false;
  };

  static isEmail = (email: string): boolean => {
    const regexp: RegExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  };

  static minLength = (str: string, minLength: number, trim?: boolean): boolean => {
    if (str === undefined || str === null) return true;
    if (trim) return str.trim().length >= minLength;
    return str.length >= minLength;
  };

  static maxLength = (str: string, maxLength: number, trim?: boolean): boolean => {
    if (str === undefined || str === null) return true;
    if (trim) return str.trim().length <= maxLength;
    return str.length <= maxLength;
  };

  static minMaxLength = (str: string, minLength: number, maxLength: number, trim?: boolean): boolean => {
    if (str === undefined || str === null) return true;
    if (trim) str = str.trim();
    return minLength <= str.length && str.length <= maxLength;
  };

  static minValue = (value: number, min: number): boolean => {
    return value >= min;
  };

  static maxValue = (value: number, max: number): boolean => {
    return value <= max;
  };

  static minMaxValue = (value: number, min: number, max: number): boolean => {
    return min <= value && value <= max;
  };

  // eslint-disable-next-line
  static inList = (value: any, list: any[]): boolean => {
    return list.includes(value);
  };

  static isFullsize = (value: string): boolean => {
    // eslint-disable-next-line no-irregular-whitespace
    const regexp: RegExp = new RegExp(/^[ａ-ｚＡ-Ｚ０-９ぁ-んァ-ン一-龥　]+$/);
    return regexp.test(value);
  };

  static isHalfsize = (value: string): boolean => {
    // eslint-disable-next-line no-irregular-whitespace
    const regexp: RegExp = new RegExp(/^[^ａ-ｚＡ-Ｚ０-９ぁ-んァ-ン一-龥　]+$/);
    return regexp.test(value);
  };

  static isHalfsizeAlphaNumber = (value: string): boolean => {
    const regexp: RegExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regexp.test(value);
  };

  static isPasswordPolicy = (password: string): boolean => {
    const regexp: RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,30}$/);
    return regexp.test(password);
  };

  static isValidDate = (value: string, format: string): boolean => {
    //Check format date
    return moment(value, format, true).isValid();
  };
}
