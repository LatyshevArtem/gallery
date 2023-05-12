import { BASE_URL } from '../../consts';
import { getQueryString } from './utils/get-query-string';

const paintingsUrl = `${BASE_URL}/paintings`;

export default class PaintingService {
  static async getPaintings(filters) {
    const queryString = getQueryString(filters);
    const response = await fetch(`${paintingsUrl}${queryString}`);
    const paintings = await response.json();
    const paintingsTotalCount = response.headers.get('X-Total-Count');

    return {
      paintings,
      paintingsTotalCount,
    };
  }
}
