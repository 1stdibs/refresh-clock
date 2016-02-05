"use strict";
var assign = require('lodash.assign');
var View = require('simple-view').View;
var moment = require('moment');
var templates = require('./template');
require('./style.scss');
module.exports = View.extend({
    events: {
        'click .refresh-icon, a': function () {
            return this._refresh();
        }
    },
    tagName : 'span',
    className: 'refresh-clock',
    initialize: function (options) {
        options = assign({
            _refresh: undefined
        }, options);
        this._intervals = [];
        this._timeouts = [];
        if (options.refresh) {
            this._refresh = options.refresh;
        }
        this.template = templates.refreshClock;
        if (options.listenToEvent) {
            this.on(options.listenToEvent, this.render);
        }
    },
    render: function () {
        this.el.innerHTML = this.template({
            time: moment().format('h:mm a')
        });
        this._clearTimers();
        this._timeouts.push(setTimeout(function () {
            this.el.classList.add('recessed');
            this._setExpandInterval();
        }.bind(this), 3000));

        return this;
    },
    _refresh: function () {
        window.location.reload();
    },
    _clearTimers: function () {
        this._intervals.map(clearInterval);
        this._timeouts.map(clearTimeout);
        return this;
    },

    /**
     * Sets an interval which will cause the last refreshed clock to expand slightly every 10 minutes to notify the
     * user that time has elapsed.
     */
    _setExpandInterval : function () {
        // Every 10 minutes, remind the user that a bunch of time has passed by swapping out the recessed/full classes.
        this._intervals.push(setInterval(function () {
            this.el.classList.remove('recessed');
            this.el.classList.add('full');
            this._timeouts.push(setTimeout(function () {
                this.el.classList.remove('full');
                this.el.classList.add('recessed');
            }.bind(this), 3000));
        }.bind(this), 600000));
    }
});
