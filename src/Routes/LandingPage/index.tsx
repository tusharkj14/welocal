import * as React from "react";
import {Redirect} from "react-router-dom";
import logo from "../../utils/logo.png";

const LandingPage = () => {
    const [timedOut, setTimedOut] = React.useState<boolean>(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimedOut(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!timedOut) {
        return (
            <div className="h-full w-full bg-white flex justify-center items-center animate-pulse">
                <img className="object-contain h-screen w-auto" src={logo} alt="Invo"/>
            </div>
        );
    } else if (!localStorage.getItem("jwt")) {
        return <Redirect to="/credentials"/>;
    } else if (
        JSON.parse(localStorage.getItem("user") as string).type === "user"
    ) {
        return <Redirect to="/User"/>;
    } else {
        return <Redirect to="/Jobs"/>;
    }
};

export default LandingPage;
