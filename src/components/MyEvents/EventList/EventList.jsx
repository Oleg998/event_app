import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../../redux/filter/filter-slice';
import {
  selectFilteEvent,
  selectorRequestStutus,
  selectEvent

} from '../../../redux/event/events-selectors';
import {
  fetchEvents
} from '../../../redux/event/events-operation';
import css from './EventList.module.css';
import { toast } from 'react-toastify';

const EventList = () => {
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const status= useSelector(selectorRequestStutus)
  const dispatch = useDispatch();
  const {  error  } = useSelector(selectEvent);
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

   const handelSearce = ({ target }) => dispatch(setFilter(target.value));

  // const elements = items.map(({ id, name, number }) => {
  //   return (
  //     <li key={id} className={css.items}>
  //       {name} :{number}
  //       <button
  //         onClick={() => deleteName(id)}
  //         type="button"
  //         className={`${css.button} ${
  //           selectedButtonId === id ? css.selectedButton : ''
  //         }`}
  //       >
  //         {selectedButtonId === id ? 'Loading...' : 'Delete'}
  //       </button>
  //     </li>
  //   );
  // });

  return (
    <>
      <div className={css.wrapper}>
        <h2>Events</h2>
       
      </div>
    </>
  );
};

export default EventList;
