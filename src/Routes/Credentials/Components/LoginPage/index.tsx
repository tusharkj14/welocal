import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../../../utils/logo.png";
import { Button } from "../../../../Components/Atoms";
import { Spinner } from "../../../../Components/Atoms";
import Select from "react-select";

interface IState {
  userName: string;
  password: string;
  loading: boolean;
}

interface IProps {
  setPageToShow?: any;
}

const formHeading = " text-lg tracking-wider font-bold font-sans";
const inputCss = "focus:outline-none focus:ring-4 focus:ring-green-600";

const Login: React.FC<IProps> = ({ setPageToShow }) => {
  const [userName, setUserName] = React.useState<IState["userName"]>("");
  const [password, setPassword] = React.useState<IState["password"]>("");
  const [type, setType] = React.useState<string | undefined>("companies");
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const history = useHistory();

  if (localStorage.getItem("jwt")) {
    return <Redirect to="/" />;
  }

  const userType = ["financial institution", "companies"];

  const options: any = [];

  const userTypeToOption = (userType: any) => {
    userType.map((curr: any) => {
      options.push({ value: curr, label: curr });
    });
    return options;
  };

  const Submit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Logging In", { id: "login" });
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/login/`, {
        userName,
        password,
        type,
      })
      .then((res: any) => {
        toast.success(`Welcome ${res.data.user.name}`, { duration: 4000 });
        toast.dismiss("login");
        setLoading(false);
        localStorage.setItem("jwt", JSON.stringify(res.data.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        history.push("/");
      })
      .catch((err) => {
        toast.error(err && err.response && err.response.data ? err.response.data : "An error occurred");
        toast.dismiss("login");
        setLoading(false);
        // console.log(err);
      });
  };

  return (
    <form
      className="z-50 absolute bg-black shadow-2xl rounded rounded-lg p-8 py-12
       flex flex-col justify-center items-center "
      onSubmit={Submit}
    >
      <img
        className="h-32 w-auto mb-6 rounded-full"
        src={logo}
        alt="Crypto Wiz"
      />
      <div className="mb-6">
        <Select
          onChange={(e) => {
            setType(e?.value);
          }}
          options={userTypeToOption(userType)}
          defaultValue={{ label: "companies", value: "companies" }}
          className="text-white w-64"
          theme={(theme) => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary25: "rgba(255,255,255,0.25)",
              primary50: "rgba(255,255,255,0.50)",
              primary75: "rgba(255,255,255,0.75)",
              primary: "rgba(255,255,255,1)",
              neutral0: "rgba(25,25,25,1)",
              neutral5: "rgba(255,255,255,0.05)",
              neutral10: "rgba(255,255,255,0.1)",
              neutral20: "rgba(255,255,255,0.2)",
              neutral30: "rgba(255,255,255,0.3)",
              neutral40: "rgba(255,255,255,0.4)",
              neutral50: "rgba(255,255,255,0.5)",
              neutral60: "rgba(255,255,255,0.6)",
              neutral70: "rgba(255,255,255,0.7)",
              neutral80: "rgba(255,255,255,0.8)",
              neutral90: "rgba(255,255,255,0.9)",
            },
          })}
        />
      </div>
      <div className="mb-6">
        <label
          className={"block text-gray-200 text-sm font-bold mb-2" + formHeading}
        >
          Username
        </label>
        <input
          className={
            "w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" +
            inputCss
          }
          id="username"
          placeholder="Enter Username"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className={"block text-gray-200 text-sm font-bold mb-2" + formHeading}
        >
          Password
        </label>
        <input
          className={
            "w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" +
            inputCss
          }
          id="password"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        {loading ? (
          <Spinner color="gray-200" />
        ) : (
          <Button
            type="submit"
            rounded="md"
            bgch="gray-600"
            bgc="white"
            color="white"
            colorh="white"
            classes={"w-64 h-8 bg-gray-800" + formHeading}
          >
            Sign In
          </Button>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <p>
          <p
            className="font-light antialiased text-md cursor-pointer
            text-gray-400 hover:text-gray-200"
            onClick={() => {
              setPageToShow("register");
            }}
          >
            New user? Register
          </p>
        </p>
      </div>
    </form>
  );
};

export default Login;
