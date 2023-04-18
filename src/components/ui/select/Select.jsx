import cn from 'classnames/bind';
import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import ClearButton from '../clear-button/ClearButton';
import Arrow from '../arrow/Arrow';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Select = ({ className, title, options, optionName, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, isOpen ? toggleOpen : () => {});

  const handleClearButtonClick = () => onChange('');

  return (
    <div
      className={cx(className, 'select', {
        'select--open': isOpen,
      })}
      ref={ref}
      onClick={toggleOpen}>
      <span className={cx('title')}>{value || title}</span>
      {value && <ClearButton className={cx('clear-button')} onClick={handleClearButtonClick} />}
      <Arrow className={cx('arrow')} isOpen={isOpen} />
      {isOpen && options && (
        <>
          <ul className={cx('option-list')}>
            {options.map((option) => (
              <li
                className={cx('option')}
                key={option.id}
                onClick={() => onChange(option[optionName])}>
                {option[optionName]}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Select;
