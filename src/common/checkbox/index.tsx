import React from 'react'
import cx from 'classnames'
import './checkbox.scss'

export interface Props {
    /** A label for the input */
    label?: string;

    /** Is the input checked */
    checked?: boolean;

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /** The name of the checkbox group */
    name?: string;

    /** A value for the checkbox */
    value?: string;
}

function Checkbox(props: Props) {
    let {
        label,
        checked,
        onChange,
        name,
        value,
    } = props;

    return (
        <div className='CheckboxInput'>
            <label className={`CheckboxLabel`}>
                {label && (
                    <div className='CheckboxLabel_text'>{label}</div>
                )}
                {/*TODO - consider adding indeterminate to <input> using $ref */}
                <input
                    className={'CheckboxLabel_hiddenInput'}
                    type="checkbox"
                    name={name}
                    checked={checked}
                    value={value}
                    onChange={onChange}
                />
                <span
                    className={`CheckboxCheckContainer`}
                >
                    <span
                        className={cx('CheckboxCheck', { CheckboxCheck___checked: checked})}
                    >
                    </span>
                </span>
            </label>
        </div>
    );
}

export default Checkbox
