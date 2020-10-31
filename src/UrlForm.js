const UrlForm = ({handleDataUpdate, handleStatusUpdate}) => {
    const [url , setUrl] = React.useState("");
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [btnText, setBtnText] = React.useState("Submit");
    const [displayError, setDisplayError] = React.useState(false);

    const handleChange = event => {
        setUrl(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        // Communicate that the data fetching has begun to parent component
        handleStatusUpdate(true);

        // Update visual state
        setDisplayError(false);
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
            getWordCount(
                data["id"], 
                data => {
                    handleDataUpdate(data);
                    handleStatusUpdate(false);
                    setBtnDisabled(false);
                    setBtnText("Submit");
                },
                error => {
                    handleStatusUpdate(false);
                    setBtnDisabled(false);
                    setBtnText("Submit");
        
                    setDisplayError(true);
                }
            );
        })
        .catch(error => {
            console.log(error);
            handleStatusUpdate(false);
            setBtnDisabled(false);
            setBtnText("Submit");

            setDisplayError(true);

        })
    }

    return (
        <>
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
            <div style={{display: displayError ? "block" : "none"}}>
                There was an error submitting your URL. Please make sure it is valid.
            </div>
        </>
    )
}

const getWordCount =  (jobID, callback, errorCallback) => {
    const poller = () => {
        // Fire another request
        fetch('/results/'+jobID)
        .then(response => {
            if (response.status === 202) {
                console.log("Still processing job id: " + jobID);
                setTimeout(poller,2000);
            } else if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("API Failed");
            }
        })
        .then(data => {
            if (data !== undefined) {
                console.log("Finished");
                callback(data);
            }
        })
        .catch(error => errorCallback(error))
    }

    poller();
}
