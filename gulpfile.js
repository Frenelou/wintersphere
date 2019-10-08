var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  replace = require("gulp-replace"),
  browserSync = require("browser-sync").create(),
  sourcemaps = require("gulp-sourcemaps"),
  cache = require("gulp-cache"),
  autoprefixer = require("gulp-autoprefixer"),
  mustache = require("gulp-mustache"),
  yargs = require("yargs"),
  fs = require("fs"),
  argv = require("yargs").argv,
  ressourcesPath = "https://assets.scott-sports.com/pages/wintersphere_2019/";

gulp.task("reload", function(done) {
  cache.clearAll();
  browserSync.reload();
  done();
});

gulp.task("html", function() {
  return gulp
    .src(["./src/index.html", "./src/partials/index.mustache"])
    .pipe(mustache("data.json", {}, {}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("del", function(done) {
  fs.unlinkSync(`src/partials/${argv.n}.mustache`);
  fs.unlinkSync(`src/js/${argv.n}.js`);
  fs.unlinkSync(`src/scss/_${argv.n}.scss`);
  fs.readFile("src/scss/styles.scss", "utf8", function(err, data) {
    var result = data.replace(`@import \'${argv.n}\';`, "");
    fs.writeFileSync("src/scss/styles.scss", result, "utf8");
  });
  fs.readFile("src/js/setup.js", "utf8", function(err, data) {
    var result = data.replace(`  ${argv.n}.setup();`, '');
    fs.writeFileSync("src/js/setup.js", result, "utf8");
  });
  fs.readFile("src/partials/index.mustache", "utf8", function(err, data) {
    var result = data.replace(`{{> ${argv.n} }}`, '');
    fs.writeFileSync("src/partials/index.mustache", result, "utf8");
  });
  return done();
});

gulp.task("new", function(done) {
  fs.writeFileSync(`src/partials/${argv.n}.mustache`, "");
  fs.writeFileSync(`src/scss/_${argv.n}.scss`, `#${argv.n}{\n\n}`);
  fs.appendFileSync("src/scss/styles.scss", `@import \'${argv.n}\';`);
  fs.appendFileSync("src/partials/index.mustache", `{{> ${argv.n} }}`);
  fs.readFile("src/js/setup.js", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace('});', `  ${argv.n}.setup();\n});`);

    fs.writeFile("src/js/setup.js", result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
  fs.writeFileSync(
    `src/js/${argv.n}.js`,
    `var ${argv.n} = {
    setup: function() {
      this.doThis();
    },
    doThis: function() {

    }
  };`
  );

  return done();
});

gulp.task("js", function() {
  return gulp
    .src([
      "src/js/plugins/TweenMax.min.js",
      "src/js/ScrollMagic.js",
      "src/js/plugins/animation.gsap.js",
      // "src/js/plugins/animation.velocity.js",
      // "src/js/plugins/jquery.ScrollMagic.js",
      "src/js/scrollMagicAnimation.js",
      "src/js/showMore.js",
      "src/js/newsletter.js",
      "src/js/video.js",
      "src/js/backToTop.js",
      "src/js/setup.js"
    ])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("dist/js/"));
});

gulp.task("buildChangePath", function() {
  return gulp
    .src(["dist/index.mustache", "dist/css/styles.css", "dist/js/scripts.js"])
    .pipe(replace("../wintersphere-19-mkt-page-02v04-assets/", ressourcesPath))
    .pipe(replace("&#x2F;", "/"))
    .pipe(replace("wintersphere-19-mkt-page-02v04-assets/", ressourcesPath))
    .pipe(replace("{{> ", "{{> ../src/partials/"))
    .pipe(gulp.dest("./prod/"));
});

gulp.task("build", gulp.series(["html"], ["buildChangePath"]));

gulp.task("sass", function() {
  return (
    gulp
      .src("src/scss/styles.scss")
      .pipe(sass().on("error", sass.logError))
      // .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(gulp.dest("dist/css/"))
  );
});

// Static server
gulp.task("default", function() {
  gulp.watch(
    ["src/index.html", "src/partials/", "data.json"],
    gulp.series(["html"], "buildChangePath", ["reload"])
  );
  gulp.watch(
    ["src/scss/*"],
    gulp.series(["sass"], "buildChangePath", ["reload"])
  );
  gulp.watch(
    ["src/js/*.js"],
    gulp.series(["js"], ["buildChangePath", "reload"])
  );

  browserSync.init({
    server: {
      baseDir: "./dist/",
      routes: {
        "/de/de": "./dist/",
        "/gb/en": "./dist/",
        "/es/es": "./dist/",
        "/fr/fr": "./dist/",
        "/it/it": "./dist/",
        "/cz/cs": "./dist/",
        "": "./"
      }
    },
    open: false,
    host: "localhost",
    files: [
      "index.html",
      {
        match: "src/partials/*.html",
        fn: gulp.series([["reload"]])
      }
    ]
  });
});
