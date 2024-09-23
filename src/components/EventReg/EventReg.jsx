import css from './eventReg.module.css';
import Notiflix from 'notiflix';
import sprite from '../../images/icons.svg';
import FormBtn from '../FormBtn/FormBtn';
import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { register } from "../../redux/user/user-operation";
import { useDispatch } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

const EventReg = ({ onClose , eventId }) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const dat = new Date();
  const firstData = dat.toLocaleDateString('en-US', options);
  
  const INITIAL_STATE = {
    event:eventId , 
    name: '',
    email: '',
    priority: 'Social media',
  };

  const [addCardModalState, setAddCardModal] = useState({ ...INITIAL_STATE });
  const [selectedDate, setSelectedDate] = useState(firstData);
  const dispatch = useDispatch();

  const validateInput = () => {
    return (
      addCardModalState.name.trim() !== '' &&
      addCardModalState.email.trim() !== ''
    );
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAddCardModal({ ...addCardModalState, [name]: value });
  };

  const handleChangeData = date => {
    setSelectedDate(date.toLocaleDateString('en-US', options));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateInput()) {
      Notiflix.Notify.failure('The name and email address cannot be empty.');
      return;
    }    
    const formData = { ...addCardModalState, birthday: selectedDate };
    dispatch(register(formData));
    onClose(false);
    setAddCardModal({ ...INITIAL_STATE });
  };



  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    const formattedDate = new Date(date).toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className={css.calendarHeader}>
        <button onClick={decreaseMonth} type="button">
          <svg className="arrow" width="4" height="8">
            <use href={`${sprite}#icon-arrow-left`}></use>
          </svg>
        </button>
        <span className={css.date}>{formattedDate}</span>
        <button onClick={increaseMonth} type="button">
          <svg className="arrow" width="4" height="8">
            <use href={`${sprite}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
    );
  };

  const dayClassName = date => {
    return date ? css.customDay : null;
  };
  const handleCalendarClick = e => {
    e.stopPropagation();
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => {
    const [day, month, year] = value.split('/');
    const currentDate = new Date();
    const selectedDate = new Date(year, month - 1, day);
    const isToday = currentDate.toDateString() === selectedDate.toDateString();
    const monthName = selectedDate.toLocaleString('en', { month: 'long' });
    const formattedValue = isToday
      ? `Today, ${monthName} ${day}`
      : `${monthName} ${day}`;

    return (
      <div className="button-wrapper">
        <button
          type="button"
          className="example-custom-input"
          onClick={onClick}
          ref={ref}
        >
          {formattedValue}
        </button>
        <svg className="arrow-down" width="9" height="5">
          <use href={`${sprite}#icon-arrow-down`}></use>
        </svg>
      </div>
    );
  });

  const { name, email, priority } = addCardModalState;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Full name </label>
      <input
        value={name}
        className={css.input}
        type="text"
        name="name"
        required
        id="name"
        onChange={handleChange}
      ></input>

      <label htmlFor="email">Email </label>
      <input
        value={email}
        className={css.input}
        type="email"
        name="email"
        required
        id="email"
        onChange={handleChange}
      ></input>

      <div className={css.radio_container}>
        <p className={css.sub_title}>Where did you hear about this event?</p>
        <div className={css.radio_container_item}>
          <div>
            <input
              checked={priority === 'Social media'}
              className={css.radio_input}
              name="priority"
              type="radio"
              value="Social media"
              id="Social media"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Social media">
              <span
                className={
                  priority === 'Social media'
                    ? css.circle_active
                    : css.circle
                }
              ></span>
              <span className={css.label_text}>Social media</span>
            </label>
          </div>

          <div>
            <input
              checked={priority === 'Friends'}
              className={css.radio_input}
              name="priority"
              type="radio"
              value="Friends"
              id="Friends"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Friends">
              <span
                className={priority === 'Friends' ? css.circle_active : css.circle}
              ></span>
              <span className={css.label_text}>Friends</span>
            </label>
          </div>

          <div>
            <input
              checked={priority === 'Found myself'}
              className={css.radio_input}
              name="priority"
              type="radio"
              value="Found myself"
              id="Found myself"
              onChange={handleChange}
            />
            <label className={css.label_icon} htmlFor="Found myself">
              <span
                className={
                  priority === 'Found myself'
                    ? css.circle_active
                    : css.circle
                }
              ></span>
              <span className={css.label_text}>Found myself</span>
            </label>
          </div>
        </div>
      </div>

      <div className={css.datapicer_conteinet}>
        <p className={css.sub_title}>Date of birth</p>

        <DatePicker
          selected={selectedDate}
          onChange={handleChangeData}
          onClick={handleCalendarClick}
          customInput={<ExampleCustomInput />}
          dateFormat="dd/MM/yyyy"
          renderCustomHeader={renderCustomHeader}
          calendarClassName={css.customCalendar}
          dayClassName={dayClassName}
          className={css.my_datepicker}
          minDate={new Date('1900-01-01')}
        />
      </div>

      <FormBtn textBtn="Sent" />
    </form>
  );
};

export default EventReg;
