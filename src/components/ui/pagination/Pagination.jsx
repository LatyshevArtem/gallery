import cn from 'classnames/bind';
import { useContext } from 'react';
import ThemeContex from '../../../contexts/ThemeContext';
import getPageNumber from '../../../utils/get-page-number';
import NavigateArrow from '../navigate-arrow/NavigateArrow';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Pagination = ({ сlassName, page, endPageNumber, onChangePage }) => {
  const { isDarkTheme } = useContext(ThemeContex);

  const handleArrowNavigateButtonClick = (isDoubleArrow, isBackArrow) => {
    if (isDoubleArrow && isBackArrow && isLeftArrowNavigateButtonAvailable) {
      onChangePage(1);
    } else if (!isDoubleArrow && isBackArrow && isLeftArrowNavigateButtonAvailable) {
      onChangePage((prev) => prev - 1);
    } else if (!isDoubleArrow && !isBackArrow && isRightArrowNavigateButtonAvailable) {
      onChangePage((prev) => prev + 1);
    } else if (isDoubleArrow && !isBackArrow && isRightArrowNavigateButtonAvailable) {
      onChangePage(endPageNumber);
    }
  };

  const checkIsNumberNavigateButtonNotAvailable = (pageNumber) => pageNumber > endPageNumber;

  const checkIsNumberNavigateButtonActive = (pageNumber) => pageNumber === page;

  const handleNumberNavigateButtonClick = (pageNumber) => {
    return pageNumber <= endPageNumber ? onChangePage(pageNumber) : () => {};
  };

  const getNumbersOfPage = () => {
    const numbersOfPage = [
      getPageNumber(1, page, endPageNumber),
      getPageNumber(2, page, endPageNumber),
    ];

    if (endPageNumber > 2 || endPageNumber === 1) {
      numbersOfPage.push(getPageNumber(3, page, endPageNumber));
    }

    return numbersOfPage;
  };

  const leftArrowsNavigate = [
    { isDoubleArrow: true, back: true },
    { isDoubleArrow: false, back: true },
  ];
  const numbersOfPage = getNumbersOfPage();
  const rightArrowsNavigate = [
    { isDoubleArrow: false, back: false },
    { isDoubleArrow: true, back: false },
  ];

  const isLeftArrowNavigateButtonAvailable = page !== 1;
  const isLeftArrowNavigateButtonNotAvailable = !isLeftArrowNavigateButtonAvailable;

  const isRightArrowNavigateButtonAvailable = page !== endPageNumber;
  const isRightArrowNavigateButtonNotAvailable = !isRightArrowNavigateButtonAvailable;

  return (
    <ul
      className={cx(сlassName, 'pagination', {
        'pagination--dark': isDarkTheme,
      })}>
      {leftArrowsNavigate.map(({ isDoubleArrow, back }, index) => (
        <li
          className={cx('pagination__item', {
            'pagination__item--disabled': isLeftArrowNavigateButtonNotAvailable,
          })}
          onClick={() => handleArrowNavigateButtonClick(isDoubleArrow, back)}
          key={index}>
          <NavigateArrow isDoubleArrow={isDoubleArrow} back={back} />
        </li>
      ))}
      {numbersOfPage.map((pageNumber) => (
        <li
          className={cx('pagination__item', 'pagination__item--number', {
            'pagination__item--disabled': checkIsNumberNavigateButtonNotAvailable(pageNumber),
            'pagination__item--active': checkIsNumberNavigateButtonActive(pageNumber),
          })}
          key={pageNumber}
          onClick={() => handleNumberNavigateButtonClick(pageNumber)}>
          {pageNumber}
        </li>
      ))}
      {rightArrowsNavigate.map(({ isDoubleArrow, back }, index) => (
        <li
          className={cx('pagination__item', {
            'pagination__item--disabled': isRightArrowNavigateButtonNotAvailable,
          })}
          onClick={() => handleArrowNavigateButtonClick(isDoubleArrow, back)}
          key={index}>
          <NavigateArrow isDoubleArrow={isDoubleArrow} back={back} />
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
