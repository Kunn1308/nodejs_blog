const Course = require('../models/Course');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
class CourseController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses', { courses: multipleMongooseToObject(courses) });
            })
            .catch(next);
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        const FormData = req.body;
        FormData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/courses'))
            .catch(next);
    }
}

module.exports = new CourseController();
