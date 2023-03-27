export const enum ValidateType {
  REQUIRE = 'Require',
  MIN_VALUE = 'MinValue',
  MAX_VALUE = 'MaxValue',
  BETWEEN_VALUE = 'BetweenValue',
  MIN_LEN = 'MinLength',
  MAX_LEN = 'MaxLength',
  BETWEEN_LEN = 'BetweenLen',
  IN_LIST = 'InList',
  IS_NUMBER = 'IsNumber',
  IS_EMAIL = 'IsEmail',
  INVALID = 'Invalid',
  IS_EXIST = 'IsExist'
}

export const enum ValidateMode {
  INSERT = 1,
  UPDATE = 2
}
