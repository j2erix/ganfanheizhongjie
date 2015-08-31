'use strict';

import express from 'express';
import fortune from './lib/fortune';
import hbs from 'express3-handlebars';
import formidable from 'formidable';
import credentials from './credentials';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import expressLogger from 'express-logger';
import cluster from 'cluster';

let app = express();
let handlebars = hbs.create({defaultLayout: 'main'});

app.set('port', process.env.PORT || 3000);

// 日志
// switch(app.get('evt')) {
//     case 'development':
//         app.use(morgan('dev'));
//         break;
//     case 'production':
//         app.use(expressLogger({
//             path: __dirname + '/log/requests.log'
//         }));
//         break;
// }

// 显示工作线程
// app.use((req, res, next) => {
//     if (cluster.isWorker) {
//         console.log('Worker %d received request', cluster.worker.id);
//     }
//     next();
// });

// cookie
app.use(cookieParser(credentials.cookieSecret));

// 引入handlebars引擎
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// app.set('view cache', true);
app.disable('x-powered-by');

// 测试页面
app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

// 访问监控
// app.use((req, res, next) => {
//     let arr = [req.ip, '=>', req.url, ' lang: ' , req.acceptedLanguages];
//     console.log(arr.join(' '));
//     next();
// });

// 静态资源
app.use(express.static(__dirname + '/public'));

// 路由
app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/about', (req, res) => {contest
//     res.render('about', {
//     	fortune: fortune.getFortune(),
//     	pageTestScript: '/test/tests-about.js'
//     });
// });

// app.get('/tours/hood-river', (req, res) => {
// 	res.render('tours/hood-river');
// });

// app.get('/tours/request-group-rate', (req, res) => {
// 	res.render('tours/request-group-rate');
// });

// app.get('/headers', (req, res) => {
//     res.set('Content-Type', 'text/plain');
//     let arr = [];
//     for (let name in req.headers)
//         arr.push(name + ': ' + req.headers[name] + '\n');
//     res.send(arr.join(''));
// });

// app.get('/download', (req, res) => {
//     res.download('public/img/hei-logo.png');
// });

// // 路由：文件上传
// app.get('/contest/vacation-photo', (req, res) => {
//     let now = new Date();
//     res.render('contest/vacation-photo', {
//         year: now.getFullYear(),
//         month: now.getMonth()
//     });
// });

// app.post('/contest/vacation-photo/:year/:month', (req, res) => {
//     let form = new formidable.IncomingForm();
//     form.parse(req, (err, fields, files) => {
//         if (err) return res.redirect(303, '/error');
//         console.log('received fields:');
//         console.log(fields);
//         console.log('received files:');
//         console.log(files);
//         res.redirect(303, '/thank-you');
//     });
// });

// app.get('/cookie', (req, res) => {
//     res.cookie('monster', 'nom nom');
//     res.cookie('signed_monster', 'nom nom', {signed: true});
//     res.send('set cookie');
// });

// 错误处理
app.get('/fail', (req, res) => {
    throw new Error('Nope!');
});

app.get('/epic-fail', (req, res) => {
    process.nextTick(() => {
        throw new Error('Kabbom!');
    });
});

// let tours = [
//     { id: 0, name: 'Hood River', price: 99.99 },
//     { id: 1, name: 'Oregon Coast', price: 149.95 },
// ];
// app.get('/api/tours', (req, res) => {
//     res.json(tours);
// });

// app.get('/api/query', (req, res) => {
//     res.json(req.query);
// });

// 404 catch-all处理器（中间件）
app.use((req, res) =>{ 
    res.status(404);
    res.render('404');
});

// 500错误处理器（中间件）
app.use((err, req, res) => { 
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// app.listen(app.get('port'), () => {
//      console.log( 'Express started on http://localhost:' +
//         app.get('port') + '; press Ctrl-C to terminate.' );
// });

let startServer = () => {
    app.listen(app.get('port'), () => {
        console.log('Express started in ' + app.get('env') + 
            ' mode on http://localhost:' + app.get('port') +
            '; press Ctrl + C to terminal.'); 
    });
};

if (require.main === module) {
    startServer(); 
} else {
    module.exports = startServer;
}