import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import EventReg from '../../EventReg/EventReg';
import { Link } from 'react-router-dom';
import { selectFilteEvent } from '../../../redux/event/events-selectors';
import { fetchEvents } from '../../../redux/event/events-operation';
import css from './EventList.module.css';
import Loader from 'components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

const EventList = () => {
  const [totaPage, setTotalPage] = useState('');
  const [activeModalId, setActiveModalId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
 
  const LoadMore = () => setSearchParams({ page: Number(page) + 1 });

  const dispatch = useDispatch();

  const items = useSelector(selectFilteEvent);

  useEffect(() => {
    setTotalPage(items.total);
  }, [items.total]);

  useEffect(() => {
    dispatch(fetchEvents({page }))
  }, [dispatch, page]);

  const openModal = id => {
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
      <button onClick={LoadMore} type="button">
        Load more
      </button>
    </>
  );
};

export default EventList;
