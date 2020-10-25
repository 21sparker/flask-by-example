'use-strict';

var Header = function Header(props) {
    return React.createElement(
        "h1",
        null,
        "Another header"
    );
};

ReactDOM.render(React.createElement(Header, null), document.querySelector("#header2"));
