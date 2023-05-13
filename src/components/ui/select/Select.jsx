import cn from 'classnames/bind';
import { useContext, useState, useRef, useEffect } from 'react';
import ThemeContext from '../../../contexts/ThemeContext';
import useOutsideClick from '../../../hooks/useOutsideClick';
import ClearButton from '../clear-button/ClearButton';
import Arrow from '../arrow/Arrow';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Select = ({ className, title, options, value, onChange }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const [displayedValue, setDisplayedValue] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, isOpen ? toggleOpen : () => {});

  const handleClearButtonClick = () => {
    onChange(null);
    setDisplayedValue(title);
  };

  const handleOptionClick = (option) => onChange(option);

  useEffect(() => {
    setDisplayedValue(value || title);
  }, [value, title]);

  return (
    <div
      className={cx(className, 'select', {
        'select--open': isOpen,
        'select--dark': isDarkTheme,
      })}
      ref={ref}
      onClick={toggleOpen}>
      <span className={cx('title')}>{displayedValue}</span>
      {displayedValue !== title && (
        <ClearButton className={cx('clear-button')} onClick={handleClearButtonClick} />
      )}
      <Arrow className={cx('arrow')} isOpen={isOpen} />
      {isOpen && options && (
        <ul className={cx('option-list')}>
          {options.map((option, index) => (
            <li className={cx('option')} key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
