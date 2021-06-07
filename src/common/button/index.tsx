import React from 'react'
import { omit } from 'lodash'
import './button.scss'


export interface Props extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > 
{
    className?: string;
}


export default function Button(props: Props) {
    return (
        <button className={`button-custom ${props.className}`} {...omit(props,'children')}>
            {props.children}
        </button>
    )
}
