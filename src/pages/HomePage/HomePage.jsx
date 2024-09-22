import css from "./home-page.module.css"
import EventList from "../../components/MyEvents/EventList/EventList" 

const HomePage = () => {

  return ( <> 
   <div className={css.wrraper}>         
     <p className={css.shadowText}>Evets </p>
      </div>
      
      <EventList/>
  </> 

  )
};

export default HomePage;
