import React from 'react'
import {Message} from '../lib/myTypes'

export const Alert = ({color='info',children, dismissible=false, onClose}: Message) => {
    let classes = `alert alert-${color}`;
    let extras;
    if (dismissible && onClose) { 
        classes += ' alert-dismissible fade show';
        extras = <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
    }
    return (
    <div className={classes} role='alert'>{children}{extras}</div>
  )
}

export default Alert;
