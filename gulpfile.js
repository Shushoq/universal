const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const fs = require('fs');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const tiny = require('gulp-tinypng-compress');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');

const svgSprites = () => {
  return src('./src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('./app/img'));
}

const styles = () => {
  return src('./src/sass/**/*.+(scss|sass|css)')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
}

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileinclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
}

const fonts = () => {
  return src('./src/fonts/**/*')
    .pipe(dest("./app/fonts"))
    .pipe(browserSync.stream());
}

const imgToApp = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/*.svg'])
    .pipe(dest('./app/img'))
}

const resources = () => {
  return src('./src/resources/**')
    .pipe(dest('./app'))
}

const clean = () => {
  return del(['app/*'])
}

const scripts = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      },
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })

    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });

  watch('./src/sass/**/*.+(scss|sass|css)', styles);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/img/**.{jpg,jpeg,png,gif,webp,svg}', imgToApp);
  watch('./src/img/svg/**.svg', svgSprites);
  watch('./src/resources/**', resources);
  watch('./src/js/**/*.js', scripts);
  watch('./src/fonts/**', fonts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.scripts = scripts;
exports.fileinclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites), styles, watchFiles);


// BUILD

const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(tiny({
      key: 'xWsCqLVvKDH9SV354RKKrl9sQ963msGt',
      parallel: true,
      parallelMax: 50,
      log: true,
    }))
    .pipe(dest('./app/img'))
}

const stylesBuild = () => {
  return src('./src/sass/**/*.+(scss|sass|css)')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      mode: 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      },
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest('./app/js'))
}

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, resources, imgToApp, svgSprites), stylesBuild, tinypng);


// deploy
const deploy = () => {
  let conn = ftp.create({
    host: '',
    user: '',
    password: '',
    parallel: 10,
    log: gutil.log
  });

  let globs = [
    'app/**',
  ];

  return src(globs, {
      base: './app',
      buffer: false
    })
    .pipe(conn.newer('')) // only upload newer files
    .pipe(conn.dest(''));
}

exports.deploy = deploy;
