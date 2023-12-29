const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

const files = {
    src: ['./lib/**/*.js'],
    test: ['./test/**/*.spec.js', './*.js'],
    testTs: ['./test/**/*.spec.ts']
};
gulp.task('dot', () => gulp.src(files.test, { read: false }).pipe(mocha({ reporter: 'dot' })));

gulp.task('test', gulp.series('dot'));

gulp.task('test:ts', () =>
    gulp.src(files.testTs, { read: false }).pipe(mocha({ reporter: 'dot', require: 'ts-node/register' }))
);

gulp.task('spec', () => gulp.src(files.test, { read: false }).pipe(mocha({ reporter: 'spec' })));

gulp.task('spec:ts', () => gulp.src(files.testTs, { read: false }).pipe(mocha({ reporter: 'spec' })));

gulp.task('coverage', (done) => {
    gulp.src(files.src)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', () => {
            gulp.src(files.test)
                .pipe(mocha({ reporter: 'dot' }))
                .pipe(
                    istanbul.writeReports({
                        dir: './coverage',
                        reporters: ['lcov', 'json', 'html'],
                        reportOpts: { dir: './coverage' }
                    })
                )
                .on('end', done);
        });
});
