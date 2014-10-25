define(['../bower_components/skatejs/dist/skate.js', './fractal', './profiler'], function (skate, fractal, Profiler) {
    var canvas;
    var graphics;
    var step;
    var mandelbrotProfiler = new Profiler();

    var maxStep = 30;
    var scale = 2;

    var x;
    var y;
    var zoom;

    var onDoneCallback = function () {};
    var onSplitCallback = function () {};

    function loop() {
        requestAnimationFrame(function () {
            iterateMandelbrotSet();
            if (step < maxStep) {
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
        maxStep = element.getAttribute('steps') || maxStep;
        scale = element.getAttribute('scale') || scale;

        graphics = canvas.getContext('2d');

        onDoneCallback = element.onDone || onDoneCallback;
        onSplitCallback = element.onSplit || onSplitCallback;

        profile_start();

        step = 0;
        graphics.scale(scale, scale);
        fractal.init(canvas.width / scale, canvas.height / scale, {
            x: element.getAttribute('x') || 0,
            y: element.getAttribute('y') || 0,
            zoom: element.getAttribute('zoom') || 1
        });

        loop();
    }

    function profile_start() {
        mandelbrotProfiler.start();
        mandelbrotProfiler.onSplit(onSplitCallback);
    }

    function profile_stop() {
        mandelbrotProfiler.stop();

        onDoneCallback(mandelbrotProfiler)
    }

    function iterateMandelbrotSet() {
        fractal.iterate(function(x, y, magnitude) {
            var escaped = magnitude > fractal.threshold;
            if (!escaped) {
                drawSquare(x, y);
            }
        });
        mandelbrotProfiler.split();
    }

    function drawSquare(x, y, color) {
        graphics.fillStyle = "rgba(0,0,0,"+(1 / maxStep)+")";
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
            }
        }
    });
});