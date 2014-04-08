define([], function () {
    function StringBuilder(appendSeperator) {
        var _string = "";

        this.append = function () {
            for (var i = 0; i < arguments.length; i++)
                _string += arguments[i];
            _string += appendSeperator;
            return this;
        };

        this.appendEnd = function () {
            for (var i = 0; i < arguments.length; i++) _string += arguments[i];
            return this;
        };

        this.toString = function () {
            return _string;
        };
    }

    var TimeSpan = function ($milliseconds, $seconds, $minutes, $hours, $days) {
        var // Constants
            MSEC_PER_SECOND = 1000,
            MSEC_PER_MINUTE = 60000,
            MSEC_PER_HOUR = 3600000,
            MSEC_PER_DAY = 86400000,

            // Internally we store the TimeSpan as Milliseconds
            _msecs = 0,

            // Helper functions
            isNumeric = function (input) {
                return !isNaN(parseFloat(input)) && isFinite(input);
            };

        this.isTimeSpan = true;
        
        if (isNumeric($days)) _msecs += ($days * MSEC_PER_DAY);
        if (isNumeric($hours)) _msecs += ($hours * MSEC_PER_HOUR);
        if (isNumeric($minutes)) _msecs += ($minutes * MSEC_PER_MINUTE);
        if (isNumeric($seconds)) _msecs += ($seconds * MSEC_PER_SECOND);
        if (isNumeric($milliseconds)) _msecs += $milliseconds;

        this.addMilliseconds = function (milliseconds) {
            if (!isNumeric(milliseconds)) return;
            _msecs += milliseconds;
        };
        
        this.addSeconds = function (seconds) {
            if (!isNumeric(seconds)) return;
            _msecs += (seconds * MSEC_PER_SECOND);
        };

        this.addMinutes = function(minutes) {
            if (!isNumeric(minutes)) return;
            _msecs += (minutes * MSEC_PER_MINUTE);
        };
            
        this.addHours = function (hours) {
            if (!isNumeric(hours)) return;
            _msecs += (hours * MSEC_PER_HOUR);
        };
        
        this.addDays = function (days) {
            if (!isNumeric(days)) return;
            _msecs += (days * MSEC_PER_DAY);
        };

        this.subtractMilliseconds = function (milliseconds) {
            if (!isNumeric(milliseconds)) return;
            _msecs -= milliseconds;
        };
        
        this.subtractSeconds = function (seconds) {
            if (!isNumeric(seconds)) return;
            _msecs -= (seconds * MSEC_PER_SECOND);
        };
        
        this.subtractMinutes = function (minutes) {
            if (!isNumeric(minutes)) return;
            _msecs -= (minutes * MSEC_PER_MINUTE);
        };
        
        this.subtractHours = function (hours) {
            if (!isNumeric(hours)) return;
            _msecs -= (hours * MSEC_PER_HOUR);
        };
        
        this.subtractDays = function (days) {
            if (!isNumeric(days)) return;
            _msecs -= (days * MSEC_PER_DAY);
        };
        
        this.add = function (otherTimeSpan) {
            if (!otherTimeSpan.isTimeSpan) return;
            _msecs += otherTimeSpan.totalMilliseconds();
        };
        
        this.subtract = function (otherTimeSpan) {
            if (!otherTimeSpan.isTimeSpan) return;
            _msecs -= otherTimeSpan.totalMilliseconds();
        };
        
        this.equals = function (otherTimeSpan) {
            if (!otherTimeSpan.isTimeSpan) return;
            return _msecs === otherTimeSpan.totalMilliseconds();
        };

        this.totalMilliseconds = function (roundDown) {
            var result = _msecs;
            if (roundDown === true) result = Math.floor(result);
            return result;
        };
        
        this.totalSeconds = function (roundDown) {
            var result = _msecs / MSEC_PER_SECOND;
            if (roundDown === true)  result = Math.floor(result);
            return result;
        };
        
        this.totalMinutes = function (roundDown) {
            var result = _msecs / MSEC_PER_MINUTE;
            if (roundDown === true) result = Math.floor(result);
            return result;
        };
        
        this.totalHours = function (roundDown) {
            var result = _msecs / MSEC_PER_HOUR;
            if (roundDown === true) result = Math.floor(result);
            return result;
        };
        
        this.totalDays = function (roundDown) {
            var result = _msecs / MSEC_PER_DAY;
            if (roundDown === true) result = Math.floor(result);
            return result;
        };
        
        this.milliseconds = function () {
            return _msecs % 1000;
        };
        
        this.seconds = function () {
            return Math.floor(_msecs / MSEC_PER_SECOND) % 60;
        };
        
        this.minutes = function () {
            return Math.floor(_msecs / MSEC_PER_MINUTE) % 60;
        };
        
        this.hours = function () {
            return Math.floor(_msecs / MSEC_PER_HOUR) % 24;
        };
        
        this.days = function () {
            return Math.floor(_msecs / MSEC_PER_DAY);
        };

        this.humanise = function() {
            var sb = new StringBuilder(', ');
            if (this.days() > 0) sb.append(this.days(), ' days');
            if (this.hours() > 0) sb.append(this.hours(), ' hours');
            if (this.minutes() > 0) sb.append(this.minutes(), ' minutes');
            return sb.appendEnd(this.seconds(), ' seconds').toString();
        };
    };

    TimeSpan.FromSeconds = function (seconds) {
        return new TimeSpan(0, seconds, 0, 0, 0);
    };
    
    TimeSpan.FromMinutes = function (minutes) {
        return new TimeSpan(0, 0, minutes, 0, 0);
    };
    
    TimeSpan.FromHours = function (hours) {
        return new TimeSpan(0, 0, 0, hours, 0);
    };
    
    TimeSpan.FromDays = function (days) {
        return new TimeSpan(0, 0, 0, 0, days);
    };
    
    TimeSpan.FromDates = function (firstDate, secondDate, forcePositive) {
        var differenceMsecs = secondDate.valueOf() - firstDate.valueOf();
        if (forcePositive === true) differenceMsecs = Math.abs(differenceMsecs);
        return new TimeSpan(differenceMsecs, 0, 0, 0, 0);
    };

    return TimeSpan;
});
