"use strict";

const React = require('react');
require('./style.scss');

class RefreshClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'recessed'
        };
        this._intervals = [];
        this._timeouts = [];
    }
    componentDidMount() {
        this._setExpandInterval();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loadTime !== this.props.loadTime) {
            this._clearTimers();
            this._setExpandInterval();
        }
    }
    componentWillUnmount() {
        this._clearTimers();
    }
    _setExpandInterval() {
        // Every 10 minutes, remind the user that a bunch of time has passed by swapping out the recessed/full classes.
        this._intervals.push(setInterval(() => {
            this.setState({className: 'full'});
            this._timeouts.push(setTimeout(() => {
                this.setState({className: 'recessed'});
            }, 3000));
        }, 600000));
    }
    _clearTimers() {
        this._intervals.map(clearInterval);
        this._timeouts.map(clearTimeout);
    }
    render() {
        return (
            <span className={`refresh-clock ${this.state.className}`} onClick={this.props.refresh}>
              <a>Last page refresh - {this.props.loadTime}</a>
                {' '}
                <i className="icon fa fa-refresh refresh-icon" />
            </span>
        );
    }
}


RefreshClock.propTypes = {
    loadTime: React.PropTypes.string,
    refresh: React.PropTypes.func.isRequired
};

module.exports = RefreshClock;
