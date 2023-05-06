import cn from 'classnames/bind';
import RectangleSkeleton from '../../ui/reactangle-skeleton/RectangleSkeleton';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const PaintingsSectionSkeleton = ({ skeletonsLimit }) => {
  return (
    <ul className={cx('painting-list')}>
      {[...new Array(skeletonsLimit)].map((_, index) => (
        <li key={index}>
          <RectangleSkeleton rx={20} ry={20} />
        </li>
      ))}
    </ul>
  );
};

export default PaintingsSectionSkeleton;
