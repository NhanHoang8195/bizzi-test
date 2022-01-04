import React from 'react';
import './styles.scss';

type BzButtonProps = {
  text: string,
  onClick: () => void,
  classes?: any,
  disabled?: boolean,
};

function BzButton(props: BzButtonProps) {
  const {text, onClick, classes, disabled} = props;
  return (<div className={`bz-btn-wrapper d-inline ${classes.wrapper}`}>
    <button type={"button"} className={"btn btn-default bz-btn"} onClick={onClick} disabled={disabled}>
    {text}
    </button>
  </div>);
}

export default BzButton;
