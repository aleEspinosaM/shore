import React, { useState } from 'react'
import ReactModal, { setAppElement } from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createContacts, IContact, resetContact, toogleContactForm, updateContacts } from './contactsSlice';
import './ContactForm.scss'
import Input from '../../common/input';
import { isValidEmail, isValidName } from './validators';
import Radio from '../../common/radio';
import CurrencyInput from 'react-currency-input-field';
import Checkbox from '../../common/checkbox';
import Button from '../../common/button';

setAppElement('#root')

const validateFactory = (field: string, value: string) => {
    switch (field) {
        case 'first_name':
            return !isValidName(value)
        case 'last_name':
            return !isValidName(value)
        case 'email':
            return !isValidEmail(value)
    }
}

export default function ContactForm({
    contact,
}: {
    contact?: IContact;
}) {
    const dispatch = useAppDispatch();
    const { setContact, updatinContact, postinContact} = useAppSelector(state => state.contacts)
    const fieldToValidate = ['first_name', 'last_name', 'email']
    const [values, setValues] = useState({
        first_name: {
            value: setContact?.first_name || '',
            touched: setContact?.first_name ? true : false,
            error: false
        },
        last_name: {
            value: setContact?.last_name ||'',
            touched: setContact?.last_name ?true : false,
            error: false
        },
        email: {
            value: setContact?.email ||'',
            touched: setContact?.email ?true : false,
            error: false
        },
        gender: {
            value: '',
        },
        department: {
            value: ''
        },
        contribution: {
            value: ''
        },
        is_active: {
            value: '',
        }
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target
        setValues({
            ...values,
            [name]: {
                touched: true,
                error: fieldToValidate.includes(name) ? validateFactory(name, value) : '',
                value
            }
        })
    }
    const handleChangeCustom = (value: string , name: string) => {
        setValues({
            ...values,
            [name]: {
                value
            }
        })
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const {first_name, last_name, email} = values
        const payload = {
            first_name: first_name.value,
            last_name: last_name.value,
            email: email.value,
            ...(setContact?.id ? { id: setContact.id } : {}),
            ...(setContact?.id ? { avatar: setContact.avatar } : {}),
        }
        if (setContact?.id) {
            dispatch(updateContacts(payload))
        } else {
            dispatch(createContacts(payload))
        }
    }

    const onClose = () => {
        dispatch(toogleContactForm())
        if (setContact?.id) {
            dispatch(resetContact())
        }
    }

    const isValidFirstName = !(!!values.first_name.error || !values.first_name.touched)
    const isvalidLastName = !(!!values.last_name.error || !values.last_name.touched)
    const isValidEmail = !(!!values.email.error || !values.email.touched)

    const isDisabled = !isValidEmail || !isValidFirstName || !isvalidLastName || postinContact === 'loading' || updatinContact === 'loading'
    
    return (
        <ReactModal
            isOpen={true}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className='contact-modal'> 
                <header className='header'>
                    <h3>
                        {setContact?.id ? `Edit contact "${setContact.first_name} ${setContact.last_name}"` : 'Add contact'}
                    </h3>
                    <button onClick={onClose}>X</button>
                </header>
                <section className='form-section'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-row'>
                            <div className='half-width'>
                                <Input 
                                    label='First Name*'
                                    onChange={handleChange}
                                    name='first_name'
                                    className='contact-input'
                                    value={values.first_name.value}
                                    withIcon={false}
                                />
                                {values.first_name.touched && values.first_name.error && (
                                    <span className='error-block'>Please type First name</span>
                                )}
                            </div>
                            <div className='half-width'>
                                <Input
                                    label='Last Name*'
                                    name='last_name'
                                    onChange={handleChange}
                                    className='contact-input'
                                    value={values.last_name.value}
                                    withIcon={false}
                                />
                                {values.last_name.touched && values.last_name.error && (
                                    <span className='error-block'>Please type Last name</span>
                                )}
                            </div>
                        </div>
                        <br />
                        <div className='radio-section'>
                            <label>Gender</label>
                            <div className='radio-container'>
                                <Radio 
                                    name='gender'
                                    value='male'
                                    checked={values.gender.value === 'male'}
                                    onChange={(e) => handleChangeCustom(e.target.value, e.target.name)}
                                    label='Male'
                                />
                                <Radio 
                                    name='gender'
                                    value='female'
                                    checked={values.gender.value === 'female'}
                                    onChange={(e) => handleChangeCustom(e.target.value, e.target.name)}
                                    label='Female'
                                />
                                <Radio 
                                    name='gender'
                                    value='other'
                                    checked={values.gender.value === 'other'}
                                    onChange={(e) => handleChangeCustom(e.target.value, e.target.name)}
                                    label='Other'
                                />
                            </div>
                        </div>
                        <br />
                        <div className='email-section'>
                            <Input
                                label='Email*'
                                name='email'
                                onChange={handleChange}
                                className='contact-input'
                                value={values.email.value}
                                withIcon={false}
                            />
                            {values.email.touched && values.email.error && (
                                <span className='error-block'>Please enter a valid email</span>
                            )}
                        </div>
                        <br/>
                        <div className='form-row'>
                            <div className='half-width'>
                                <label>
                                    Pick your favorite flavor:
                                    <select 
                                        className='select' 
                                        value={values.department.value} 
                                        name='department'
                                        onChange={(e) => handleChangeCustom(e.target.value, e.target.name)}
                                    >
                                        <option value=''>Select Department</option>
                                        <option value="it">IT</option>
                                        <option value="marketing">Marketing</option>
                                        <option value="sales">Sales</option>
                                        <option value="support">Support</option>
                                    </select>
                                </label>
                            </div>
                            <div className='half-width'>
                                <label>Contribution</label>
                                <CurrencyInput
                                    id="input-example"
                                    className='money-input'
                                    name="contribution"
                                    placeholder="Please enter a number"
                                    decimalsLimit={2}
                                    value={values.contribution.value}
                                    prefix='€'
                                    onValueChange={(value, name) => handleChangeCustom((value || ''), (name || ''))}
                                />
                            </div>
                        </div>
                        <br />
                        <div className='is-active-section'>
                            <Checkbox
                                onChange={(e) => handleChangeCustom(e.target.checked ? 'true' : 'false',e.target.name)}
                                label='Is Active'
                                name='is_active'
                                checked={values.is_active.value === 'true'}
                            />
                        </div>
                        <footer>
                            <div>
                                <Button onClick={onClose}> Cancel </Button>
                            </div>
                            <div>
                                <Button disabled={isDisabled} type='submit'> Save </Button>
                            </div>
                        </footer>
                    </form>
                </section>
            </div>
        </ReactModal>
    )
}
