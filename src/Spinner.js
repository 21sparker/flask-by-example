const Spinner = ({isLoading}) => {
    const style = {
        display: isLoading ? "inline-block" : "none",
    }
    return (
        <img src={"../static/spinner.gif"} style={style} />
    )
}