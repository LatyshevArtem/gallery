import cn from 'classnames/bind';
import PaintingCard from '../../ui/painting-card/PaintingCard';
import styles from './styles.modules.scss';

const cx = cn.bind(styles);

const PaintingsSection = ({ paintings }) => {
  return (
    <section>
      {paintings && (
        <ul className={cx('painting-list')}>
          {paintings.map((painting) => (
            <li>
              <PaintingCard {...painting} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PaintingsSection;
