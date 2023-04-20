import cn from 'classnames/bind';
import useMatchMedia from '../../../hooks/useMatchMedia';
import getImageSizeByScreen from '../../../utils/get-image-size';
import { BASE_URL } from '../../../consts';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PAINTING_CARD_SIZES = {
  mobile: {
    width: 280,
    height: 205,
  },
  tablet: {
    width: 340,
    height: 249,
  },
  bigTablet: {
    width: 300,
    height: 230,
  },
  desktop: {
    width: 360,
    height: 275,
  },
};

const PaintingCard = ({ imageUrl, name, author, created, location }) => {
  const screens = useMatchMedia();
  const { width, height } = getImageSizeByScreen(PAINTING_CARD_SIZES, screens);

  return (
    <figure className={cx('painting-container')}>
      <img
        className={cx('painting')}
        src={BASE_URL + imageUrl}
        width={width}
        height={height}
        alt={`Painting by ${author}: ${name}. Date of painting: ${created}. Currently located in ${location}.`}
      />
      <figcaption className={cx('figcaption')}>
        <cite className={cx('painting-name')}>{name}</cite>
        <dl className={cx('painting-data-list')}>
          <div className={cx('painting-data-item')}>
            <dt className={cx('painting-data-name', 'author-name')}>Author:</dt>
            <dd className={cx('painting-data-value')}>{author}</dd>
          </div>
          <div className={cx('painting-data-item')}>
            <dt className={cx('painting-data-name')}>Created:</dt>
            <dd className={cx('painting-data-value')}>
              <time dateTime={created}>{created}</time>
            </dd>
          </div>
          <div className={cx('painting-data-item')}>
            <dt className={cx('painting-data-name')}>Location:</dt>
            <dd className={cx('painting-data-value')}>{location}</dd>
          </div>
        </dl>
      </figcaption>
    </figure>
  );
};

export default PaintingCard;
