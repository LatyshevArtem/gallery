import cn from 'classnames/bind';
import styles from './styles.module.scss';
import { ReactComponent as ArrowIcon } from '../../../assets/images/arrow.svg';

const cx = cn.bind(styles);

const Arrow = ({ isOpen, className }) => {
  return (
    <ArrowIcon
      className={cx(className, {
        'arrow--opened': isOpen,
      })}
    />
  );
};

export default Arrow;
