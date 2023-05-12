import { BASE_URL } from '../../consts';

const authorsUrl = `${BASE_URL}/authors`;

export default class AuthorService {
  static async getAuthors() {
    const response = await fetch(authorsUrl);
    const authors = await response.json();
    return authors;
  }
}
