const ResultsTable = ({data}) => {
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