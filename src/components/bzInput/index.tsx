import React from 'react';
import './styles.scss';

type BzInputProps = {
  value: string,
  name: string,
  label: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
  classes?: any,
  error?: string,
  type?: string,
  rest?: object,
};

function BzInput(props: BzInputProps): JSX.Element {
  const {
    label,
    required,
    name,
    classes = {},
    onChange,
    value,
    error,
    type,
    rest,
  } = props;
  return (<div className={`bz-input ${classes.wrapper}`}>
    <label htmlFor={name} className={"label"}>{label} {required && <span className={"text-danger"}>*</span>}</label>
    <input id={name} className={`border ${error && 'border-danger'}`} name={name} value={value} onChange={onChange} type={type} {...rest} />
    {error && <p className={"text-danger"}>{error}</p>}
  </div>);
}

export default BzInput;
