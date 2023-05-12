import { BASE_URL } from '../../consts';

const locationsUrl = `${BASE_URL}/locations`;

export default class LocationService {
  static async getLocations() {
    const response = await fetch(locationsUrl);
    const locations = await response.json();
    return locations;
  }
}
