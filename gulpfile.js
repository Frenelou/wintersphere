var gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  injectPartials = require("gulp-inject-partials");

gulp.task("reload", function(done) {
  browserSync.reload();
  done();
});

gulp.task("html", function() {
  return gulp
    .src("./src/index.html")
    .pipe(injectPartials())
    .pipe(gulp.dest("./"));
});

// Static server
gulp.task('default', function() {
  gulp.watch(['src/index.html'], gulp.series('html'));
  gulp.watch(['src/partials/'], gulp.series('html'));
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: false,
    files: ['index.html',
      {match:'src/partials/*.html',
        fn: gulp.series('html')}

    ]
  });
});
