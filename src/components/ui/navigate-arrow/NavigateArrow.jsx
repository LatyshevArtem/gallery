import cn from 'classnames/bind';
import { ReactComponent as Arrow } from '../../../assets/images/one-step-arrow.svg';
import { ReactComponent as DoubleArrow } from '../../../assets/images/all-step-arrow.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const NavigateArrow = ({ className, doubleArrow, back }) => {
  return doubleArrow ? (
    <DoubleArrow
      className={cx(className, 'arrow', {
        'arrow--back': back,
      })}
    />
  ) : (
    <Arrow
      className={cx(className, 'arrow', {
        'arrow--back': back,
      })}
    />
  );
};

export default NavigateArrow;
