import { useEffect } from 'react'
import { RouterProps } from 'react-router'
import {
    fetchContacts, IContact, setSearchTerm,
} from './contactsSlice';
import './Contacts.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Input from '../../common/input'
import ContactList from './ContactList';
import Button from '../../common/button';
import { isEmpty } from 'lodash';

function Contacts(props: RouterProps) {
    const filterTerm = (contacts: IContact[], searchTerm:string): IContact[] => {
        if(isEmpty(searchTerm)) {
            return contacts;
        }
        return contacts.filter(c => {
            const rx = new RegExp(searchTerm, 'gi')
            return c?.first_name.match(rx) || c?.last_name.match(rx) || c?.email.match(rx)
        })
    }
    const activeContacts = useAppSelector(state => 
        filterTerm(state.contacts.data.filter(d => d.is_active), state.contacts.searchTerm) 
    )
    const inactiveContacts = useAppSelector(state => state.contacts.data.filter(d => !d.is_active))
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        dispatch(setSearchTerm(term))
    }
  
    return (
      <div id='contacts'>
        <div className='toolbar'>
          <div>
            <Input onChange={onChange} className='toolbar-input' placeholder='Search Contacts' label='' withIcon={true} />
          </div>
          <div className='toolbar-button'>
            <Button onClick={() => console.log('akuu')}>+ Add Contact</Button>
          </div>
        </div>
        <section>
          <h2 className='subtitle'>Active Users</h2>
          <div className='contact-wrapper'>
              {
                !isEmpty(activeContacts)
                ? <ContactList contacts={activeContacts} />
                : <div className='no-data'>No data available</div>
              }
          </div>
        </section>
        <section>
          <h2 className='subtitle'>Inactive Users</h2>
          <div className='contact-wrapper'>
            <ContactList contacts={inactiveContacts} disabled />
          </div>
        </section>
      </div>
    )
}

export default Contacts