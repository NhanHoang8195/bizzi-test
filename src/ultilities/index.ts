import {REGREX} from 'src/constants';

export const validateEmail = (email: string) => REGREX.EMAIL.test(email);

export const validateRequiredField = (value: string) => !!value;

export const loginFormValidate = (data: any) => {
  let errors = {
    email: '',
    password: '',
  };
  errors.email = validateEmail(data.email) ? '' : 'Email is invalid';
  errors.password = validateRequiredField(data.password) ? '' : 'This field is required';

  return errors;
};

/**
 * Function that check an object existing keys with value is falsy or not.
 * @param obj
 * @return
 *  true if object has at least key and existing truthy value.
 */
export const isEmpty = (obj = {} as any) => !Object.keys(obj).some(key => !!obj[key]);
