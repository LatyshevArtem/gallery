import cn from 'classnames/bind';
import { useContext, useState, useRef } from 'react';
import ThemeContex from '../../../contexts/ThemeContext';
import useOutsideClick from '../../../hooks/useOutsideClick';
import Arrow from '../arrow/Arrow';
import Input from '../input/Input';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Range = ({
  className,
  title,
  firstInputLabel,
  firstInputProps,
  secondInputLabel,
  secondInputProps,
}) => {
  const { isDarkTheme } = useContext(ThemeContex);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useOutsideClick(ref, isOpen ? toggleOpen : () => {});

  return (
    <div
      className={cx(className, 'range', {
        'range--open': isOpen,
        'range--dark': isDarkTheme,
      })}
      ref={ref}>
      <div className={cx('title-wrapper')} onClick={toggleOpen}>
        <span className={cx('title')}>{title}</span>
        <Arrow className={cx('arrow')} isDarkTheme={isDarkTheme} isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className={cx('controls-wrapper')}>
          {firstInputProps.id && firstInputLabel && (
            <label className="visually-hidden" htmlFor={firstInputProps.id}>
              {firstInputLabel}
            </label>
          )}
          <Input
            className={cx('input-range')}
            {...firstInputProps}
            type="number"
            inputmode="numeric"
          />
          <div className={cx('bar')} />
          {secondInputProps.id && secondInputLabel && (
            <label className="visually-hidden" htmlFor={secondInputProps.id}>
              {secondInputLabel}
            </label>
          )}
          <Input
            className={cx('input-range')}
            {...secondInputProps}
            type="number"
            inputmode="numeric"
          />
        </div>
      )}
    </div>
  );
};

export default Range;
