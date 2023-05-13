import cn from 'classnames/bind';
import PaintingCard from './painting-card/PaintingCard';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PaintingsSection = ({ paintings, authors, locations }) => {
  const authorsById = new Map();
  authors.forEach((author) => {
    authorsById.set(author.id, author.name);
  });

  const locationsById = new Map();
  locations.forEach((location) => {
    locationsById.set(location.id, location.location);
  });

  return (
    <section>
      {paintings && (
        <ul className={cx('painting-list')}>
          {paintings.map((painting) => (
            <li key={painting.id}>
              <PaintingCard
                {...painting}
                author={authorsById.get(painting.authorId)}
                location={locationsById.get(painting.locationId)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PaintingsSection;
