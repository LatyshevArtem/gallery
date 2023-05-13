import cn from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import useComponentDidMount from '../../../hooks/useComponentDidMount';
import { getInitialFilters } from './utils/get-initial-filters';
import useDebounce from '../../../hooks/useDebounce';
import { FilterNames } from './utils/consts';
import { getQueryStringFromFilters } from './utils/get-query-string-from-filters';
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

const cx = cn.bind(styles);

const MainPage = () => {
  const didUserNavigateThroughTheBrowserHistoryRef = useRef(false);
  const isComponentMounted = useComponentDidMount();

  const [filters, setFilters] = useState(getInitialFilters);
  const [authors, setAuthors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [paintings, setPaintings] = useState(null);
  const [paintingsTotalCount, setPaintingsTotalCount] = useState(0);
  const [arePaintingsLoading, setArePaintingsLoading] = useState(true);

  const debouncedName = useDebounce(filters.name, 250);
  const debouncedDateFrom = useDebounce(filters.dateFrom, 250);
  const debouncedDateBefore = useDebounce(filters.dateBefore, 250);

  const authorsNames = authors.map(({ name }) => name);
  const authorName = authors.find(({ id }) => id === filters.authorId)?.name || null;

  const locationsNames = locations.map(({ location }) => location);
  const locationName = locations.find(({ id }) => id === filters.locationId)?.location || null;

  const endPageNumber = Math.ceil(paintingsTotalCount / filters.limit);

  console.log({ authorName, locationName });

  const handleChangeFilters = (filterName, value) => {
    switch (filterName) {
      case FilterNames.Page: {
        setFilters((prevFilters) => ({ ...prevFilters, page: value }));
        break;
      }
      case FilterNames.Name: {
        setFilters((prevFilters) => ({ ...prevFilters, page: 1, name: value }));
        break;
      }
      case FilterNames.AuthorId: {
        const author = authors.find(({ name }) => name === value);
        const id = author?.id || 0;
        setFilters((prevFilters) => ({ ...prevFilters, page: 1, authorId: id }));
        break;
      }
      case FilterNames.LocationId: {
        const location = locations.find(({ location }) => location === value);
        const id = location?.id || 0;
        setFilters((prevFilters) => ({ ...prevFilters, page: 1, locationId: id }));
        break;
      }
      case FilterNames.DateFrom: {
        setFilters((prevFilters) => ({ ...prevFilters, page: 1, dateFrom: value }));
        break;
      }
      case FilterNames.DateBefore: {
        setFilters((prevFilters) => ({ ...prevFilters, page: 1, dateBefore: value }));
        break;
      }
      default: {
        break;
      }
    }
    didUserNavigateThroughTheBrowserHistoryRef.current = false;
  };

  const handleChangePage = (page) => handleChangeFilters(FilterNames.Page, page);
  const handleChangeName = (evt) => handleChangeFilters(FilterNames.Name, evt.target.value);
  const handleChangeAuthorId = (authorId) => handleChangeFilters(FilterNames.AuthorId, authorId);
  const handleChangeLocationId = (locationId) =>
    handleChangeFilters(FilterNames.LocationId, locationId);
  const handleChangeDateFrom = (evt) => handleChangeFilters(FilterNames.DateFrom, evt.target.value);
  const handleChangeDateBefore = (evt) =>
    handleChangeFilters(FilterNames.DateBefore, evt.target.value);

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
    const { paintings, paintingsTotalCount } = await PaintingService.getPaintings({
      ...filters,
      name: debouncedName,
      dateFrom: debouncedDateFrom,
      dateBefore: debouncedDateBefore,
    });
    setPaintings(paintings);
    setPaintingsTotalCount(paintingsTotalCount);
    clearTimeout(timer);
    setArePaintingsLoading(false);
  };

  useEffect(() => {
    const handler = (evt) => {
      const state = evt.state;
      if (state) {
        const { filters } = state;
        setFilters(filters);
        didUserNavigateThroughTheBrowserHistoryRef.current = true;
      }
    };

    window.addEventListener('popstate', handler);

    return () => window.removeEventListener('popstate', handler);
  }, []);

  useEffect(() => {
    fetchAuthors();
    fetchLocations();
    fetchPaintings();
  }, []);

  useEffect(() => {
    if (isComponentMounted) {
      fetchPaintings();
    }

    if (!didUserNavigateThroughTheBrowserHistoryRef.current) {
      const queryString = getQueryStringFromFilters(filters);
      const state = { filters };
      const unused = '';
      const root = '/';
      window.history.pushState(state, unused, queryString || root);
    }
  }, [
    filters.page,
    debouncedName,
    filters.authorId,
    filters.locationId,
    debouncedDateFrom,
    debouncedDateBefore,
  ]);

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
            authorsNames={authorsNames}
            authorName={authorName}
            onChangeAuthorId={handleChangeAuthorId}
            locationsNames={locationsNames}
            locationName={locationName}
            onChangeLocationId={handleChangeLocationId}
            onChangeDateFrom={handleChangeDateFrom}
            onChangeDateBefore={handleChangeDateBefore}
          />
        </div>
        <div className={cx('paintings-section-wrapper')}>
          {arePaintingsLoading ? (
            <PaintingsSectionSkeleton skeletonsLimit={filters.limit} />
          ) : paintings?.length > 0 ? (
            <PaintingsSection paintings={paintings} authors={authors} locations={locations} />
          ) : (
            paintings?.length === 0 && <PaintingsNotFoundMessage />
          )}
        </div>
        {paintings?.length > 0 && (
          <Pagination
            page={filters.page}
            endPageNumber={endPageNumber}
            onChangePage={handleChangePage}
          />
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default MainPage;
