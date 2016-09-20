'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpressionError = undefined;

var _ExtendableError2 = require('./ExtendableError');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpressionError = function (_ExtendableError) {
    _inherits(ExpressionError, _ExtendableError);

    function ExpressionError(m) {
        _classCallCheck(this, ExpressionError);

        return _possibleConstructorReturn(this, (ExpressionError.__proto__ || Object.getPrototypeOf(ExpressionError)).call(this, m));
    }

    return ExpressionError;
}(_ExtendableError2.ExtendableError);

exports.ExpressionError = ExpressionError;