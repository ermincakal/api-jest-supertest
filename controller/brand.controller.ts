import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseUrl);

class brandController {
  getBrands() {
    return request.get('/brands');
  }
  getBrandsById(id: string) {
    return request.get('/brands/' + id);
  }
  postBrands(data: { [key: string]: string | number }) {
    return request.post('/brands').send(data);
  }
  putBrands(id: string, data: { [key: string]: string }) {
    return request.put('/brands/' + id).send(data);
  }
  deleteBrand(id: string | number) {
    return request.delete('/brands/' + id);
  }
}

export default new brandController();
