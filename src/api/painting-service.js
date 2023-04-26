import { BASE_URL } from '../consts';

const paintingsUrl = `${BASE_URL}/paintings`;

const getQueryByPage = (page) => `_page=${page}`;

const getQueryByLimit = (limit) => `_limit=${limit}`;

const getQueryByName = (name) => {
  const formattedName = name.trim();
  return formattedName && `name_like=${new RegExp(`^${formattedName}`, 'ig')}`;
};

const getQueryByAuthorId = (authorId) => authorId && `authorId=${authorId}`;

const getQueryByLocationId = (locationId) => locationId && `locationId=${locationId}`;

const getQueryByDateFrom = (dateFrom) => {
  const formattedDateFrom = dateFrom.trim();
  return formattedDateFrom && `created_gte=${formattedDateFrom.padStart(4, '0')}`;
};

const getQueryByDateBefore = (dateBefore) => {
  const formattedDateBefore = dateBefore.trim();
  return (
    formattedDateBefore &&
    (formattedDateBefore.length > 4
      ? `created.length_lte=${formattedDateBefore.length}`
      : `created_lte=${formattedDateBefore.padStart(4, '0')}`)
  );
};

const getFullQuery = (...queries) => queries.filter((query) => query).join('&');

export default class PaintingService {
  static async getPaintings(page, limit, name, authorId, locationId, dateFrom, dateBefore) {
    const queryByPage = getQueryByPage(page);
    const queryByLimit = getQueryByLimit(limit);
    const queryByName = getQueryByName(name);
    const queryByAuthorId = getQueryByAuthorId(authorId);
    const queryByLocationId = getQueryByLocationId(locationId);
    const queryByDateFrom = getQueryByDateFrom(dateFrom);
    const queryByDateBefore = getQueryByDateBefore(dateBefore);

    const queryString = getFullQuery(
      queryByPage,
      queryByLimit,
      queryByName,
      queryByAuthorId,
      queryByLocationId,
      queryByDateFrom,
      queryByDateBefore
    );

    const response = await fetch(`${paintingsUrl}?${queryString}`);
    const paintings = await response.json();
    const paintingsTotalCount = response.headers.get('X-Total-Count');

    return {
      paintings,
      paintingsTotalCount,
    };
  }
}
