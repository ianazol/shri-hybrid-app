const gulp = require('gulp'),
    watch = require('gulp-watch'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    webpackStream = require("webpack-stream"),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber');

const path = {
    build: {
        css: 'www/css/',
        js: 'www/'
    },
    src: {
        css: 'src/css/*.css',
        js: 'src/**/*.js',
    },
    watch: {
        css: 'src/css/**/*.scss',
        js: 'src/**/*.js'
    }
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('style', function () {
    return gulp.src(path.src.css)
        .pipe(concat('styles.css'))
        .pipe(csso())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('webpack', function(){
    let options = {
        context: __dirname + '/src',
        entry: {
            main: `./index`
        },
        output: {
            path: __dirname + '/www',
            filename: "bundle.js"
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    include: __dirname + "/node_modules/react-onsenui/src/",
                    query: {
                        presets: ['react', 'es2015']
                    }
                },
                {
                    test:    /\.js$/,
                    include: __dirname + "/src",
                    loader:  'babel?presets[]=es2015'
                }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(webpackStream(options, null))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('watch', function() {
    watch([path.watch.css], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('webpack');
    });
});

gulp.task('default', ['webpack', 'style', 'watch']);