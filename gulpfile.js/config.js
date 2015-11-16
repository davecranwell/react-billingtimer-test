var reactify = require('reactify');

var dest = "./build";
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
    },
    scripts: {
        src: src +"/js/**/*"
    },
    markup: {
        src: src + "/*.html",
        dest: dest
    },
    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    },
    sass: {
        src: src + "/sass/**/*.{sass,scss}",
        dest: dest
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/js/main.jsx',
            transform: [reactify],
            dest: dest,
            outputName: 'app.js'
        }]
    },
};