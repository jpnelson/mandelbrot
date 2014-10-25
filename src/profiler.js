define(function() {
    return function () {
        var timeStart;
        var timeElapsed;

        var splits = [];
        var splitCallback;
        var lastSplitTime;

        return {
            start: function () {
                timeStart = Date.now();
                lastSplitTime = Date.now();
            },
            stop: function () {
                timeElapsed = (Date.now() - timeStart);
            },
            split: function () {
                var timeSinceLastSplit = Date.now() - lastSplitTime;
                lastSplitTime = Date.now();

                splits.push(timeSinceLastSplit);
                splitCallback(timeSinceLastSplit);
            },
            print: function () {
                return (timeElapsed / 1000) + ' seconds';
            },
            getTime: function () {
                return timeElapsed;
            },
            getSplits: function () {
                return splits;
            },
            onSplit: function (callback) {
                splitCallback = callback;
            }
        }
    }
});