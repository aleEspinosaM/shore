import React from 'react'
import { FaSearch } from 'react-icons/fa'
import {omit} from 'lodash'
import './input.scss'

interface Props
    extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
    > {
    withIcon: boolean;
    label: string;
    classnames?: string;
}

export default function Input(props: Props) {
    return (
        <div className='input-wrapper'>
            {props.label ? <label htmlFor='input'>{props.label}</label> : null}
            {props.withIcon ? <FaSearch  className='search-icon'/> : null}
            <input className={props.className} {...omit(props, 'withIcon', 'label')}/>
        </div>
    )
}
