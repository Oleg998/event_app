import css from "./eventPage.module.css"
import EventUser from "../../components/MyEvents/EventUser/EventUser";

const EventPage = () => {

    return ( <> 
     <div className={css.wrraper}>         
       <p className={css.shadowText}>Welcome <br /> To <br /> Phonebook </p>
        </div>
        <EventUser/>
      
    </> 
  
    )
  };
  
  export default EventPage;