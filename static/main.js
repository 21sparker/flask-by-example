"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container() {
  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      isLoading = _React$useState4[0],
      setIsLoading = _React$useState4[1];

  var handleDataUpdate = function handleDataUpdate(data) {
    setData(data);
  };

  var handleStatusUpdate = function handleStatusUpdate(isLoading) {
    setIsLoading(isLoading);
  };

  return /*#__PURE__*/React.createElement("div", {
    "class": "container"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "row"
  }, /*#__PURE__*/React.createElement("div", {
    "class": "col-sm-5 col-sm-offset-1"
  }, /*#__PURE__*/React.createElement("h1", null, "Wordcount 3000"), /*#__PURE__*/React.createElement("div", {
    id: "form-container"
  }, /*#__PURE__*/React.createElement(UrlForm, {
    handleDataUpdate: handleDataUpdate,
    handleStatusUpdate: handleStatusUpdate
  })), /*#__PURE__*/React.createElement("h4", null)), /*#__PURE__*/React.createElement("div", {
    "class": "col-sm-5 col-sm-offset-1",
    id: "results-container"
  }, /*#__PURE__*/React.createElement("h2", null, "Frequencies"), /*#__PURE__*/React.createElement(ResultsTable, {
    data: data
  }), /*#__PURE__*/React.createElement(Spinner, {
    isLoading: isLoading
  }))));
};
"use strict";

var ResultsTable = function ResultsTable(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/React.createElement("div", {
    id: "results"
  }, /*#__PURE__*/React.createElement("table", {
    "class": "table table-striped",
    style: {
      maxWidth: "300px;"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Word"), /*#__PURE__*/React.createElement("th", null, "Count"))), data.map(function (i) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, i[0]), /*#__PURE__*/React.createElement("td", null, i[1]));
  })));
};
"use strict";

var Spinner = function Spinner(_ref) {
  var isLoading = _ref.isLoading;
  var style = {
    display: isLoading ? "inline-block" : "none",
    width: "25px",
    height: "25px",
    margin: "0 auto"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../static/spinner.gif",
    style: style
  }));
};
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UrlForm = function UrlForm(_ref) {
  var handleDataUpdate = _ref.handleDataUpdate,
      handleStatusUpdate = _ref.handleStatusUpdate;

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      url = _React$useState2[0],
      setUrl = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      btnDisabled = _React$useState4[0],
      setBtnDisabled = _React$useState4[1];

  var _React$useState5 = React.useState("Submit"),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      btnText = _React$useState6[0],
      setBtnText = _React$useState6[1];

  var _React$useState7 = React.useState(false),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      displayError = _React$useState8[0],
      setDisplayError = _React$useState8[1];

  var handleChange = function handleChange(event) {
    setUrl(event.target.value);
  };

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault(); // Communicate that the data fetching has begun to parent component

    handleStatusUpdate(true); // Update visual state

    setDisplayError(false);
    setBtnDisabled(true);
    setBtnText("Loading...");
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
        handleDataUpdate(data);
        handleStatusUpdate(false);
        setBtnDisabled(false);
        setBtnText("Submit");
      }, function (error) {
        handleStatusUpdate(false);
        setBtnDisabled(false);
        setBtnText("Submit");
        setDisplayError(true);
      });
    })["catch"](function (error) {
      console.log(error);
      handleStatusUpdate(false);
      setBtnDisabled(false);
      setBtnText("Submit");
      setDisplayError(true);
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
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
    className: "btn btn-default",
    disabled: btnDisabled
  }, btnText)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: displayError ? "block" : "none"
    }
  }, "There was an error submitting your URL. Please make sure it is valid."));
};

var getWordCount = function getWordCount(jobID, callback, errorCallback) {
  var poller = function poller() {
    // Fire another request
    fetch('/results/' + jobID).then(function (response) {
      if (response.status === 202) {
        console.log("Still processing job id: " + jobID);
        setTimeout(poller, 2000);
      } else if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("API Failed");
      }
    }).then(function (data) {
      if (data !== undefined) {
        console.log("Finished");
        callback(data);
      }
    })["catch"](function (error) {
      return errorCallback(error);
    });
  };

  poller();
};
"use strict";
'use-strict';

ReactDOM.render( /*#__PURE__*/React.createElement(Container, null), document.querySelector("#root"));
