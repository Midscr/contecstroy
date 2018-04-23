const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gutil = require('gulp-util');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');

const minify = composer(uglifyes, console);

let path = {
  build: {
    js: 'public/js/',
    css: 'public/stylesheets/',
    img: 'public/img/',
    fonts: 'public/fonts/'
  },
  src: {
    js: 'src/js/main.js',
    css: 'src/stylesheets/main.sass',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    pug: 'views/**/*.pug',
    js: 'src/js/**/*.js',
    css: 'src/stylesheets/**/*.sass',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './public'
};

gulp.task('js:build', function() {
  gulp
    .src(path.src.js)
    .pipe(rigger())
    // .pipe(sourcemaps.init())
    .pipe(minify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task('style:build', function() {
  gulp
    .src(path.src.css)
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer({ browsers: ['last 3 versions'] }))
    .pipe(cssmin())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task('image:build', function() {
  gulp
    .src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', ['js:build', 'style:build', 'fonts:build', 'image:build']);

gulp.task('watch', function() {
  gulp.watch(path.watch.pug).on('change', browserSync.reload);
  gulp.watch(path.watch.css, ['style:build']);
  gulp.watch(path.watch.js, ['js:build']);
  gulp.watch(path.watch.img, ['image:build']);
  gulp.watch(path.watch.fonts, ['fonts:build']);
});

gulp.task('serve', function() {
  browserSync.init({
    proxy: 'localhost:4400'
  });
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'serve', 'watch']);
