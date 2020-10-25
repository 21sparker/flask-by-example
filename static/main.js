"use strict";
'use-strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useState = React.useState;

var UrlForm = function UrlForm(setData) {
  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      url = _useState2[0],
      setUrl = _useState2[1];

  var handleChange = function handleChange(event) {
    setUrl(event.target.value);
  };

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    fetch('/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "url": url
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log("Job id created: " + data["id"]);
      getWordCount(data["id"], function (data) {
        ReactDOM.render( /*#__PURE__*/React.createElement(ResultsTable, {
          data: Object.values(data)
        }), document.querySelector("#results-container"));
      });
    })["catch"](function (error) {
      return console.log(error);
    });
  };

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: url,
    onChange: handleChange,
    className: "form-control",
    placeholder: "Enter URL...",
    style: {
      maxWidth: "300px;"
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-default"
  }, "Submit"));
};

var ResultsTable = function ResultsTable(_ref) {
  var data = _ref.data;

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      results = _useState4[0],
      setResults = _useState4[1];

  console.log(data);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Frequencies"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    id: "results"
  }, /*#__PURE__*/React.createElement("table", {
    "class": "table table-striped",
    style: {
      maxWidth: "300px;"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Word"), /*#__PURE__*/React.createElement("th", null, "Count"))), data.map(function (i) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, i[0]), /*#__PURE__*/React.createElement("td", null, i[1]));
  }))));
};

var getWordCount = function getWordCount(jobID, callback) {
  var poller = function poller() {
    // Fire another request
    fetch('/results/' + jobID).then(function (response) {
      if (response.status === 202) {
        console.log("Still processing job id: " + jobID);
      } else if (response.status === 200) {
        return response.json();
      }

      setTimeout(poller, 2000);
    }).then(function (data) {
      console.log(data);

      if (data !== undefined) {
        console.log("Finished");
        callback(data);
      }
    });
  };

  poller();
};

ReactDOM.render( /*#__PURE__*/React.createElement(UrlForm, null), document.querySelector("#form-container"));