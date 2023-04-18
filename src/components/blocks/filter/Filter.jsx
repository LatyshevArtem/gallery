import cn from 'classnames/bind';
import { useState } from 'react';
import Input from '../../ui/input/Input';
import Select from '../../ui/select/Select';
import Range from '../../ui/range/Range';
import styles from './styles.module.scss';

import { authors } from '../../../mocks/authors';
import { locations } from '../../../mocks/locations';

const cx = cn.bind(styles);

const Filter = () => {
  const [paintingName, setPaintingName] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateBefore, setDateBefore] = useState('');

  return (
    <form className={cx('filter')} method="get">
      <label className="visually-hidden" htmlFor="name">
        Painting name
      </label>
      <Input
        className={cx('filter-option')}
        value={paintingName}
        onChange={setPaintingName}
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
        value={author}
        onChange={setAuthor}
      />
      <Select
        className={cx('filter-option')}
        title={'Location'}
        options={locations}
        optionName={'location'}
        value={location}
        onChange={setLocation}
      />
      <Range
        className={cx('filter-option')}
        title={'Created'}
        firstInputProps={{
          value: dateFrom,
          onChange: setDateFrom,
          name: 'date-from',
          id: 'date-from',
          placeholder: 'from',
        }}
        secondInputProps={{
          value: dateBefore,
          onChange: setDateBefore,
          name: 'date-before',
          id: 'date-before',
          placeholder: 'before',
        }}
      />
    </form>
  );
};

export default Filter;
