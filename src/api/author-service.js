import { BASE_URL } from '../consts';

export default class AuthorService {
  static async getAuthors() {
    const response = await fetch(`${BASE_URL}/authors`);
    const authors = await response.json();
    return authors;
  }
}
