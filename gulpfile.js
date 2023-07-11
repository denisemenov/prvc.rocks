const gulp = require('gulp');
const fs = require('fs');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const cleanDist = require('gulp-clean');
const rename = require('gulp-rename');
const htmlMin = require('gulp-htmlmin');
const minify = require('gulp-minify');

function clean() {
  return gulp.src('./dist', { read: false }).pipe(cleanDist());
}

function style() {
  return gulp
    .src('./dev/scss/*.scss')
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
      })
    )
    .pipe(gulp.dest('./dist'));
}

function script() {
  return gulp
    .src('./dev/js/*.js')
    .pipe(
      minify({
        ext: {
          min: '.js',
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest('./dist'));
}

function build_index(cb) {
  return gulp
    .src('./dev/index.html')
    .pipe(replace('<style></style>', '<style>' + fs.readFileSync('./dist/styles.css', 'utf8') + '</style>'))
    .pipe(replace('<header></header>', fs.readFileSync('./dev/components/header_index.html', 'utf8')))
    .pipe(replace('<hola></hola>', fs.readFileSync('./dev/components/hola_index.html', 'utf8')))
    .pipe(replace('<about></about>', fs.readFileSync('./dev/components/about.html', 'utf8')))
    .pipe(replace('<important></important>', fs.readFileSync('./dev/components/important.html', 'utf8')))
    .pipe(replace('<manual></manual>', fs.readFileSync('./dev/components/manual_index.html', 'utf8')))
    .pipe(replace('<donate></donate>', fs.readFileSync('./dev/components/donate.html', 'utf8')))
    .pipe(replace('<script></script>', '<script>' + fs.readFileSync('./dist/script.js', 'utf8') + '</script>'))
    .pipe(
      htmlMin({
        caseSensitive: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
      })
    )
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
}

function build_download(cb) {
  return gulp
    .src('./dev/index.html')
    .pipe(replace('<style></style>', '<style>' + fs.readFileSync('./dist/styles.css', 'utf8') + '</style>'))
    .pipe(replace('<header></header>', fs.readFileSync('./dev/components/header_download.html', 'utf8')))
    .pipe(replace('<hola></hola>', fs.readFileSync('./dev/components/hola_download.html', 'utf8')))
    .pipe(replace('<about></about>', fs.readFileSync('./dev/components/about.html', 'utf8')))
    .pipe(replace('<important></important>', fs.readFileSync('./dev/components/important.html', 'utf8')))
    .pipe(replace('<manual></manual>', fs.readFileSync('./dev/components/manual_download.html', 'utf8')))
    .pipe(replace('<donate></donate>', fs.readFileSync('./dev/components/donate.html', 'utf8')))
    .pipe(replace('<script></script>', '<script>' + fs.readFileSync('./dist/script.js', 'utf8') + '</script>'))
    .pipe(
      htmlMin({
        caseSensitive: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
      })
    )
    .pipe(rename('download.html'))
    .pipe(gulp.dest('dist/'));
}

function build_404(cb) {
  return gulp
    .src('./dev/index.html')
    .pipe(replace('<style></style>', '<style>' + fs.readFileSync('./dist/styles.css', 'utf8') + '</style>'))
    .pipe(replace('<header></header>', fs.readFileSync('./dev/components/header_index.html', 'utf8')))
    .pipe(replace('<hola></hola>', fs.readFileSync('./dev/components/hola_404.html', 'utf8')))
    .pipe(replace('<about></about>', fs.readFileSync('./dev/components/about.html', 'utf8')))
    .pipe(replace('<important></important>', fs.readFileSync('./dev/components/important.html', 'utf8')))
    .pipe(replace('<manual></manual>', fs.readFileSync('./dev/components/manual_index.html', 'utf8')))
    .pipe(replace('<donate></donate>', fs.readFileSync('./dev/components/donate.html', 'utf8')))
    .pipe(replace('<script></script>', '<script>' + fs.readFileSync('./dist/script.js', 'utf8') + '</script>'))
    .pipe(
      htmlMin({
        caseSensitive: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        sortAttributes: true,
        sortClassName: true,
      })
    )
    .pipe(rename('404.html'))
    .pipe(gulp.dest('dist/'));
}

function watch() {
  return gulp.watch('./dev/**', gulp.series(style, script, gulp.parallel(build_index, build_download, build_404)));
}

exports.build = gulp.series(style, script, gulp.parallel(build_index, build_download, build_404));
exports.clean = clean;
exports.default = watch;
