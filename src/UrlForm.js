const UrlForm = ({handleDataUpdate}) => {
    const [url , setUrl] = React.useState("");
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [btnText, setBtnText] = React.useState("Submit");

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
                handleDataUpdate(data)
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

const getWordCount =  (jobID, callback) => {
    const poller = () => {
        // Fire another request
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
                console.log("Finished");
                callback(data);
            }
        })
    }

    poller();
}
