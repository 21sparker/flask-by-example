const Container = () => {
    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    // const [isError, setIsError] = React.useState(false);
    
    const handleDataUpdate = (data) => {
        setData(data);
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-5 col-sm-offset-1">
                    <h1>Wordcount 3000</h1>
                    <div id="form-container">
                        <UrlForm handleDataUpdate={handleDataUpdate} />
                    </div>
                    <h4></h4>
                </div>
                <div class="col-sm-5 col-sm-offset-1" id="results-container">
                    <h2>Frequencies</h2>
                    <div id="results">
                        <ResultsTable data={data}/>
                    </div>
                        <Spinner isLoading={isLoading}/>
                </div>
            </div>
      </div>
    )
}