import {AppRoute} from "./AppRoutes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const App = () => {
 
  return ( <>
  <ToastContainer autoClose={5000} />
    <AppRoute/>
  </>
    
  );
};
