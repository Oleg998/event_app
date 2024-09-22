import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import EventReg from '../../EventReg/EventReg';
import { Link } from 'react-router-dom';
import { selectFilteEvent } from '../../../redux/event/events-selectors';
import { fetchEvents } from '../../../redux/event/events-operation';
import css from './eventUser.module.css';

const EventUser = () => {
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector(selectFilteEvent);

  useEffect(() => {
    setSelectedButtonId(null);
    dispatch(fetchEvents());
  }, [dispatch, selectedButtonId]);

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
  const openModal = () => {
    setModalActive(true);
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
                  onClick={openModal}
                >
                  Registratin
                </button>
                <Link to="/evets" className={css.button}>
                  Viev
                </Link>
              </div>
              <Modal
                isOpen={modalActive}
                onClose={setModalActive}
                title={'Event registration'}
              >
                <EventReg eventId={_id} onClose={setModalActive} />
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

export default EventUser;
