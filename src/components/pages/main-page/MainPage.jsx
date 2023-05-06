import cn from 'classnames/bind';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import { useState, useEffect, useRef } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import AuthorService from '../../../api/author-service';
import LocationService from '../../../api/location-service';
import PaintingService from '../../../api/painting-service';
import PageWrapper from '../../layout/page-wrapper/PageWrapper';
import PageContent from '../../layout/page-content/PageContent';
import Header from '../../layout/header/Header';
import Filter from '../../blocks/filter/Filter';
import PaintingsSection from '../../blocks/paintings-section/PaintingsSection';
import PaintingsSectionSkeleton from '../../blocks/paintings-section/PaintingsSectionSkeleton';
import PaintingsNotFoundMessage from '../../ui/paintings-not-found-message/PaintingsNotFoundMessage';
import Pagination from '../../ui/pagination/Pagination';
import styles from './styles.module.scss';

const LIMIT = 12;

const cx = cn.bind(styles);

const MainPage = () => {
  const isComponentMounted = useComponentDidMount();

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    authorId: '',
    locationId: '',
    dateFrom: '',
    dateBefore: '',
  });
  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [paintings, setPaintings] = useState(null);
  const [paintingsTotalCount, setPaintingsTotalCount] = useState(0);
  const [arePaintingsLoading, setArePaintingsLoading] = useState(true);

  const didUserChangePageRef = useRef(false);

  const debouncedName = useDebounce(filters.name, 250);
  const debouncedDateFrom = useDebounce(filters.dateFrom, 250);
  const debouncedDateBefore = useDebounce(filters.dateBefore, 250);

  const endPageNumber = Math.ceil(paintingsTotalCount / LIMIT);

  const handleChangePage = (page) => {
    didUserChangePageRef.current = true;
    setPage(page);
  };

  const handleChangeName = (evt) => setFilters({ ...filters, name: evt.target.value });
  const handleChangeAuthorId = (authorId) => setFilters({ ...filters, authorId });
  const handleChangeLocationId = (locationId) => setFilters({ ...filters, locationId });
  const handleChangeDateFrom = (evt) => setFilters({ ...filters, dateFrom: evt.target.value });
  const handleChangeDateBefore = (evt) => setFilters({ ...filters, dateBefore: evt.target.value });

  const fetchAuthors = async () => {
    const authors = await AuthorService.getAuthors();
    setAuthors(authors);
  };

  const fetchLocations = async () => {
    const locations = await LocationService.getLocations();
    setLocations(locations);
  };

  const fetchPaintings = async () => {
    const timer = setTimeout(() => setArePaintingsLoading(true), 250);
    const pageToQuery = didUserChangePageRef.current ? page : 1;
    const { paintings, paintingsTotalCount } = await PaintingService.getPaintings(
      pageToQuery,
      LIMIT,
      debouncedName,
      filters.authorId,
      filters.locationId,
      debouncedDateFrom,
      debouncedDateBefore
    );
    setPaintings(paintings);
    setPaintingsTotalCount(paintingsTotalCount);
    clearTimeout(timer);
    setArePaintingsLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
    fetchLocations();
    fetchPaintings();
  }, []);

  useEffect(() => {
    if (isComponentMounted && didUserChangePageRef.current) {
      fetchPaintings();
    }
  }, [page]);

  useEffect(() => {
    if (isComponentMounted) {
      didUserChangePageRef.current = false;
      fetchPaintings();
      setPage(1);
    }
  }, [debouncedName, filters.authorId, filters.locationId, debouncedDateFrom, debouncedDateBefore]);

  return (
    <PageWrapper>
      <PageContent>
        <div className={cx('header-wrapper')}>
          <Header />
        </div>
        <div className={cx('filter-wrapper')}>
          <Filter
            {...filters}
            onChangeName={handleChangeName}
            authors={authors}
            onChangeAuthorId={handleChangeAuthorId}
            locations={locations}
            onChangeLocationId={handleChangeLocationId}
            onChangeDateFrom={handleChangeDateFrom}
            onChangeDateBefore={handleChangeDateBefore}
          />
        </div>
        <div className={cx('paintings-section-wrapper')}>
          {arePaintingsLoading ? (
            <PaintingsSectionSkeleton skeletonsLimit={LIMIT} />
          ) : paintings?.length > 0 ? (
            <PaintingsSection paintings={paintings} authors={authors} locations={locations} />
          ) : (
            paintings?.length === 0 && <PaintingsNotFoundMessage />
          )}
        </div>
        {paintings?.length > 0 && (
          <Pagination page={page} endPageNumber={endPageNumber} onChangePage={handleChangePage} />
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default MainPage;
