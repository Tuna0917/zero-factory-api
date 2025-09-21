// main.spec.ts
import { createApp } from './main';
import { INestApplication } from '@nestjs/common';

describe('Main bootstrap', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('앱을 생성할 수 있다', async () => {
    expect(app).toBeDefined();
  });
});
