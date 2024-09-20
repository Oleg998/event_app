import { useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import css from './PhoneForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addContacts } from '../../../redux/contacts/contacts-operation';
import { selectContact,selectorRequestStutus } from "../../../redux/contacts/contacts-selectors"
import { toast } from 'react-toastify';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const PhoneForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const {isLoading}=useSelector(selectContact);
  const dispatch = useDispatch();
  const status= useSelector(selectorRequestStutus) 

  useEffect(()=>{
    if(status==="addRejected") 
    {toast.error('Contact not added to Phonebook')}
  },[status])

  useEffect(()=>{
    if(status==="addFlfilled"){toast.success("Success contact add to phonebook")}
  },[status]);

  useEffect (()=>{
    
    if (status==="addFlfilled"){setState({ ...INITIAL_STATE })}
  },[status])



  const addForPhenebook = data => {
    dispatch(addContacts(data));
  };

  const nameId = useMemo(() => nanoid(), []);
  const numbId = useMemo(() => nanoid(), []);

  const handelChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const handelSubmit = e => {
    e.preventDefault();
    addForPhenebook({ ...state });
   
  };
  const { name, number } = state;
  return (
    <form onSubmit={handelSubmit} className={css.form}>
      <h1 className={css.titel}>Phonebook</h1>
      <div>
        <label htmlFor={nameId}>Name</label>
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' \\\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={handelChange}
          className={css.input}
          id={nameId}
          type="text"
          name="name"
          required
          placeholder="Enter you name "
        ></input>
      </div>

      <div>
        <label htmlFor={numbId}>Number </label>
        <input
          pattern="(\+?\d{1,4}[ \-]?)?(\(?\d{1,3}\)?[ \-]?)?\d{1,4}[ \-]?\d{1,4}[ \-]?\d{1,9}"
          title="Enter the correct phone number"
          value={number}
          onChange={handelChange}
          className={css.input}
          id={numbId}
          type="tel"
          name="number"
          required
          placeholder="Enter you number "
        ></input>
      </div>
      <button className={`${css.btn} ${
            isLoading  ? css.selectedButton : ''
          }`} type="submit">
      {isLoading  ? 'Loading...' : 'Add contact'}
      </button>
    </form>
  );
};

export default PhoneForm;
