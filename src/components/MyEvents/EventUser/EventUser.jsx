import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from "../../../redux/user/user-selectors"; 
import { fetchUser } from "../../../redux/user/user-operation";
import css from './eventUser.module.css';
import Loader from 'components/Loader/Loader';

const EventUser = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  
  const eventId = pathname.split('/').pop();

  useEffect(() => {
    if (eventId) {
      dispatch(fetchUser(eventId));
    }
  }, [dispatch, eventId]);
  const items = useSelector(selectUser) || []
  const {  isLoading, error } = useSelector(state => ({
    isLoading: state.user.isLoading,
    error: state.user.error,
  }));

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {isLoading && <Loader />}
      {items.result && items.result.length > 0 ? (
        <ul className={css.item_container}>
          {items.result.map(({ _id, name, birthday, email }) => (
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
