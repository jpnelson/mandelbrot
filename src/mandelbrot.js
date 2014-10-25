define(['../bower_components/skatejs/dist/skate.js', './fractal', './spectrum'], function (skate, fractal, spectrum) {
    var canvas;
    var graphics;
    var step = 0;
    var MAX_STEP = 9;

    function loop() {
        requestAnimationFrame(function () {
            iterateMandelbrotSet();
            requestAnimationFrame(function () {
                    if (step < MAX_STEP) {
                        loop();
                        step++;
                    }

                });
        });
    }

    function iterateMandelbrotSet() {
        fractal.iterate();

        var magnitudes = fractal.magnitudes();
        for (var x = 0; x < magnitudes.length; x++) {
            for (var y = 0; y < magnitudes[x].length; y++) {
                var escaped = magnitudes[x][y] > 2;
                if (!escaped) {
                    drawPixel(x, y, spectrum(step / MAX_STEP));
                }

            }
        }
    }

    function drawPixel(x, y, color) {
        drawSquare(x, y, 1, color);
    }



    function drawSquare(x, y, size, color) {
        graphics.fillStyle = "rgba("+color.r+","+color.g+","+color.b+","+(color.a/255)+")";
        graphics.fillRect(x, y, size, size);
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
            loop();
        }
    });
});