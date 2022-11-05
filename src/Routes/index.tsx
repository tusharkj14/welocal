import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import Credentials from "./Credentials";
import Navbar from "../Components/Navbar";
import Companies from "./Companies";
import Invoices from "./Invoices";
import Profiles from "./Profiles";
import FinancialInstitution from "./FinancialInstitution";
import {Footer} from "../Components/Atoms";
import {Toast} from "../Components/Atoms";

const Routes = () => {
    return (
        <Router>
            <Route
                path={["/Jobs", "/User", "/JobsCreated", "/Profiles"]}
                component={Navbar}
            />
            <Switch>
                <Route path="/User" exact component={Companies}/>
                <Route path="/Profiles" exact component={Profiles}/>
                <Route path="/JobsCreated" exact component={Invoices}/>
                <Route
                    path="/Jobs"
                    exact
                    component={FinancialInstitution}
                />
                <Route path="/credentials" exact component={Credentials}/>
                <Route path="/" component={LandingPage}/>
            </Switch>
            <Toast/>
            <Route
                path={["/User", "/Jobs", "/JobsCreated", "/Profiles"]}
                component={Footer}
            />
        </Router>
    );
};

export default Routes;
