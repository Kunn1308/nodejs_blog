const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // route
    // app.get('/news', (req, res) => {
    //     res.render('news');
    // });
    app.use('/news', newsRouter);
    app.use('/', siteRouter);

    // app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('');
    // });
}

module.exports = route;
