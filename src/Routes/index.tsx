import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Credentials from "./Credentials";
import Navbar from "../Components/Navbar";
import Companies from "./Companies";
import Invoices from "./Invoices";
import FinancialInstitution from "./FinancialInstitution";
import { Footer } from "../Components/Atoms";
import { Toast } from "../Components/Atoms";

const Routes = () => {
  return (
    <Router>
      <Route
        path={["/FinancialInstitution", "/Companies", "/Invoices"]}
        component={Navbar}
      />
      <Switch>
        <Route path="/Companies" exact component={Companies} />
        <Route path="/Invoices" exact component={Invoices} />
        <Route
          path="/FinancialInstitution"
          exact
          component={FinancialInstitution}
        />
        <Route path="/credentials" exact component={Credentials} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Toast />
      <Route
        path={["/Companies", "/FinancialInstitution", "/Invoices"]}
        component={Footer}
      />
    </Router>
  );
};

export default Routes;
