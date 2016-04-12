(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DBMon = React.createClass({
  displayName: "DBMon",

  getInitialState: function () {
    return {
      databases: []
    };
  },

  loadSamples: function () {
    this.setState({ databases: ENV.generateData().toArray() });
    Monitoring.renderRate.ping();
    setTimeout(this.loadSamples, ENV.timeout);
  },

  componentDidMount: function () {
    this.loadSamples();
  },

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "table",
        { className: "table table-striped latest-data" },
        React.createElement(
          "tbody",
          null,
          this.state.databases.map(function (database) {
            return React.createElement(
              "tr",
              { key: database.dbname },
              React.createElement(
                "td",
                { className: "dbname" },
                database.dbname
              ),
              React.createElement(
                "td",
                { className: "query-count" },
                React.createElement(
                  "span",
                  { className: database.lastSample.countClassName },
                  database.lastSample.nbQueries
                )
              ),
              database.lastSample.topFiveQueries.map(function (query, index) {
                return React.createElement(
                  "td",
                  { className: "Query " + query.elapsedClassName },
                  query.formatElapsed,
                  React.createElement(
                    "div",
                    { className: "popover left" },
                    React.createElement(
                      "div",
                      { className: "popover-content" },
                      query.query
                    ),
                    React.createElement("div", { className: "arrow" })
                  )
                );
              })
            );
          })
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(DBMon, null), document.getElementById('dbmon'));

},{}]},{},[1]);
