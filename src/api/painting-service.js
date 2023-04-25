import { BASE_URL } from '../consts';

const paintingsUrl = `${BASE_URL}/paintings`;

export default class PaintingService {
  static async getPaintings(page, limit, name, authorId, locationId, dateFrom, dateBefore) {
    const queryByPage = `_page=${page}`;
    const queryByLimit = `_limit=${limit}`;
    const queryByName = name && `name_like=${name.trim()}`;
    const queryByAuthorId = authorId && `authorId=${authorId}`;
    const queryByLocationId = locationId && `locationId=${locationId}`;
    const queryByDateFrom = dateFrom && `created_gte=/d/${dateFrom.trim()}`;
    const queryByDateBefore = dateBefore && `created_lte=${dateBefore.trim()}`;

    const queryString = [
      queryByPage,
      queryByLimit,
      queryByName,
      queryByAuthorId,
      queryByLocationId,
      queryByDateFrom,
      queryByDateBefore,
    ]
      .filter((value) => value)
      .join('&');

    const response = await fetch(`${paintingsUrl}?${queryString}`);
    const paintings = await response.json();
    return paintings;
  }
}
