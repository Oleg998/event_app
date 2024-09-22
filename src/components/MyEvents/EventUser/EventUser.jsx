
import { useLocation } from 'react-router-dom';
import {
  selecUser
} from "../../../redux/user/user-selectors"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './eventUser.module.css';
import { fetchUser } from "../../../redux/user/user-operation";

const EventUser = () => {
  
 
  const dispatch = useDispatch();


  // Стейт для хранения пользователей, ошибки и статуса загрузки
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();


  const { pathname } = location;
  const eventId = pathname.split('/').pop(); 



  useEffect(() => {
    if (eventId) {
      dispatch(fetchUser(eventId))
    }
    }, [dispatch, eventId]);

    const items=useSelector(selecUser)

   



  return (
    <>
    {items && items.length > 0 ? (
      <ul className={css.item_conteiner}>
        {items.map(({ _id, name, birthday , email }) => (
          <li key={_id} className={css.wrapper}>
            <h2>{name}</h2>
            <p>{birthday}</p>
            <p>{email}</p>
          
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
