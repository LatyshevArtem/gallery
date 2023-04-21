import cn from 'classnames/bind';
import getPageNumber from '../../../utils/get-page-number';
import NavigateArrow from '../navigate-arrow/NavigateArrow';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Pagination = ({ сlassName, page, endPageNumber, onChangePage }) => {
  const numbersOfPage = [
    getPageNumber(1, page, endPageNumber),
    getPageNumber(2, page, endPageNumber),
    getPageNumber(3, page, endPageNumber),
  ];

  return (
    <ul className={cx(сlassName, 'pagination')}>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': page === 1,
        })}
        onClick={page !== 1 ? () => onChangePage(1) : () => {}}>
        <NavigateArrow doubleArrow={true} back={true} />
      </li>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': page === 1,
        })}
        onClick={page !== 1 ? () => onChangePage((prev) => prev - 1) : () => {}}>
        <NavigateArrow back={true} />
      </li>
      {numbersOfPage.map((pageNumber) => (
        <li
          className={cx('pagination-item', 'pagination-item--number', {
            'pagination-item--active': pageNumber === page,
          })}
          key={pageNumber}
          onClick={() => onChangePage(pageNumber)}>
          {pageNumber}
        </li>
      ))}
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': page === endPageNumber,
        })}
        onClick={page !== endPageNumber ? () => onChangePage((prev) => prev + 1) : () => {}}>
        <NavigateArrow />
      </li>
      <li
        className={cx('pagination-item', {
          'pagination-item--disabled': page === endPageNumber,
        })}
        onClick={page !== endPageNumber ? () => onChangePage(endPageNumber) : () => {}}>
        <NavigateArrow doubleArrow={true} />
      </li>
    </ul>
  );
};

export default Pagination;
