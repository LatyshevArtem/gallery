import cn from 'classnames/bind';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Input = ({ className, value, onChange, ...other }) => {
  return (
    <input
      className={cx(className, 'input')}
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      {...other}
    />
  );
};

export default Input;
