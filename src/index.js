const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

app.use(methodOverride('_method'));
app.use(SortMiddleware);

//connect to db
db.connect();
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//http logger
// app.use(morgan('combined'))

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (filed, sort) => {
                const sortType = filed === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-up-wide-short',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${filed}&type=${type}">
                <i class="${icon}"></i>
            </a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
