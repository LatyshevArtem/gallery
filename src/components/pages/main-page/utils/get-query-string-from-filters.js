import qs from 'qs';

const getQueryStringFromFilters = (filters) => {
  const { page, name, authorId, locationId, dateFrom, dateBefore } = filters;
  const queryString = qs.stringify(
    {
      page: page !== 1 ? page : null,
      name: name || null,
      authorId: authorId || null,
      locationId: locationId || null,
      dateFrom: dateFrom || null,
      dateBefore: dateBefore || null,
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    }
  );

  return queryString;
};

export { getQueryStringFromFilters };
