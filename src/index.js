require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT } = process.env;

const api = require('./api');

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

// app.listen(4000, () => {
//     console.log('listening to port 4000');
// });

const port = PORT || 4000;
app.listen(port, () => {
    console.log('Listening to port %d', port);
});