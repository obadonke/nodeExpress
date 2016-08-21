const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');

gulp.task('style', function () {
    return gulp.src(['*.js', 'src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});


gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public'
    };
    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        ignore: ['.git', '/public/lib'],
        ext: 'js html',
        verbose: true
    };

    return nodemon(options)
        .on('restart', function () {
            console.log('Restarting...');
        });
});
