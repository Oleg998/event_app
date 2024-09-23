import css from "./eventPage.module.css";
import EventUser from "../../components/MyEvents/EventUser/EventUser";
import { useLocation, useNavigate } from 'react-router-dom';


const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { title } = location.state || {}; 

  const handleGoToEvent = () => {
    console.log('Button clicked!');
    navigate('/'); 
  };

  return (
    <> 
      <div className={css.wrraper}>         
        <p className={css.shadowText}>
          {title ? `Event: ${title}` : 'Event Page'}
        </p>
      </div>
      <EventUser/>
 
     <button className={css.backButton}onClick={handleGoToEvent} >Go to Event</button>
    </> 
  );
};

export default EventPage;
