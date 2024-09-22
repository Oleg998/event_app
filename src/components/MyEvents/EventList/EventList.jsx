import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import EventReg from '../../EventReg/EventReg';
import { Link } from 'react-router-dom';
import { selectFilteEvent } from '../../../redux/event/events-selectors';
import { fetchEvents } from '../../../redux/event/events-operation';
import css from './EventList.module.css';
import Loader from 'components/Loader/Loader';

const EventList = () => {
  const [activeModalId, setActiveModalId] = useState(null);
  const dispatch = useDispatch();
  const items = useSelector(selectFilteEvent);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const openModal = (id) => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  return (
    <>
      {items.result && items.result.length > 0 ? (
        <ul className={css.item_conteiner}>
          {items.result.map(({ _id, title, description }) => (
            <li key={_id} className={css.wrapper}>
              <h2>{title}</h2>
              <p>{description}</p>
              <div>
                <button
                  type="button"
                  className={css.button}
                  onClick={() => openModal(_id)}
                >
                  Registration
                </button>
                {/* Передача eventId через state при переходе на другую страницу */}
                <Link
  to={`/events/${_id}`} // Замість /events
  className={css.button}
>
  View
</Link>
              </div>
              <Modal
                isOpen={activeModalId === _id}
                onClose={closeModal}
                title="Event registration"
              >
                <EventReg eventId={_id} onClose={closeModal} />
              </Modal>
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
