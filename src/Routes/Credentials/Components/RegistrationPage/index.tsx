import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import logo from "../../../../utils/logo.png";
import { Button } from "../../../../Components/Atoms";
import { Spinner } from "../../../../Components/Atoms";
import Select from "react-select";

interface IProps {
  setPageToShow?: any;
}

const Register: React.FC<IProps> = ({ setPageToShow }) => {
  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [type, setType] = React.useState<string | undefined>("companies");
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();

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
      .post(`${process.env.REACT_APP_SERVER_LINK}/register/`, {
        name,
        userName,
        password,
        type,
      })
      .then((res: any) => {
        toast.success(`Registered as ${res.data.name || ""}`, { duration: 4000 });
        toast.dismiss("login");
        setLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        toast.error(err && err.response && err.response.data ? err.response.data : "An error occurred");
        toast.dismiss("login");
        setLoading(false);
      });

    e.target.reset();
  };

  return (
    <form
      className="z-50 absolute bg-black shadow-2xl rounded rounded-lg p-12 px-8 flex flex-col justify-center items-center "
      onSubmit={Submit}
    >
      <img className="h-12 w-auto mb-6" src={logo} alt="Crypto Wiz" />
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
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Username
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="Enter Password"
          value={password}
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
            classes="w-64 h-8 bg-gray-800"
          >
            Register
          </Button>
        )}
      </div>
      <p
        className="font-light antialiased text-md cursor-pointer
        text-gray-400 hover:text-gray-200"
        onClick={() => {
          setPageToShow("login");
        }}
      >
        Already a user? Login
      </p>
    </form>
  );
};

export default Register;
