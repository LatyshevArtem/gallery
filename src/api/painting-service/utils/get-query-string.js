import qs from 'qs';

const getFormattedDate = (date) => {
  const dateWithoutWhitespaces = date.trim();
  let formattedDate = '';
  if (dateWithoutWhitespaces.length > 4) {
    formattedDate = String(dateWithoutWhitespaces.length);
  } else if (dateWithoutWhitespaces) {
    formattedDate = dateWithoutWhitespaces.padStart(4, '0');
  }
  return formattedDate;
};

const getQueryString = (filters) => {
  const { page, limit, name, authorId, locationId, dateFrom, dateBefore } = filters;
  const nameWithoutWhitespaces = name.trim();
  const isShouldCompareDateFromByLength = dateFrom.trim().length > 4;
  const formattedDateFrom = getFormattedDate(dateFrom);
  const isShouldCompareDateBeforeByLength = dateBefore.trim().length > 4;
  const formattedDateBefore = getFormattedDate(dateBefore);
  const queryString = qs.stringify(
    {
      _page: page,
      _limit: limit,
      name_like: nameWithoutWhitespaces || null,
      authorId: authorId || null,
      locationId: locationId || null,
      'created.length_gte': (isShouldCompareDateFromByLength && formattedDateFrom) || null,
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
