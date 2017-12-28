const gulp = require('gulp');
const RevAll = require('gulp-rev-all');
const clean = require('gulp-clean');
const qiniu = require('gulp-qiniu');
const qiniuConfig = require('config').qiniu;
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');

// gulp clean dist build rev pub-static

// ===== task clean =====
gulp.task('clean', () =>
  gulp.src([
    'dist',
    'build',
    'rev',
    '.server'
  ], {
    read: false,
  })
  .pipe(clean()));

// ===== task dist =====
gulp.task('dist', ['copy-views', 'copy-public', 'copy-scripts']);

gulp.task('copy-views', () =>
  gulp.src([
    'views/**/*.ejs'
  ], {
    base: './',
  })
  .pipe(gulp.dest('dist/')));

gulp.task('copy-public', () =>
  gulp.src([
    'public/**/*',
    '!public/**/*.less',
    '!public/dist/**/*'
  ], {
    base: './',
  })
  .pipe(gulp.dest('dist/')));

gulp.task('copy-scripts', () =>
  gulp.src([
    'public/scripts/**/*'
  ], {
    base: 'public/',
  })
  .pipe(gulp.dest('dist/')));

// ===== task build =====
gulp.task('build', ['min-script', 'min-image', 'min-html', 'copy-templates']);

gulp.task('min-script', () =>
  gulp.src('dist/scripts/**/*', {
    base: 'dist/',
  })
  .pipe(gulp.dest('build/'))
);

gulp.task('min-image', () =>
  gulp.src(['dist/public/images/**/*.{jpg,png,gif}'], {
    base: 'dist/public/',
  })
  .pipe(gulp.dest('build/'))
);
// 并没有压缩文件
gulp.task('min-html', () =>
  gulp.src([
    'dist/views/**/*.{ejs,html}'
  ], {
    base: 'dist/',
  })
  .pipe(htmlmin({
    minifyJS: true,
  }))
  .pipe(gulp.dest('build/')));

gulp.task('copy-templates', () =>
  gulp.src('public/**/*.html', {
    base: '.',
  })
  .pipe(gulp.dest('build/')));

// ===== task rev =====
gulp.task('rev', () => {
  const revAll = new RevAll({
    prefix: 'http://static.careerfrog.com.cn/cf-college/',
    dontRenameFile: [
      '.ejs',
      '.html',
      /\/scripts\/chunks\/.+\.js$/
    ],
    // dontUpdateReference: [
    //   // '.html'
    // ],
  });
  gulp.src([
      'build/**/*'
    ])
    .pipe(revAll.revision())
    .pipe(gulp.dest('rev'));
});

// ===== task pub-static =====
gulp.task('pub-static', () =>
  gulp.src([
    'rev/**/*',
    '!rev/**/*.{ejs,html}'
  ], {
    base: 'rev',
  })
  .pipe(qiniu({
    accessKey: qiniuConfig.access_key,
    secretKey: qiniuConfig.secret_key,
    bucket: 'careerfrog',
    private: false,
  }, {
    dir: '/cf-college/',
    concurrent: 10,
  }))
);

// ===== build-server =====
// gulp.task('build-server', () => gulp.src(
//     'rev/public/**/*.html', {
//       base: 'rev',
//     })
//   .pipe(gulp.dest('.'))
// );

// ===== build-server =====
gulp.task('build-server', ['copy-to-server'], () =>
  gulp.src([
    'bin/www',
    'app.js',
    'middlewares/**/*',
    'models/**/*.js',
    'routes/**/*',
    'services/**/*',
    'utils/**/*'
  ], {
    base: '.',
  })
  .pipe(babel({
    presets: ['babel-preset-node6'],
    plugins: ['transform-async-to-generator'],
  }))
  .pipe(gulp.dest('.server/')));

gulp.task('copy-to-server', () => {
  gulp.src([
      'package.json',
      'process.json',
      '.version.json',
      'config/**/*',
      'public/*',
      'rev/**/*.ejs'
    ], {
      base: '.',
    })
    .pipe(gulp.dest('.server/'));

  gulp.src(
      'rev/public/**/*.html', {
        base: 'rev',
      })
    .pipe(gulp.dest('.server/'));
});
