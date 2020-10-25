'use-strict';

const useState = React.useState;

const UrlForm = () => {
    const [url , setUrl] = useState("");

    const handleChange = event => {
        setUrl(event.target.value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        
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
            getWordCount(data["id"]);
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
            <button type="submit" className="btn btn-default">Submit</button>
        </form>
    )
}

const getWordCount = jobID => {
    let timeout = "";

    const poller = () => {
        // fire another request
        fetch('/results/'+jobID)
        .then(response => {
            if (response.status === 202) {
                console.log("Still processing job id: " + jobID);
            } else if (response.status === 200) {
                return response.json();
            }

            setTimeout(poller,2000);
        })
        .then(data => {
            if (data !== undefined) {
                console.log(data);
            }
        })
    }

    poller();
}

ReactDOM.render(
    <UrlForm />,
    document.querySelector("#form-container")
)