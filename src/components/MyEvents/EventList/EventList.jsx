import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import EventReg from '../../EventReg/EventReg';
import { Link } from 'react-router-dom';
import { selectFilteEvent,selectorRequestStutus } from '../../../redux/event/events-selectors';
import { fetchEvents } from '../../../redux/event/events-operation';
import css from './EventList.module.css';
import { useSearchParams } from 'react-router-dom';
import Loader from 'components/Loader/Loader';

const EventList = () => {
  const [totalPage, setTotalPage] = useState(0); 
  const [activeModalId, setActiveModalId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = 9; 
  const dispatch = useDispatch();
  const items = useSelector(selectFilteEvent);
   const isLoading= useSelector(selectorRequestStutus)
  useEffect(() => {
    if (items.total) {
      const totalPages = Math.ceil(items.total / perPage); 
      setTotalPage(totalPages);
    }
  }, [items.total, perPage]);

  useEffect(() => {
    dispatch(fetchEvents({ page, perPage }));
  }, [dispatch, page, perPage]);

  const openModal = id => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPage) {
      setSearchParams({ page: newPage });
    }
  };

  const elements = items.result?.map(({ _id, title, description, date, organizer }) => (
    <li key={_id} className={css.wrapper}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={css.sub_disc}>
        <p>{date}</p>
        <p>{organizer}</p>
      </div>
      <div className={css.btn_conteiner}>
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
          state={{ title }} 
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
  ));

  return (
    <>
      {isLoading && <Loader></Loader>}
      {elements?.length > 0 ? (
      <ul className={css.item_conteiner}>
        {elements}
      </ul>
    ) : (
      <p>Not Events</p>
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

        {Array.from({ length: totalPage }, (_, index) => (
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
          disabled={page === totalPage} 
        >
          &#8594;
        </button>
      </div>
    </>
  );
};

export default EventList;
