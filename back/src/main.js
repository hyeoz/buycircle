const dotenv = require('dotenv');
dotenv.config();

const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api'); // 라우터 모듈 불러오기
import jwtMiddleware from './lib/jwtMiddleware'; // 토큰 미들웨어 불러오기

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

app.use(bodyParser()); // bodyparser 사용

router.use('/api', api.default.routes()); // 라우터 모듈 사용

app.use(jwtMiddleware); // 토큰 사용

app.use(router.routes()).use(router.allowedMethods());

// 서버 구동
app.listen(PORT || 4000, () => {
  console.log(`Listening on port ${PORT || 4000}`);
});

// 가계부 기능 백엔드 완성하기!
