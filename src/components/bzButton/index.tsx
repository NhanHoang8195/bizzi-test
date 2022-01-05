import React from 'react';
import './styles.scss';

type BzButtonProps = {
  content: any,
  onClick: () => void,
  classes?: any,
  disabled?: boolean,
};

function BzButton(props: BzButtonProps) {
  const {content, onClick, classes = {}, disabled} = props;
  return (<div className={`bz-btn-wrapper d-inline ${classes.wrapper}`}>
    <button type={"button"} className={`btn btn-default bz-btn ${classes.btn}`} onClick={onClick} disabled={disabled}>
    {content}
    </button>
  </div>);
}

export default BzButton;
