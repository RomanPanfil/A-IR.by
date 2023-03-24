// const autoPrefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const webp = require('gulp-webp');
const del = require('del');


let dist = "dist",
  app = "app";

let path = {
  build: {
    html: dist + "/",
    css: dist + "/css/",
    js: dist + "/js/",
    makingOrder: dist + "/js/",
    images: dist + "/images/",
    svg: dist + "/images/svg",
    popups: dist + "/popups/",
    fonts: dist + "/fonts/cofo/",
    media: dist + "/media/",
    webpImg: dist + "/images/",
    ajaxDist: dist + "/ajax/",
    htaccess: dist,
  },
  src: {
    html: app + "/*.html",
    css: app + "/css/*.scss",
    js: app + "/js/*.js",
    makingOrder: app + "/js/*.js",
    images: ["!app/images/svg/**/*", app + "/images/**/*.{gif,ico,webp,svg}"],
    svg: app + "/images/svg/*.svg",
    popups: app + "/popups/*.html",
    fonts: app + "/fonts/cofo/*",
    media: dist + "/media/*.{mp4}",
    webpImg: app + "/images/*.{jpg,png,jpeg}",
    ajaxDist: app + "/ajax/*.html",
    htaccess: app + "/.htaccess",
  },
  watch: {
    html: app + "/**/*.html",
    css: app + "/css/**/*.scss",
    js: app + "/js/**/*.js",
    makingOrder: app + "/js/**/*.js",
    // images: app + "/images/**/*.{jpg,png,gif,ico,webp}",
    images: ["!app/images/svg/**/*", app + "/images/**/*.{gif,ico,webp}"],
    svg: app + "/images/svg/*.svg",
    fonts: app + "/fonts/cofo/*",
    popups: app + "/popups/*.html",
    media: app + "/media/*.{mp4}",
    ajaxDist: dist + "/ajax/*.html",
    webpImg: app + "/images/**/*.{jpg, png, jpeg}",
  },
  clean: "./" + dist + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  // browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  scss = require("gulp-sass")(require("sass")),
  gcmq = require("gulp-group-css-media-queries"),
  svgSprite = require("gulp-svg-sprites"),
  autoprefixer = require("gulp-autoprefixer");


// function browserSync(params) {
//   browsersync.init({
//     server: {
//       baseDir: "./" + dist + "/",
//     },
//     port: 3000,
//     notify: false,
//   });
// }

function html() {
  return src(path.src.html).pipe(fileinclude()).pipe(dest(path.build.html));
  // .pipe(browsersync.stream());
}

function htaccess() {
  return src(path.src.htaccess, { dots: true })
    .pipe(dest(path.build.htaccess))
}

function css() {
  return src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(scss({ style: 'compact' }).on('error', scss.logError))
    .pipe(
      autoprefixer({
        // cascade: true,
        overrideBrowserslist: ["last 4 version"],
      })
    )
    // .pipe(gcmq())
    .pipe(minifyCss())
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(dest(path.build.css));
}

function js() {
  return src(['app/js/min.js', 'app/js/main.js'])
    .pipe(fileinclude())
    // .pipe (uglify ())
    .pipe(concat('main.js'))
    .pipe(dest(path.build.js));
  // .pipe(browsersync.stream());
}
function makingOrder() {
  return src(['app/js/making-order.js'])
    .pipe(fileinclude())
    // .pipe (uglify ())
    .pipe(concat('making-order.js'))
    .pipe(dest(path.build.js));
  // .pipe(browsersync.stream());
}

// export const makingOrder = () => {
//   return src(['app/js/making-order.js'])
//     .pipe(fileinclude())
//     // .pipe(uglify())
//     .pipe(concat('making-order.js'))
//     .pipe(dest(path.build.js));
// }

function imgWebp() {
  return src(path.src.webpImg)
  .pipe(webp(
    {
      quality: 60,
    }
  ))
  .pipe(dest(path.build.webpImg))
}

function fonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
}

function ajaxDist() {
  return src(path.src.ajaxDist).pipe(dest(path.build.ajaxDist));
}

function images() {
  return src(path.src.images).pipe(dest(path.build.images));
  // .pipe(browsersync.stream());
}
function popups() {
  return src(path.src.popups).pipe(fileinclude()).pipe(dest(path.build.popups));
  // .pipe(browsersync.stream());
}

function media() {
  return src(path.src.media).pipe(dest(path.build.media));
}


//   gulp.task('svgSprite', function () {
//     return gulp.src('app/images/svg/*.svg') // svg files for sprite
//         .pipe(svgSprite({
//                 mode: {
//                     stack: {
//                         sprite: "../symbols.svg"  //sprite file name
//                     }
//                 },
//             }
//         ))
//         .pipe(gulp.dest('dist/images/svg/'));
// });
function svg(cb) {
  return src(path.src.svg)
    .pipe(svgSprite({
      mode: 'symbols',
      svg: {
        svgPath: "../svg/svg/%f"
      }
    }))
    .pipe(dest("dist/svg"));

  cb();
}

const clean = async () => {
  return del.sync(dist);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.makingOrder], makingOrder);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.media], media);
  gulp.watch(path.watch.images, images);
  gulp.watch([path.watch.popups], popups);
  gulp.watch([path.watch.svg], svg);
  gulp.watch([path.watch.webpImg], imgWebp);
  gulp.watch([path.watch.ajaxDist], ajaxDist);

}

let build = gulp.series(
  clean,
  gulp.parallel(js, makingOrder, css, html, htaccess, ajaxDist, images, imgWebp, popups, fonts, media, svg)
);
let watch = gulp.parallel(build, watchFiles);
// let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.makingOrder = makingOrder;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
exports.media = media;
exports.popups = popups;
exports.svg = svg;
exports.imgWebp = imgWebp;
exports.htaccess = htaccess;
exports.ajaxDist = ajaxDist;
