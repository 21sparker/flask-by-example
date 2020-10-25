'use-strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var useState = React.useState;

var UrlForm = function UrlForm() {
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
            body: JSON.stringify({ "url": url })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("Job id created: " + data["id"]);
            getWordCount(data["id"]);
        }).catch(function (error) {
            return console.log(error);
        });
    };

    return React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', {
                type: 'text',
                value: url,
                onChange: handleChange,
                className: 'form-control',
                placeholder: 'Enter URL...',
                style: { maxWidth: "300px;" }
            })
        ),
        React.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default' },
            'Submit'
        )
    );
};

var getWordCount = function getWordCount(jobID) {
    var timeout = "";

    var poller = function poller() {
        // fire another request
        fetch('/results/' + jobID).then(function (response) {
            if (response.status === 202) {
                console.log("Still processing job id: " + jobID);
            } else if (response.status === 200) {
                return response.json();
            }

            setTimeout(poller, 2000);
        }).then(function (data) {
            if (data !== undefined) {
                console.log(data);
            }
        });
    };

    poller();
};

ReactDOM.render(React.createElement(UrlForm, null), document.querySelector("#form-container"));
