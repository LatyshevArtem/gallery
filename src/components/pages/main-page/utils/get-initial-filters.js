import qs from 'qs';

const LIMIT = 12;

const getInitialFilters = () => {
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const { page, name, authorId, locationId, dateFrom, dateBefore } = params;
  return {
    page: Number(page) || 1,
    limit: LIMIT,
    name: name || '',
    authorId: Number(authorId) || 0,
    locationId: Number(locationId) || 0,
    dateFrom: dateFrom || '',
    dateBefore: dateBefore || '',
  };
};

export { getInitialFilters };
