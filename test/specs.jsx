"use strict";
const React = require('react');
const sinon = require('sinon');
const assert = require('assert');
const Mimic = require('mimic-webpack');
const mount = require('enzyme').mount;
new Mimic({
    domSupport: true,
    loaders: {
        use: []
    },
    webpackConfig: {
        resolve: {
            extensions: ['.jsx']
        },
        module: {
            loaders: [{
                test: /\.scss$/,
                loader: 'null'
            }]
        }
    }
}).install();

const RefreshClock = require('../index');

describe("refresh-clock", function () {
    it('should print the time when rendered', function () {
        const refreshView = mount(<RefreshClock loadTime="abc" refresh={function () {}} />);
        assert(refreshView.text().indexOf('abc') !== -1);
    });
    it('should call refresh prop when clicked', function () {
        const refresh = sinon.spy();
        const refreshView = mount(<RefreshClock loadTime="abc" refresh={refresh} />);
        refreshView.simulate('click');
        sinon.assert.called(refresh);
    });
    it('should not clear timer when same time is passed', function () {
        const refreshView = mount(<RefreshClock loadTime="abc" refresh={function () {}} />);
        sinon.stub(refreshView.instance(), '_clearTimers');

        refreshView.setProps({
            loadTime: 'abc',
            refresh: function () {}
        });

        sinon.assert.notCalled(refreshView.instance()._clearTimers);
    });
    it('should reset timer when different time is passed', function () {
        const refreshView = mount(<RefreshClock loadTime="abc" refresh={function () {}} />);
        sinon.stub(refreshView.instance(), '_clearTimers');

        refreshView.setProps({
            loadTime: 'def',
            refresh: function () {}
        });

        sinon.assert.called(refreshView.instance()._clearTimers);
    });
});
