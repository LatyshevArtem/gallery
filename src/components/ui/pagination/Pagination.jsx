import cn from 'classnames/bind';
import getPageNumber from '../../../utils/get-page-number';
import NavigateArrow from '../navigate-arrow/NavigateArrow';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Pagination = ({ сlassName, page, endPageNumber, onChangePage }) => {
  const handleArrowNavigateButtonClick = (isDoubleArrow, isForwardArrow) => {
    if (isDoubleArrow && !isForwardArrow && isLeftArrowNavigateButtonAvailable) {
      onChangePage(1);
    } else if (!isDoubleArrow && !isForwardArrow && isLeftArrowNavigateButtonAvailable) {
      onChangePage((prev) => prev - 1);
    } else if (!isDoubleArrow && isForwardArrow && isRightArrowNavigateButtonAvailable) {
      onChangePage((prev) => prev + 1);
    } else if (isDoubleArrow && isForwardArrow && isRightArrowNavigateButtonAvailable) {
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

  const numbersOfPage = getNumbersOfPage();

  const isLeftArrowNavigateButtonAvailable = page !== 1;
  const isLeftArrowNavigateButtonNotAvailable = !isLeftArrowNavigateButtonAvailable;

  const isRightArrowNavigateButtonAvailable = page !== endPageNumber;
  const isRightArrowNavigateButtonNotAvailable = !isRightArrowNavigateButtonAvailable;

  return (
    <ul className={cx(сlassName, 'pagination')}>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': isLeftArrowNavigateButtonNotAvailable,
        })}
        onClick={() => handleArrowNavigateButtonClick(true, false)}>
        <NavigateArrow doubleArrow={true} back={true} />
      </li>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': isLeftArrowNavigateButtonNotAvailable,
        })}
        onClick={() => handleArrowNavigateButtonClick(false, false)}>
        <NavigateArrow back={true} />
      </li>
      {numbersOfPage.map((pageNumber) => (
        <li
          className={cx('pagination-item', 'pagination-item--number', {
            'pagination-item--disabled': checkIsNumberNavigateButtonNotAvailable(pageNumber),
            'pagination-item--active': checkIsNumberNavigateButtonActive(pageNumber),
          })}
          key={pageNumber}
          onClick={() => handleNumberNavigateButtonClick(pageNumber)}>
          {pageNumber}
        </li>
      ))}
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': isRightArrowNavigateButtonNotAvailable,
        })}
        onClick={() => handleArrowNavigateButtonClick(false, true)}>
        <NavigateArrow />
      </li>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': isRightArrowNavigateButtonNotAvailable,
        })}
        onClick={() => handleArrowNavigateButtonClick(true, true)}>
        <NavigateArrow doubleArrow={true} />
      </li>
    </ul>
  );
};

export default Pagination;
