'use strict';

import express from 'express';
import fortune from './lib/fortune';
import hbs from 'express3-handlebars';

let app = express();
let handlebars = hbs.create({defaultLayout: 'main'});

app.set('port', process.env.PORT || 3000);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// 测试页面
app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

// 静态资源
app.use(express.static(__dirname + '/public'));

// 路由
app.get('/', (req, res) => { 
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {
    	fortune: fortune.getFortune(),
    	pageTestScript: '/test/tests-about.js'
    });
});

app.get('/tours/hood-river', (req, res) => {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
	res.render('tours/request-group-rate');
});

// 404 catch-all处理器（中间件）
app.use((req, res, next) =>{ 
    res.status(404);
    res.render('404');
});

// 500错误处理器（中间件）
app.use((err, req, res, next) => { 
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
     console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});