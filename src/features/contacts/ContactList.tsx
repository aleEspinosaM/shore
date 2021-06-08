import React from 'react'
import { IContact, setContact } from './contactsSlice'
import cx from 'classnames'
import { useAppDispatch } from '../../app/hooks';

export default function ContactList({ 
    contacts, 
    disabled
}: {
    contacts: 
    IContact[], 
    disabled?: boolean
}): JSX.Element {
    const dispatch = useAppDispatch();
    return (
        <>
            {contacts.map((c) => {
                return (
                    <div onClick={() => {dispatch(setContact(c))}} key={`${c.first_name}-${c.last_name}`} className={cx('contact',{disabled: disabled})}>
                        <div className='avatar-container'>
                            <img alt='avatar' className='avatar' src={c.avatar} />
                            {c.is_online ? <span className='online-marker' /> : null}
                        </div>
                        <div className='name'>
                            {`${c.first_name} ${c.last_name}`}
                        </div>
                        <div className='department'>
                            {c.department}
                        </div>
                        <div className='email'>
                            {c.email}
                        </div>
                        <div className='amount'>
                            ${c.amount}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
