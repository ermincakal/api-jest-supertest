import controller from '../controller/upload.controller';

//describe blocks are not allowed to be async because Jest executes them sequentially to create the test
// structure before actually running the tests (including e.g. skip, only, beforeAll, afterEach, ...

describe('Upload File', () => {
  it('POST /upload/single', async () => {
    const res = await controller.postUploadSingle('data/wallpaperflare.jpg');
    console.log(res.body);
    expect(res.body.filename).toEqual('wallpaperflare.jpg');
    expect(res.statusCode).toBe(200);
  });
  it('POST /upload/multiple', async () => {
    const files = ['data/wallpaper.jpg', 'data/wallpaperflare.jpg'];
    const res = await controller.postUplaodMultiple(files);
    expect(res.body.length).toBe(2);
    expect(res.body[0].filename).toEqual('wallpaper.jpg');
    expect(res.body[1].filename).toEqual('wallpaperflare.jpg');

    expect(res.statusCode).toBe(200);
  });
});
