import React from 'react';
import './styles.scss';

type BzButtonProps = {
  content: any,
  onClick: () => void,
  classes?: any,
  disabled?: boolean,
  rest?: any,
};

function BzButton(props: BzButtonProps) {
  const {content, onClick, classes = {}, disabled, rest = {}} = props;
  return (<div className={`bz-btn-wrapper d-inline ${classes.wrapper}`}>
    <button type={"button"} className={`btn btn-default ${classes.btn}`} onClick={onClick} disabled={disabled} {...rest}>
    {content}
    </button>
  </div>);
}

export default BzButton;
