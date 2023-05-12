import qs from 'qs';

const getFormattedDateBefore = (dateBefore) => {
  const dateBeforeWithoutWhitespaces = dateBefore.trim();
  let formattedDateBefore = '';
  if (dateBeforeWithoutWhitespaces.length > 4) {
    formattedDateBefore = String(dateBeforeWithoutWhitespaces.length);
  } else if (dateBeforeWithoutWhitespaces) {
    formattedDateBefore = dateBeforeWithoutWhitespaces.padStart(4, '0');
  }
  return formattedDateBefore;
};

const getFormattedDateFrom = (dateFrom) => {
  const dateFromWithoutWhitespaces = dateFrom.trim();
  let formattedDateFrom = '';
  if (dateFromWithoutWhitespaces) {
    formattedDateFrom = dateFromWithoutWhitespaces.padStart(4, '0');
  }
  return formattedDateFrom;
};

const getQueryString = (filters) => {
  const { page, limit, name, authorId, locationId, dateFrom, dateBefore } = filters;
  const nameWithoutWhitespaces = name.trim();
  const formattedDateFrom = getFormattedDateFrom(dateFrom);
  const isShouldCompareDateBeforeByLength = dateBefore.trim().length > 4;
  const formattedDateBefore = getFormattedDateBefore(dateBefore);
  const queryString = qs.stringify(
    {
      _page: page,
      _limit: limit,
      name_like: nameWithoutWhitespaces || null,
      authorId: authorId || null,
      locationId: locationId || null,
      created_gte: formattedDateFrom || null,
      'created.length_lte': (isShouldCompareDateBeforeByLength && formattedDateBefore) || null,
      created_lte: formattedDateBefore || null,
    },
    {
      addQueryPrefix: true,
      skipNulls: true,
    }
  );

  return queryString;
};

export { getQueryString };
