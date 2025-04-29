import controller from '../controller/brand.controller';

describe('Brands', () => {
  describe('Fetch brands', () => {
    it('GET /brands', async () => {
      const res = await controller.getBrands();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    });
  });
  describe('Create brands', () => {
    let postBrand;
    const data = {
      name: 'Chucky Test Brand ' + Math.floor(Math.random() * 10000),
      description: 'Chucky Test Description',
    };

    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });

    it('POST /brands', async () => {
      expect(postBrand.statusCode).toEqual(200);
      expect(postBrand.body.name).toEqual(data.name);
      expect(postBrand.body).toHaveProperty('createdAt');
    });

    it('Schema Validation - Name is mandatory field', async () => {
      const data = {
        name: '',
        description: 'Chucky Test Description',
      };
      const res = await controller.postBrands(data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual('Name is required');
    });

    it('Schema Validation - Min character length for name > 1', async () => {
      const data = {
        name: 'a',
        description: 'Chucky Test Description',
      };
      const res = await controller.postBrands(data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual('Brand name is too short');
      // console.log(res.body);
    });

    it('Schema Validation - Max character length for name = 30', async () => {
      const data = {
        name: 'This is really, really long brand name',
      };
      const res = await controller.postBrands(data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual('Brand name is too long');
      // console.log(res.body);
    });

    it('Schema Validation - Description must be a string', async () => {
      const data = {
        name: 'Sample Brand',
        description: 123,
      };
      const res = await controller.postBrands(data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toEqual('Brand description must be a string');
      // console.log(res.body);
    });

    it('Bussiness Logic - Duplicate brand entries not allowed', async () => {
      //second request
      const res2 = await controller.postBrands(data);
      expect(res2.statusCode).toEqual(422);
      expect(res2.body.error).toContain(' already exists');
    });
  });
  describe('Fetch Individual Brand', () => {
    describe('GET /brands/:id', () => {
      let postBrand;

      beforeAll(async () => {
        const data = {
          name: 'Chucky Test Brand ' + Math.floor(Math.random() * 10000),
          description: 'Chucky Test Description',
        };
        postBrand = await controller.postBrands(data);
      });

      afterAll(async () => {
        await controller.deleteBrand(postBrand.body._id);
      });
      it('Business Logic - GET /brand/invalid_id should throw 404', async () => {
        // const res = await request.get(
        //   '/test/brands/' + '12348f0500b2931578c0a5ac'
        const res = await controller.getBrandsById('12348f0500b2931578c0a5ac');
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toContain('Brand not found.');
      });

      it('GET /brands/:id', async () => {
        const res = await controller.getBrandsById(postBrand.body._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(postBrand.body.name);
      });
    });
  });
  describe('Update brands.', () => {
    let postBrand;
    const data = {
      name: 'Chucky Test Brand ' + Math.floor(Math.random() * 10000),
      description: 'Chucky Test Description',
    };

    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });

    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });
    it('PUT /brands', async () => {
      const data = {
        name: postBrand.body.name + ' updated',
      };
      const res = await controller.putBrands(postBrand.body._id, data);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(data.name);
    });

    it('PUT /brands/invalid_id', async () => {
      const data = {
        name: ' updated',
      };
      const res = await controller.putBrands('123', data);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain('Unable to update brands');
    });
  });
  describe('Delete brands.', () => {
    let postBrand;
    const data = {
      name: 'Chucky Test Brand ' + Math.floor(Math.random() * 10000),
      description: 'Chucky Test Description',
    };
    beforeAll(async () => {
      postBrand = await controller.postBrands(data);
    });
    it('DELETE /brands/:id', async () => {
      const res = await controller.deleteBrand(postBrand.body._id);
      expect(res.statusCode).toEqual(200);
    });

    it('DELETE /brands/invalid_id', async () => {
      const res = await controller.deleteBrand(123);
      expect(res.statusCode).toEqual(422);
      expect(res.body.error).toContain('Unable to delete brand');
    });
  });
});
