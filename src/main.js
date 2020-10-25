'use-strict';

const useState = React.useState;


const UrlForm = (setData) => {
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
            getWordCount(data["id"], data => {
                ReactDOM.render(
                    <ResultsTable data={Object.values(data)} />,
                    document.querySelector("#results-container")
                )
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
            <button type="submit" className="btn btn-default">Submit</button>
        </form>
    )
}


const ResultsTable = ({data}) => {
    const [results, setResults] = useState([]);

    console.log(data);

    return (
        <>
            <h2>Frequencies</h2>
            <br/>
            <div id="results">
                <table class="table table-striped" style={{ maxWidth: "300px;"}}>
                <thead>
                    <tr>
                    <th>Word</th>
                    <th>Count</th>
                    </tr>
                </thead>
                    {data.map(i => (
                        <tr>
                            <td>{i[0]}</td>
                            <td>{i[1]}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
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
            console.log(data);
            if (data !== undefined) {
                console.log("Finished");
                callback(data);
            }
        })
    }

    poller();
}


ReactDOM.render(
    <UrlForm />,
    document.querySelector("#form-container")
)