import { BASE_URL } from '../consts';

export default class LocationService {
  static async getLocations() {
    const response = await fetch(`${BASE_URL}/locations`);
    const locations = await response.json();
    return locations;
  }
}
