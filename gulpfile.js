var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  sourcemaps = require("gulp-sourcemaps"),
  cleanCSS = require("gulp-clean-css"),
  cache = require("gulp-cache"),
  mustache = require("gulp-mustache"),
  injectPartials = require("gulp-inject-partials");

gulp.task("reload", function(done) {
  cache.clearAll();
  browserSync.reload();
  done();
});

gulp.task("html", function() {
  return gulp.src("./src/index.html")
    .pipe(mustache('data.json',{},{}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("sass", function() {
  return (
    gulp
      .src("src/scss/styles.scss")
      .pipe(sass().on("error", sass.logError))
      // .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("dist/css/"))
  );
});

// Static server
gulp.task("default", function() {
  gulp.watch(
    ["src/index.html", "src/partials/"],
    gulp.series(["html"], ["reload"])
  );
  gulp.watch(["src/scss/*"], gulp.series(["sass"], ["reload"]));
  gulp.watch(["dist/js/scripts.js"], gulp.series("reload"));

  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: false,
    files: [
      "index.html",
      {
        match: "src/partials/*.html",
        fn: gulp.series([["reload"]])
      }
    ]
  });
});
