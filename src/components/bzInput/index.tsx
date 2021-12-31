import React from 'react';
import './styles.scss';

type BzInputProps = {
  value: string,
  name: string,
  label: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  required?: boolean,
  classes?: any,
};

function BzInput(props: BzInputProps): JSX.Element {
  const {
    label,
    required,
    name,
    classes = {},
    onChange,
    value,
  } = props;
  return (<div className={`bz-input ${classes.wrapper}`}>
    <label htmlFor={name} className={"label"}>{label} {required && <span className={"text-danger"}>*</span>}</label>
    <input id={name} className={""} name={name} value={value} onChange={onChange} />
  </div>);
}

export default BzInput;
