(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Utils = /** @class */ (function () {
        function Utils() {
            var _this = this;
            this.LOG_STYLE = 'color: lawngreen';
            this.lerp = function (start, end, amt) {
                return (1 - amt) * start + amt * end;
            };
            this.log = function (message) {
                console.log("%c" + message, _this.LOG_STYLE);
            };
        }
        return Utils;
    }());
    exports.Utils = Utils;
});
//# sourceMappingURL=utils.js.map