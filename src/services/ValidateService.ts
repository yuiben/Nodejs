import { ValidateType } from '../constant/ValidateType.Const';
import ValidateException from '../exceptions/ValidateException';
import ValidateUtil from '../utils/ValidateUtil';

export interface VldItem {
  errorField: string;
  errorCode: string;

  desc?: string;
  // eslint-disable-next-line
  value?: any;
  value1?: number;
  value2?: number;
}

export class ValidateService {
  // eslint-disable-next-line
  protected value: any;
  protected responseField: string;
  protected error: VldItem = null;

  constructor() { }

  // eslint-disable-next-line
  public init(data: any, field: string, responseField?: string): ValidateService {
    if (data === undefined) this.value = null;
    if (typeof data === 'object') this.value = data[field];
    else this.value = data;

    this.responseField = responseField ? responseField : field;
    return this;
  }

  protected createResData(errorCode: string): void {
    const errItem: VldItem = {
      errorField: this.responseField,
      errorCode: errorCode
    };

    throw new ValidateException(errItem);
  }

  //====================================================================================================
  public isNotEmpty(): ValidateService {
    if (ValidateUtil.isEmpty(this.value)) this.createResData(ValidateType.REQUIRE);
    return this;
  }

  public isEmailAny(): ValidateService {
    if (!ValidateUtil.isEmail(this.value)) this.createResData(ValidateType.IS_EMAIL);
    return this;
  }

  public isEmail(isAdmin: boolean): ValidateService {
    if (ValidateUtil.isEmail(this.value) === true && isAdmin) {
      const mailDomains: string[] = process.env.MAIL_DOMAINS.split('|');
      if (mailDomains.some((val) => this.value.endsWith('@' + val)) == false) {
        this.createResData(ValidateType.IS_EMAIL);
      }
    }
    return this;
  }

  public minLength(minLength: number, trim?: boolean): ValidateService {
    if (ValidateUtil.minLength(this.value, minLength, trim) === false) this.createResData(ValidateType.MIN_LEN);
    return this;
  }

  public maxLength(maxLength: number, trim?: boolean): ValidateService {
    if (ValidateUtil.maxLength(this.value, maxLength, trim) === false) this.createResData(ValidateType.MAX_LEN);
    return this;
  }

  public minMaxLength(minLength: number, maxLength: number, trim?: boolean): ValidateService {
    if (ValidateUtil.minMaxLength(this.value, minLength, maxLength, trim) === false) this.createResData(ValidateType.BETWEEN_LEN);

    return this;
  }

  //====================================================================================================
  public minValue(min: number): ValidateService {
    if (this.value === undefined || this.value === null) return this;
    if (ValidateUtil.minValue(this.value, min) === false) this.createResData(ValidateType.MIN_VALUE);
    return this;
  }

  public maxValue(max: number): ValidateService {
    if (this.value === undefined || this.value === null) return this;
    if (ValidateUtil.maxValue(this.value, max) === false) this.createResData(ValidateType.MAX_VALUE);
    return this;
  }

  public minMaxValue(min: number, max: number): ValidateService {
    if (this.value === undefined || this.value === null) return this;
    if (ValidateUtil.minMaxValue(this.value, min, max) === false) this.createResData(ValidateType.BETWEEN_VALUE);
    return this;
  }

  public isNumber(): ValidateService {
    if (this.value === undefined || this.value === null) return this;
    if (isNaN(this.value)) this.createResData(ValidateType.IS_NUMBER);
    return this;
  }

  //====================================================================================================
  // eslint-disable-next-line
  public inList(list: any[]): ValidateService {
    // eslint-disable-next-line
    if (this.value === undefined || this.value === null || this.value === '') return this;
    if (ValidateUtil.inList(this.value, list) === false) this.createResData(ValidateType.IN_LIST);
    return this;
  }

  //Check format: yyyy/MM/dd  and must be existing date
  public isValidDate(format: string): ValidateService {
    console.log(this.value)
    if (this.value === undefined || this.value === null || this.value === '') return this;
    if (ValidateUtil.isValidDate(this.value, format) === false) this.createResData(ValidateType.INVALID);
    return this;
  }

  //====================================================================================================
  public isExist(isNotValid: boolean): ValidateService {
    if (isNotValid) this.createResData(ValidateType.IS_EXIST);
    return this;
  }

  public inValid(isNotValid: boolean): ValidateService {
    if (isNotValid) this.createResData(ValidateType.INVALID);
    return this;
  }

  public custom(isNotValid: boolean, errorCode: string): ValidateService {
    if (isNotValid) this.createResData(errorCode);
    return this;
  }
}
