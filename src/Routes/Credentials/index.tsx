import * as React from "react";
import Login from "./Components/LoginPage";
import Register from "./Components/RegistrationPage";

interface IState {
  pageToShow: string;
}

const Credentials = () => {
  const [pageToShow, setPageToShow] =
    React.useState<IState["pageToShow"]>("login");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      {pageToShow === "login" ? (
        <Login setPageToShow={setPageToShow} />
      ) : (
        <Register setPageToShow={setPageToShow} />
      )}
    </div>
  );
};


export default Credentials;
