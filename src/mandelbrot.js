define(['../bower_components/skatejs/dist/skate.js', './fractal'], function (skate, fractal, spectrum) {
    var canvas;
    var graphics;
    var step;
    var profileStartTime;

    var MAX_STEP = 30;
    var SCALE = 2;

    var x;
    var y;
    var zoom;

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

    function init(element) {
        canvas = element.querySelector('canvas');
        canvas.width = element.getAttribute('width');
        canvas.height = element.getAttribute('height');

        graphics = canvas.getContext('2d');

        profile_start();

        step = 0;
        graphics.scale(SCALE, SCALE);
        fractal.init(canvas.width / SCALE, canvas.height / SCALE, {
            x: element.getAttribute('x') || 0,
            y: element.getAttribute('y') || 0,
            zoom: element.getAttribute('zoom') || 1
        });

        loop();
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
            init(element);
        },
        attributes: {
            width: {
                updated: function (element) {
                    init(element);
                }
            },
            height: {
                updated: function (element) {
                    init(element);
                }
            },
            x: {
                updated: function (element) {
                    init(element);
                }
            },
            y: {
                updated: function (element) {
                    init(element);
                }
            },
            zoom: {
                updated: function (element) {
                    init(element);
                }
            }
        }
    });
});