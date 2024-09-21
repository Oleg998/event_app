import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectFilteEvent,
 
  

} from '../../../redux/event/events-selectors';
import {
  fetchEvents
} from '../../../redux/event/events-operation';
import css from './EventList.module.css';


const EventList = () => {
  const [selectedButtonId, setSelectedButtonId] = useState(null);


  const dispatch = useDispatch();

  const items = useSelector(selectFilteEvent);

  useEffect(() => {
    setSelectedButtonId(null);    
    dispatch(fetchEvents());
  }, [dispatch,selectedButtonId ]);

  console.log(items)

  // useEffect(()=>{
  //   if (status==="deleteRejected") {toast.error('Contact not deleted')} 
  // },[status]);

  // useEffect(()=>{
  //   if(status==="deleteFulfilled"){toast.success("Contact deleted successfully")}
  // },[status]);

  // const deleteName = id => {
  //   dispatch(deleteContacts(id));
  //   setSelectedButtonId(id);
  // };



   return (
    <>
      {items.result && items.result.length > 0 ? (
        <ul >
          {items.result.map(({ _id, title, description }) => (
            <li key={_id} className={css.wrapper}>
              <h2>{title}</h2>
              <p>{description}</p>
              <div>
                <button type="button" className={css.button}>
                  Registratin
                </button>
                <button type="button" className={css.button}>
                  Viev 
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Event not found</p>
      )}
    </>
  );
};

export default EventList;
