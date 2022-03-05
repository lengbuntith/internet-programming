"use strict";
exports.__esModule = true;
exports.KhmerDate = void 0;
var KhmerDate = /** @class */ (function () {
    function KhmerDate(date) {
        this.oldDate = new Date();
        this.date = date;
    }
    KhmerDate.prototype.millisToMinutes = function (millis) {
        var minutes = Math.floor(millis / 60000);
        return minutes;
    };
    KhmerDate.prototype.NumSeconds = function (millis) {
        var seconds = 60 * this.millisToMinutes(millis);
        return seconds;
    };
    KhmerDate.prototype.NumHour = function (millis) {
        var hour = this.millisToMinutes(millis) / 60;
        return hour;
    };
    KhmerDate.prototype.NumDay = function (millis) {
        var day = this.NumHour(millis) / 24;
        return day;
    };
    KhmerDate.prototype.NumWeek = function (millis) {
        var week = this.NumDay(millis) / 7;
        return week;
    };
    KhmerDate.prototype.NumMonth = function (millis) {
        var month = this.NumWeek(millis) / 4;
        return month;
    };
    KhmerDate.prototype.getDate = function () {
        var date_str = this.date.toString();
        var old_date_str = this.oldDate.toString();
        var date_num = Date.parse(date_str);
        var old_date_num = Date.parse(old_date_str);
        var diffTime = old_date_num - date_num;
        var diffMinute = this.millisToMinutes(diffTime);
        var result = "";
        if (diffMinute < 1) {
            result = "មុននេះបន្តិច";
        }
        else if (diffMinute >= 1 && diffMinute < 60) {
            result = diffMinute + " នាទីមុន";
        }
        else if (diffMinute >= 60 && diffMinute < 60 * 24) {
            result = this.NumHour(diffTime).toFixed(0) + " ម៉ោងមុន";
        }
        else if (diffMinute >= 60 * 24 && diffMinute < 60 * 24 * 7) {
            result = Math.ceil(this.NumDay(diffTime)) + " ថ្ងៃមុន";
        }
        else if (diffMinute >= 60 * 24 * 7 && diffMinute < 60 * 24 * 31) {
            result = Math.ceil(this.NumWeek(diffTime)) + " សប្តាហ៍មុន";
        }
        else if (diffMinute >= 60 * 24 * 31) {
            result = Math.ceil(this.NumMonth(diffTime)) + " ខែមុន";
        }
        result = result.replaceAll("0", "០");
        result = result.replaceAll("1", "១");
        result = result.replaceAll("2", "២");
        result = result.replaceAll("3", "៣");
        result = result.replaceAll("4", "៤");
        result = result.replaceAll("5", "៥");
        result = result.replaceAll("6", "៦");
        result = result.replaceAll("7", "៧");
        result = result.replaceAll("8", "៨");
        result = result.replaceAll("9", "៩");
        return result;
    };
    return KhmerDate;
}());
exports.KhmerDate = KhmerDate;
