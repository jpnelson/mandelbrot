define(['./complex'], function (complex) {
    var pixelWidth;
    var pixelHeight;

    var model = [];

    var fractal = {
        init: function (width, height) {
            pixelWidth = width;
            pixelHeight = height;

            for (var x = 0; x < pixelWidth; x++) {
                var row = [];
                for (var y = 0; y < pixelHeight; y++) {
                    row.push(complex(0, 0));
                }
                model[x] = row;
            }
        },
        iterate: function() {
            for (var x = 0; x < pixelWidth; x++) {
                for (var y = 0; y < pixelHeight; y++) {
                    model[x][y] = step(x, y);
                }
            }
        },
        magnitudes: function() {
            var magnitudes = [];
            for (var x = 0; x < pixelWidth; x++) {
                var row = [];
                for (var y = 0; y < pixelHeight; y++) {
                    row.push(model[x][y].magnitude());
                }
                magnitudes.push(row);
            }

            return magnitudes;
        }
    };

    function step(x, y) {
        var plane = pixelToPlane(x, y);
        var c = complex(plane.x, plane.y);
        var z = model[x][y];
        return z.squared().plus(c);
    }

    function pixelToPlane(x, y) {
        var pixelToPlaneRatio = 1 / pixelHeight; //plane = pixels * pixelToPlaneRation
        return {
            x: (x / pixelWidth * 4 - 2),
            y: (y / pixelHeight * 2 - 1)
        };
    }

    return fractal;
});