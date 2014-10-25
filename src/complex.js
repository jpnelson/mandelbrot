define(function () {
    function complex(x, y) {
        return {
            re: x,
            im: y,
            plus: function(z) {
                return complex(z.re + x, z.im + y);
            },
            squared: function() {
                return complex(x*x - y*y, 2*x*y);
            },
            magnitude: function() {
                return Math.sqrt(x*x + y*y);
            }

        }
    }

    return complex;
});