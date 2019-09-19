var gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  replace = require("gulp-replace"),
  browserSync = require("browser-sync").create(),
  sourcemaps = require("gulp-sourcemaps"),
  cleanCSS = require("gulp-clean-css"),
  cache = require("gulp-cache"),
  mustache = require("gulp-mustache"),
  injectPartials = require("gulp-inject-partials"),
  ressourcesPath = "https://assets.scott-sports.com/pages/wintersphere_2019/";

gulp.task("reload", function(done) {
  cache.clearAll();
  browserSync.reload();
  done();
});

gulp.task("html", function() {
  return gulp
    .src(["./src/index.html","./src/partials/index.mustache"])
    .pipe(mustache("data.json", {}, {}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("buildChangePath", function() {
  return gulp
    .src(["dist/index.mustache", "dist/css/styles.css"])
    .pipe(replace("../wintersphere-19-mkt-page-02v04-assets/", ressourcesPath))
    .pipe(replace("&#x2F;", "/"))
    .pipe(replace("wintersphere-19-mkt-page-02v04-assets/", ressourcesPath))
    .pipe(replace("{{> ", '{{> ../src/partials/'))
    .pipe(gulp.dest("./prod/"));
});

gulp.task("build", gulp.series(['html'],['buildChangePath']));

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
    gulp.series(["html"], 'buildChangePath', ["reload"])
  );
  gulp.watch(["src/scss/*"], gulp.series(["sass"], 'buildChangePath', ["reload"]));
  gulp.watch(["dist/js/scripts.js"], gulp.series(['buildChangePath',"reload"]));

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
