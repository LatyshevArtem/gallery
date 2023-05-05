import cn from 'classnames/bind';
import { ReactComponent as Arrow } from '../../../assets/images/one-step-arrow.svg';
import { ReactComponent as DoubleArrow } from '../../../assets/images/all-step-arrow.svg';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const NavigateArrow = ({ className, isDoubleArrow, back }) => {
  return isDoubleArrow ? (
    <DoubleArrow
      className={cx(className, {
        'arrow--back': back,
      })}
    />
  ) : (
    <Arrow
      className={cx(className, {
        'arrow--back': back,
      })}
    />
  );
};

export default NavigateArrow;
