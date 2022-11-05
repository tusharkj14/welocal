import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

const formHeading =
  " text-base tracking-wider font-bold font-sans px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider";
const inputCss = "focus:outline-none focus:ring-4 focus:ring-green-600";

const List = ({}) => {
  const [list, setList] = React.useState([]);
  const [flagToRefetch, setFlagToRefetch] = React.useState(false);
  const [isApplyingId, setIsApplyingId] = React.useState(null);
  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    toast.loading("Fetching Invoices", { id: "Inv" });
    let jobType = JSON.parse(localStorage.getItem("user")).jobType;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/fetchInvFinancial`,
        { jobType },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        toast.success("Invoices Fetched");
        toast.dismiss("Inv");
        setList(res.data);
      })
      .catch((err) => {
        toast.error(
          err && err.response && err.response.data
            ? err.response.data
            : "An error occurred"
        );
        toast.dismiss("Inv");
      });
  }, [flagToRefetch]);

  const Apply = (id) => {
    toast.loading("Approving", { id: "approve" });
    let applierId = JSON.parse(localStorage.getItem("user"))._id;
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/ApproveInvoice`,
        { id, applierId , biddingPrice : price },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        toast.success("Approved");
        toast.dismiss("approve");
        setFlagToRefetch(!flagToRefetch);
      })
      .catch((err) => {
        toast.error(
          err && err.response && err.response.data
            ? err.response.data
            : "An error occurred"
        );
        toast.dismiss("approve");
        setFlagToRefetch(!flagToRefetch);
      });
  };

  const Delete = (id) => {
    toast.loading("Deleting", { id: "delete" });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/DeleteInvoice`,
        { id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        toast.success("Deleted");
        toast.dismiss("delete");
        setFlagToRefetch(!flagToRefetch);
      })
      .catch((err) => {
        toast.error(
          err && err.response && err.response.data
            ? err.response.data
            : "An error occurred"
        );
        toast.dismiss("delete");
        console.error(err);
        setFlagToRefetch(!flagToRefetch);
      });
  };

  console.log(list)

  return (
    <div
      className="flex flex-col sm:w-4/5 lg:w-3/4 w-full my-12
    min-h-1/2 border shadow-lg "
    >
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={formHeading}>
                    Sr. No
                  </th>
                  <th scope="col" className={formHeading}>
                    Date
                  </th>
                  <th scope="col" className={formHeading}>
                    Company Name
                  </th>
                  <th scope="col" className={formHeading}>
                    Invoice No.
                  </th>
                  <th scope="col" className={formHeading}>
                    Status
                  </th>
                  <th scope="col" />
                  <th scope="col" />
                  <th scope="col" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((item, index) => {
                  return (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1 || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(item.createdAt).format("DD/MM/YYYY") || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {moment(item.createdAt).format("hh:mm a") || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.userId.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.userId.userName || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.jobType || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.price || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {item.status || "N/A"}
                        </span>
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {item.status === "pending" ? (
                            <div>
                              {isApplyingId === item._id &&  <input
                                  className={
                                      "w-16 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight "
                                  }
                                  type="number"
                                  id="Price"
                                  placeholder="Enter Price"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                  required
                              /> }
                              {isApplyingId === item._id ? <a
                                  onClick={() => {
                                    console.log(item)
                                    Apply(item._id);
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                              >
                                Done
                              </a> :
                                  <a
                                      onClick={() => {
                                        console.log(item)
                                        setIsApplyingId(item._id)
                                      }}
                                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                  >
                                    Apply
                                  </a>}
                            </div>
                        ) : (
                          <a className="text-gray-400">Applied</a>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
