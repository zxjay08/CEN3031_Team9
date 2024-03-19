export const Selection = () => {
    return <div className={"selection-container"}>
        <h1> Welcome to the Student Welfare Project application! </h1>
            <p> Who are you? I am a... </p>
            <a href={"/student"}>
                <button className={"type-button"}>
                    Student
                </button>
            </a>
            <a href={"/teacher"}>
                <button className={"type-button"}>
                    Teacher
                </button>
            </a>
            <a href={"/school"}>
                <button className={"type-button"}>
                    School
                </button>
            </a>
            <a href={"/advisor"}>
                <button className={"type-button"}>
                    Advisor
                </button>
            </a>
            <a href={"/doe"}>
                <button className={"type-button"}>
                    School Board
                </button>
            </a>
    </div>
}