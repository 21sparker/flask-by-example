const Spinner = ({isLoading}) => {
    const style = {
        display: isLoading ? "inline-block" : "none",
        width: "25px",
        height: "25px",
        margin: "0 auto",
    }
    return (
        <div>
            <img src={"../static/spinner.gif"} style={style} />
        </div>
    )
}