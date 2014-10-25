define(['../bower_components/skatejs/dist/skate.js', './fractal'], function (skate, fractal, spectrum) {
    var canvas;
    var graphics;
    var step = 0;
    var MAX_STEP = 30;
    var profileStartTime;

    function loop() {
        requestAnimationFrame(function () {
            iterateMandelbrotSet();
            if (step < MAX_STEP) {
                loop();
                step++;
            } else {
                profile_stop();
            }
        });
    }

    function profile_start() {
        profileStartTime = Date.now()
    }

    function profile_stop() {
        document.getElementById('profile').innerHTML = (Date.now() - profileStartTime) / 1000 + ' seconds';
    }

    function iterateMandelbrotSet() {
        fractal.iterate(function(x, y, magnitude) {
            var escaped = magnitude > fractal.threshold;
            if (!escaped) {
                drawSquare(x, y);
            }
        });
    }

    function drawSquare(x, y, color) {
        graphics.fillStyle = "rgba(0,0,0,"+(1 / MAX_STEP)+")";
        graphics.fillRect(x, y, 1, 1);
    }

    skate('mandelbrot', {
        template: function (element) {
            element.innerHTML = '<canvas></canvas>';
        },
        created: function (element) {
            canvas = element.querySelector('canvas');
            canvas.width = element.getAttribute('width');
            canvas.height = element.getAttribute('height');

            graphics = canvas.getContext('2d');

            fractal.init(canvas.width, canvas.height);
            profile_start();
            loop();
        }
    });
});