import * as React from "react";
import axios from "axios";
import Select from "react-select";

import toast from "react-hot-toast";
import logo from "../../../../utils/logo.png";
import { Button } from "../../../../Components/Atoms";
import { Spinner } from "../../../../Components/Atoms";
import getJobType from '../../../../utils/getJobType'

const formHeading = " text-lg tracking-wider font-bold font-sans";
const inputCss = "focus:outline-none focus:ring-4 focus:ring-green-600";

const Form = ({}) => {
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [userPdf, setUserPdf] = React.useState(null);
  const [jobType, setJobType] = React.useState("Technician");
  const [loading, setLoading] = React.useState(false);
  const [instLoading, setInstLoading] = React.useState(false);

  const options = [];

  const dataToOption = (instData) => {
    if(!instData){
      return
    }
    instData?.map((curr) => {
      options.push({ value: curr, label: curr });
    });
    return options;
  };

  let userId = JSON.parse(localStorage.getItem("user"))._id;

  console.log(jobType)

  const Submit = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Uploading file", { id: "file" });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/`,
        {
          userId,
          description,
          price,
          jobType,
          status: "pending",
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("File saved successfully");
        toast.dismiss("file");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(
          err && err.response && err.response.data
            ? err.response.data
            : "An error occurred"
        );
        toast.dismiss("file");
      });
  };

  return (
    <>
      <form
        className="bg-black shadow-2xl rounded rounded-lg p-12 px-8 
    flex flex-col justify-center items-center mb-14"
        onSubmit={Submit}
      >
        <img
          className="h-32 w-auto mb-6 rounded-full"
          src={logo}
          alt="invorify"
        />
        <div className="mb-6">
          <label
              className={
                  "block text-gray-200 text-sm font-bold mb-2" + formHeading
              }
          >
            Job Type
          </label>
          <Select
              onChange={(e) => {
                setJobType(e?.value);
              }}
              isLoading={instLoading}
              options={dataToOption(getJobType())}
              defaultValue={{
                label: "Select Job Type",
                value: null,
              }}
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
          <label className={"block text-gray-200 mb-2" + formHeading}>
            Job Description
          </label>
          <input
              className={
                  "w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight " +
                  inputCss
              }
              type="textarea"
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
          />
        </div>
        <div className="mb-6">
          <label className={"block text-gray-200 mb-2" + formHeading}>
            Expected Price
          </label>
          <input
              className={
                  "w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight " +
                  inputCss
              }
              type="number"
              id="Price"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
          />
        </div>
        {/*<div className="mb-6">*/}
        {/*  <label*/}
        {/*    className={*/}
        {/*      "block text-gray-200 text-sm font-bold mb-2" + formHeading*/}
        {/*    }*/}
        {/*  >*/}
        {/*    File to upload*/}
        {/*  </label>*/}
        {/*  <input*/}
        {/*    className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"*/}
        {/*    id="file"*/}
        {/*    placeholder="Select Upload"*/}
        {/*    type="file"*/}
        {/*    accept=".pdf"*/}
        {/*    value={userPdf}*/}
        {/*    onChange={(e) => setUserPdf(e.target.value)}*/}
        {/*    required*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="flex items-center justify-between ">
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
              classes={"w-64 h-8 bg-gray-800 " + formHeading}
            >
              Upload
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
