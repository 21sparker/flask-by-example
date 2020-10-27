const UrlForm = (setData) => {
    const [url , setUrl] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [btnText, setBtnText] = useState("Submit");

    const handleChange = event => {
        setUrl(event.target.value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        setBtnDisabled(true);
        setBtnText("Loading...");
        
        fetch('/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"url": url })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Job id created: " + data["id"]);
            getWordCount(data["id"], data => {
                ReactDOM.render(
                    <ResultsTable data={Object.values(data)} />,
                    document.querySelector("#results")
                );
                setBtnDisabled(false);
                setBtnText("Submit");
            });
        })
        .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    value={url}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter URL..."
                    style={{ maxWidth: "300px;" }}
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-default"
                disabled={btnDisabled}>
                    {btnText}
            </button>
        </form>
    )
}