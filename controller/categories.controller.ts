import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

class CategoriesController {
  getCategories() {
    return request.get('/Categories');
  }
  getCategoriesById(id: string) {
    return request.get('/Categories/' + id);
  }
  postCategories(data: { [key: string]: string | number }) {
    return request.post('/Categories').send(data);
  }
  putCategories(id: string, data: { [key: string]: string }) {
    return request.put('/Categories/' + id).send(data);
  }
  deleteCategories(id: string | number) {
    return request.delete('/Categories/' + id);
  }
}

export default new CategoriesController();
