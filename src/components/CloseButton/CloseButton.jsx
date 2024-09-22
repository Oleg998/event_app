import css from './closeButton.module.css';
import sprite from '../../images/icons.svg';



const CloseButton = ({ onClose }) => {
    const handleClick = () => {
      onClose();
    }

  return (
    <button className={css.btn_close} onClick={handleClick} >
      <svg className={css.item_svg}>
        <use className={css.item_use}  href={`${sprite}#x-close-icon`} />
      </svg>
    </button>
  );
};

export default CloseButton;
