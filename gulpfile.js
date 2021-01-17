const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const fileinclude = require("gulp-file-include");

const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");

const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");

const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

const scssPath = "app/assets/scss/**/*.scss";
const jsPath = "app/assets/js/*.js";
const htmlPath = "app/html/**/*.html";
const imagePath = "app/assets/images/**/*.+(png|jpg|gif|svg)";
const fontPath = "app/assets/fonts/**/*";

function images() {
  return gulp.src(imagePath)
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest("dist/images"));
}

function fonts() {
  return gulp.src(fontPath).pipe(gulp.dest("dist/fonts"));
}

function includeHTML() {
  return gulp
    .src(["app/html/*.html"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"));
}

function scss() {
  return gulp
    .src("app/assets/scss/main.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function js() {
  return gulp
    .src("app/assets/js/main.js")
    .pipe(gulpIf("*.js", uglify()))
    .pipe(gulp.dest("dist/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch(imagePath, gulp.series(images));
  gulp.watch(scssPath, gulp.series(scss));
  gulp.watch(fontPath, gulp.series(fonts));
  gulp.watch(jsPath, gulp.series(js));

  gulp.watch(htmlPath, gulp.series(includeHTML));
  gulp.watch(htmlPath).on('change', browserSync.reload);

}

exports.fonts = fonts;
exports.scss = scss;
exports.js = js;
exports.includeHTML = includeHTML;
exports.images = images;

exports.default = gulp.series(images, fonts, scss, includeHTML, js, watchTask);


