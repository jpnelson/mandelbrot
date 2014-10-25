define(function () {
    var pixelWidth;
    var pixelHeight;

    var model = [];

    function complexMagnitude(z) {
        return Math.sqrt(z.re * z.re + z.im * z.im);
    }

    var fractal = {
        threshold: 2,
        init: function (width, height) {
            pixelWidth = width;
            pixelHeight = height;

            for (var x = 0; x < pixelWidth; x++) {
                var row = [];
                for (var y = 0; y < pixelHeight; y++) {
                    row.push({
                        re: 0,
                        im: 0
                    });
                }
                model[x] = row;
            }
        },
        iterate: function(callback) {
            for (var x = 0; x < pixelWidth; x++) {
                for (var y = 0; y < pixelHeight; y++) {
                    var magnitude = complexMagnitude(model[x][y]);
                    if (magnitude <= this.threshold) {
                        model[x][y] = step(x, y);
                        callback(x, y, magnitude);
                    }
                }
            }
        }
    };

    function step(x, y) {
        var plane = pixelToPlane(x, y);
        var c = {
            re: plane.x,
            im: plane.y
        };
        var z = model[x][y];
        return {
            re: z.re * z.re - z.im * z.im + c.re,
            im: 2* z.re * z.im + c.im
        };
    }

    function pixelToPlane(x, y) {
        return {
            x: (x / pixelWidth * 4 - 2),
            y: (y / pixelHeight * 2 - 1)
        };
    }

    return fractal;
});