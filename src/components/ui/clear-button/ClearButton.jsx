import cn from 'classnames/bind';
import { ReactComponent as ButtonIcon } from '../../../assets/images/cross.svg';
import styles from './styles.modules.scss';

const cx = cn.bind(styles);

const ClearButton = ({ className, onClick }) => {
  return (
    <button className={cx(className, 'clear-button')} onClick={onClick} type="button">
      <ButtonIcon />
    </button>
  );
};

export default ClearButton;
