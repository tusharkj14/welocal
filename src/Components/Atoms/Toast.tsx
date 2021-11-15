import * as React from "react";
import { Toaster, ToastBar, toast } from "react-hot-toast";

const Toast: React.FC = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: "rgba(20, 20, 20, 0.85)",
          color: "rgba(255, 255, 255, 1)",
          cursor: "pointer",
          marginBottom: "10px",
          padding: "0px",
        },
        success: {
          duration: 4000,
        },
      }}
    >
      {(items) => (
        <ToastBar toast={items} position="bottom-left">
          {({ icon = "", message = "" }: any) => (
            <>
              <div
                className={`bg-${
                  items.type === "success"
                    ? "green-500"
                    : items.type === "error"
                    ? "red-500"
                    : "gray-500"
                } h-full w-2 rounded-l-lg`}
              />
              <div className="flex items-center justify-between py-2 px-3">
                {icon}
                {message}
                {items.type !== "loading" && (
                  <i
                    onClick={() => toast.dismiss(items.id)}
                    className="bx bx-x ml-2 text-2xl text-gray-500 hover:text-white"
                  />
                )}
              </div>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
