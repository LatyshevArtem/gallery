import cn from 'classnames/bind';
import { useState, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import AuthorService from '../../../api/author-service';
import LocationService from '../../../api/location-service';
import PaintingService from '../../../api/painting-service';
import PageWrapper from '../../layout/page-wrapper/PageWrapper';
import PageContent from '../../layout/page-content/PageContent';
import Header from '../../layout/header/Header';
import Filter from '../../blocks/filter/Filter';
import PaintingsSection from '../../blocks/paintings-section/PaintingsSection';
import Pagination from '../../ui/pagination/Pagination';
import styles from './styles.module.scss';

const LIMIT = 12;

const cx = cn.bind(styles);

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [authors, setAuthors] = useState([]);
  const [authorId, setAuthorId] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateBefore, setDateBefore] = useState('');
  const [paintings, setPaintings] = useState([]);
  const [paintingsTotalCount, setPaintingsTotalCount] = useState(0);

  const debouncedName = useDebounce(name, 250);
  const debouncedDateFrom = useDebounce(dateFrom, 250);
  const debouncedDateBefore = useDebounce(dateBefore, 250);

  const endPageNumber = Math.ceil(paintingsTotalCount / LIMIT);

  const fetchAuthors = async () => {
    const authors = await AuthorService.getAuthors();
    setAuthors(authors);
  };

  const fetchLocations = async () => {
    const locations = await LocationService.getLocations();
    setLocations(locations);
  };

  const fetchPaintings = async () => {
    const { paintings, paintingsTotalCount } = await PaintingService.getPaintings(
      page,
      LIMIT,
      debouncedName,
      authorId,
      locationId,
      debouncedDateFrom,
      debouncedDateBefore
    );
    setPaintings(paintings);
    setPaintingsTotalCount(parseInt(paintingsTotalCount));
  };

  useEffect(() => {
    fetchAuthors();
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchPaintings();
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchPaintings();
  }, [debouncedName, authorId, locationId, debouncedDateFrom, debouncedDateBefore]);

  return (
    <PageWrapper>
      <PageContent>
        <div className={cx('header-wrapper')}>
          <Header />
        </div>
        <div className={cx('filter-wrapper')}>
          <Filter
            name={name}
            onChangeName={setName}
            authors={authors}
            authorId={authorId}
            onChangeAuthorId={setAuthorId}
            locations={locations}
            locationId={locationId}
            onChangeLocationId={setLocationId}
            dateFrom={dateFrom}
            onChangeDateFrom={setDateFrom}
            dateBefore={dateBefore}
            onChangeDateBefore={setDateBefore}
          />
        </div>
        <div className={cx('paintings-section-wrapper')}>
          <PaintingsSection paintings={paintings} authors={authors} locations={locations} />
        </div>
        <Pagination page={page} endPageNumber={endPageNumber} onChangePage={setPage} />
      </PageContent>
    </PageWrapper>
  );
};

export default MainPage;
