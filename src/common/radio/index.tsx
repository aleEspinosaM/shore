import React from 'react'
import './radio.scss'

interface Props {
    /** Label to display to the right of the radio. */
    label?: string;

    /** Whether or not the radio is checked. */
    checked: boolean;

    /** Called whenever the radio or its label are clicked or tapped on. */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /** The name of the form the radio belongs to. */
    name?: string;

    /** A className to override styles. */
    className?: string;

    value: 'male' | 'female' | 'other'

}

function Radio(props:Props) {
    const {
        label,
        className,
        ...inputProps
    } = props;
    return (
        <label className={`radioInput ${className || ''}`}>
            <span className='hoverBackground'/>
            {label}

            <input
                type="radio"
                {...inputProps}
            />
            <span className={`radioInput_check`} />
        </label>
    )
}

export default Radio
