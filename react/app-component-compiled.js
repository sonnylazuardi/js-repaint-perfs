(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Query = React.createClass({
  displayName: "Query",

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextProps.elapsedClassName !== this.props.elapsedClassName) return true;
    if (nextProps.formatElapsed !== this.props.formatElapsed) return true;
    if (nextProps.query !== this.props.query) return true;
    return false;
  },
  render: function () {
    return React.createElement(
      "td",
      { className: "Query " + this.props.elapsedClassName },
      this.props.formatElapsed,
      React.createElement(
        "div",
        { className: "popover left" },
        React.createElement(
          "div",
          { className: "popover-content" },
          this.props.query
        ),
        React.createElement("div", { className: "arrow" })
      )
    );
  }
});

var Database = React.createClass({
  displayName: "Database",

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextProps.lastMutationId === this.props.lastMutationId) return false;
    return true;
  },
  render: function () {
    var lastSample = this.props.lastSample;
    return React.createElement(
      "tr",
      { key: this.props.dbname },
      React.createElement(
        "td",
        { className: "dbname" },
        this.props.dbname
      ),
      React.createElement(
        "td",
        { className: "query-count" },
        React.createElement(
          "span",
          { className: this.props.lastSample.countClassName },
          this.props.lastSample.nbQueries
        )
      ),
      this.props.lastSample.topFiveQueries.map(function (query, index) {
        return React.createElement(Query, { key: index,
          query: query.query,
          elapsed: query.elapsed,
          formatElapsed: query.formatElapsed,
          elapsedClassName: query.elapsedClassName });
      })
    );
  }
});

var DBMon = React.createClass({
  displayName: "DBMon",

  getInitialState: function () {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({
      databases: ENV.generateData(true).toArray()
    });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  componentDidMount: function () {
    this.loadSamples();
  },

  render: function () {

    var databases = this.state.databases.map(function (database) {
      return React.createElement(Database, {
        key: database.dbname,
        lastMutationId: database.lastMutationId,
        dbname: database.dbname,
        samples: database.samples,
        lastSample: database.lastSample });
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        { className: "table table-striped latest-data" },
        React.createElement(
          "tbody",
          null,
          databases
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(DBMon, null), document.getElementById('dbmon'));

},{}]},{},[1]);
