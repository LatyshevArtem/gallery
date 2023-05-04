import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Input = ({ className, ...other }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <input
      className={cx(className, 'input', {
        'input--dark': isDarkTheme,
      })}
      {...other}
    />
  );
};

export default Input;
