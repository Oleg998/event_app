import css from './formBtn.module.css';



const FormBtn = ({ textBtn }) => {
  



  
  return (
    <button className={css.btn}  type="submit">
     {textBtn}
    </button>
  );
};

export default FormBtn;
