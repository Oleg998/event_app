import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import EventReg from '../../EventReg/EventReg';
import { Link } from 'react-router-dom';
import { selectFilteEvent } from '../../../redux/event/events-selectors';
import { fetchEvents } from '../../../redux/event/events-operation';
import css from './EventList.module.css';
import { useSearchParams } from 'react-router-dom';

const EventList = () => {
  const [totaPage, setTotalPage] = useState(0); // Загальна кількість сторінок
  const [activeModalId, setActiveModalId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = 9; // Кількість подій на сторінку

  const dispatch = useDispatch();
  const items = useSelector(selectFilteEvent);

  useEffect(() => {
    if (items.total) {
      const totalPages = Math.ceil(items.total / perPage); // Розрахунок кількості сторінок
      setTotalPage(totalPages);
    }
  }, [items.total]);

  useEffect(() => {
    dispatch(fetchEvents({ page, perPage }));
  }, [dispatch, page]);

  const openModal = id => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totaPage) {
      setSearchParams({ page: newPage });
    }
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
                <Link
                  to={`/events/${_id}`} 
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

     
      <div className={css.pagination}>
        <button
          type="button"
          className={css.pageButton}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1} 
        >
          &#8592; 
        </button>

        {Array.from({ length: totaPage }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`${css.pageButton} ${page === index + 1 ? css.active : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          type="button"
          className={css.pageButton}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totaPage} 
        >
          &#8594; 
        </button>
      </div>
    </>
  );
};

export default EventList;
