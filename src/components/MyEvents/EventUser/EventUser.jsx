import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterUser,selectUserIsLoading ,selecStatusError} from "../../../redux/user/user-selectors"; 
import { fetchUser } from "../../../redux/user/user-operation";
import css from './eventUser.module.css';
import Loader from 'components/Loader/Loader';
import {setFilter} from "../../../redux/filter/filter-slice"

const EventUser = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  
  const eventId = pathname.split('/').pop();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchUser(eventId));
    }
  }, [dispatch, eventId]);

  const isLoading=useSelector(selectUserIsLoading)
  const error=useSelector(selecStatusError)
  const items = useSelector(selectFilterUser) || []

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handelSearce = ({ target }) => dispatch(setFilter(target.value));
  return (
    <>
      {isLoading && <Loader />}
      <div className={css.wrapper_input}> 
         <input className={css.input}
          name="filter"         
          placeholder="Searce Name"
          onChange={handelSearce}
        ></input> </div>
     

      {items && items.length > 0 ? (
        <ul className={css.item_container}>
          {items.map(({ _id, name, birthday, email }) => (
            <li key={_id} className={css.wrapper}>
              <h2>Name: {name}</h2>
              <p>Birthday: {birthday}</p>
              <p>Email: {email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Event not found</p>
      )}
    </>
  );
};

export default EventUser;
