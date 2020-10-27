'use-strict';

const useState = React.useState;

const ResultsTable = ({data}) => {
    const [results, setResults] = useState([]);

    console.log(data);

    return (
        <>
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