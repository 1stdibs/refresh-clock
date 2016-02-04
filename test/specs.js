"use strict";
var sinon = require('sinon');
var moment = require('moment');
var assert = require('assert');
var Mimic = require('mimic-webpack');
var RefreshClock;
new Mimic({
    domSupport: true,
    loaders: {
        use: ['webpack-compile-templates']
    },
    webpackConfig: {
        resolve: {
            extensions: ['.html']
        },
        module: {
            loaders: [{
                test: /\.html$/,
                loader: 'webpack-compile-templates'
            },{
                test: /\.scss$/,
                loader: 'null'
            }]
        }
    }
}).install();
RefreshClock = require('../index');
describe("refresh-clock", function () {
    var sandbox;
    var refreshView;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('should print the time when rendered', function () {
        refreshView = new RefreshClock();
        refreshView.render();
        assert(-1 !== refreshView.el.innerHTML.indexOf(moment().format('h:mm')));
    });
    it('should call window.location.reload when default _refresh is called', function () {
        sandbox.stub(window.location, 'reload');
        RefreshClock.prototype._refresh();
        sinon.assert.called(window.location.reload);
    });
    it('should default _refresh to RefreshClock.prototype._refresh', function () {
        var rc = new RefreshClock();
        assert.strictEqual(rc._refresh, RefreshClock.prototype._refresh);
    });
    it('should set _refresh to options.refresh when provided', function () {
        var refresh = sinon.spy();
        var rc = new RefreshClock({refresh: refresh});
        assert.strictEqual(rc._refresh, refresh);
    });
    it('should call _refresh the page when the refresh-icon is clicked', function () {
        var refresh = sinon.spy();
        refreshView = new RefreshClock({
            refresh: refresh
        });
        refreshView.render();
        refreshView.el.querySelector('.refresh-icon').dispatchEvent(
            new CustomEvent('click', {
                bubbles: true
            })
        );
        sinon.assert.called(refresh);
    });
    it('should update the time stamp when receiving the event passed in as an option', function () {
        sandbox.stub(moment.fn, 'format', function () {
            return 'moment-formatted-date';
        });
        refreshView = new RefreshClock({
            listenToEvent: 'reload'
        });
        refreshView.render();
        assert.notEqual(refreshView.el.innerHTML.indexOf('moment-formatted-date'), -1);
        moment.fn.format.reset();
        refreshView.trigger('reload');
        sinon.assert.called(moment.fn.format);
    });
});
