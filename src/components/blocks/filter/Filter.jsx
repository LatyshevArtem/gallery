import cn from 'classnames/bind';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Range from '../../ui/range/Range';
import styles from './styles.module.scss';

const cx = cn.bind(styles);

const Filter = ({
  name,
  onChangeName,
  authors,
  authorId,
  onChangeAuthorId,
  locations,
  locationId,
  onChangeLocationId,
  dateFrom,
  onChangeDateFrom,
  dateBefore,
  onChangeDateBefore,
}) => {
  return (
    <form className={cx('filter')} method="get">
      <label className="visually-hidden" htmlFor="name">
        Painting name
      </label>
      <Input
        className={cx('filter-option')}
        value={name}
        onChange={onChangeName}
        type="text"
        id="name"
        name="name"
        placeholder="Name"
      />
      <Select
        className={cx('filter-option')}
        title={'Author'}
        options={authors}
        optionName={'name'}
        value={authorId}
        onChange={onChangeAuthorId}
      />
      <Select
        className={cx('filter-option')}
        title={'Location'}
        options={locations}
        optionName={'location'}
        value={locationId}
        onChange={onChangeLocationId}
      />
      <Range
        className={cx('filter-option')}
        title={'Created'}
        firstInputProps={{
          value: dateFrom,
          onChange: onChangeDateFrom,
          name: 'date-from',
          id: 'date-from',
          placeholder: 'from',
        }}
        secondInputProps={{
          value: dateBefore,
          onChange: onChangeDateBefore,
          name: 'date-before',
          id: 'date-before',
          placeholder: 'before',
        }}
      />
    </form>
  );
};

export default Filter;
