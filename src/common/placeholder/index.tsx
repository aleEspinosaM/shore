import React from 'react'
import { RouterProps, useLocation } from 'react-router'
import './Placeholder.scss'

export default function Placeholder(props: RouterProps): JSX.Element {
    const {pathname} = useLocation();
    return (
        <div className='placeholder-container'>
            <h1>{pathname.replace('/', '')}</h1>
        </div>
    )
}
