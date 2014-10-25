define(function() {

    var spectrum = [{
        r: 255,
        g: 0,
        b: 255,
        a: 255
    }, {
        r: 100,
        g: 0,
        b: 255,
        a: 255
    }, {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    }];

    function blend(color1, color2, percent) {
        return {
            r: Math.round(color1.r * (1-percent) + color2.r * percent),
            g: Math.round(color1.g * (1-percent) + color2.g * percent),
            b: Math.round(color1.b * (1-percent) + color2.b * percent),
            a: Math.round(color1.a * (1-percent) + color2.a * percent)
        }
    }

    return function(percent) {
        percent = Math.min(percent, 1);

        var position = (spectrum.length - 1) * percent;
        var interpolateStart = Math.floor(position);
        var interpolateEnd = Math.min(interpolateStart + 1, spectrum.length - 1);
        var interpolatePercent = position - interpolateStart;

        return blend(spectrum[interpolateStart], spectrum[interpolateEnd], interpolatePercent);
    }
});