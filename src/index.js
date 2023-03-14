require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose');
const { connect } = require('mongoose');

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI} = process.env;

//기존
// mongoose.connect(MONGO_URI).then(() => {
//     console.log('mongoDb connect');
// }).catch(e => {
//     console.error(e)
// })

//connect not function version
connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected...');
}).catch((err) => {
    console.error(err);
});

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