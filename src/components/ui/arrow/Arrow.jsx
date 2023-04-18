import cn from 'classnames/bind';
import { ReactComponent as ArrowIcon } from '../../../assets/images/arrow.svg';
import styles from './styles.module.scss';

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
