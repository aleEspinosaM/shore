import React from 'react'
import { omit } from 'lodash'
import cx from 'classnames'
import './button.scss'


export interface Props extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > 
{
    className?: string;
    disabled?: boolean
}


export default function Button(props: Props) {
    return (
        <button disabled={props.disabled} className={cx('button-custom',{disabled: props.disabled})} {...omit(props,'children')}>
            {props.children}
        </button>
    )
}
