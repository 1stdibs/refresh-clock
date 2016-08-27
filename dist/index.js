module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.e = require("react");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(1);
	__webpack_require__(0);
	
	var RefreshClock = function (_React$Component) {
	    _inherits(RefreshClock, _React$Component);
	
	    function RefreshClock(props) {
	        _classCallCheck(this, RefreshClock);
	
	        var _this = _possibleConstructorReturn(this, (RefreshClock.__proto__ || Object.getPrototypeOf(RefreshClock)).call(this, props));
	
	        _this.state = {
	            className: 'recessed'
	        };
	        _this._intervals = [];
	        _this._timeouts = [];
	        return _this;
	    }
	
	    _createClass(RefreshClock, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._setExpandInterval();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.loadTime !== this.props.loadTime) {
	                this._clearTimers();
	                this._setExpandInterval();
	            }
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this._clearTimers();
	        }
	    }, {
	        key: '_setExpandInterval',
	        value: function _setExpandInterval() {
	            var _this2 = this;
	
	            // Every 10 minutes, remind the user that a bunch of time has passed by swapping out the recessed/full classes.
	            this._intervals.push(setInterval(function () {
	                _this2.setState({ className: 'full' });
	                _this2._timeouts.push(setTimeout(function () {
	                    _this2.setState({ className: 'recessed' });
	                }, 3000));
	            }, 600000));
	        }
	    }, {
	        key: '_clearTimers',
	        value: function _clearTimers() {
	            this._intervals.map(clearInterval);
	            this._timeouts.map(clearTimeout);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'span',
	                { className: 'refresh-clock ' + this.state.className, onClick: this.props.refresh },
	                React.createElement(
	                    'a',
	                    null,
	                    'Last page refresh - ',
	                    this.props.loadTime
	                ),
	                ' ',
	                React.createElement('i', { className: 'icon fa fa-refresh refresh-icon' })
	            );
	        }
	    }]);
	
	    return RefreshClock;
	}(React.Component);
	
	RefreshClock.propTypes = {
	    loadTime: React.PropTypes.string,
	    refresh: React.PropTypes.func.isRequired
	};
	
	module.e = RefreshClock;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map