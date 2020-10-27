const Container = () => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const getData = () => {
        
    }

    
    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-5 col-sm-offset-1">
                    <h1>Wordcount 3000</h1>
                    <div id="form-container">
                        <UrlForm />
                    </div>
                    <h4></h4>
                </div>
                <div class="col-sm-5 col-sm-offset-1" id="results-container">
                    <h2>Frequencies</h2>
                    <div id="results">
                        <ResultsTable />
                    </div>
                        <Spinner />
                </div>
            </div>
      </div>
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