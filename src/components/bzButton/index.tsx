import React from 'react';
import './styles.scss';

type BzButtonProps = {
  text: string,
  onClick: () => void,
  classes?: any,
};

function BzButton(props: BzButtonProps) {
  const {text, onClick, classes} = props;
  return (<div className={`bz-btn-wrapper ${classes.wrapper}`}>
    <button type={"button"} className={"btn btn-default bz-btn"} onClick={onClick}>
    {text}
    </button>
  </div>);
}

export default BzButton;
