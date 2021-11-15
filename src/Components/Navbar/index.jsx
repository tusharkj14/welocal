import * as React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import logo from "../../utils/logo.png";
import user from "../../utils/user.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();

  let type = JSON.parse(localStorage.getItem("user")).type;

  const navigation = [
    {
      name: type === "companies" ? "Companies" : "Financial Institution",
      href: type === "companies" ? "/Companies" : "/FinancialInstitution",
      current:
        location.pathname === "/Companies" ||
        location.pathname === "/FinancialInstitution",
    },
  ];

  if (type === "companies") {
    navigation.push({
      name: "Invoices",
      href: "/Invoices",
      current: location.pathname === "/Invoices",
    });
  }

  const logStatus = localStorage.getItem("jwt") ? "Log Out" : "Log In";

  const Logout = () => {
    history.push(`/`);
    toast.success("Logged Out");
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  return (
    <div className="w-full bg-black">
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-16 w-auto rounded-full p-2"
                      src={logo}
                      alt="Invorify"
                    />
                    <img
                      className="hidden lg:block h-16 w-auto mb-1 rounded-full p-2"
                      src={logo}
                      alt="Invorify"
                    />
                  </div>
                  <div className="hidden sm:flex flex-row justify-center items-center ml-4">
                    <div>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-2xl font-sans ml-2 font-bold"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button
                            className="bg-gray-800 flex text-sm rounded-full 
                          outline-none ring-2 ring-gray-500"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className={"h-12 w-auto rounded-full "}
                              src={user}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 font-sans text-xl font-medium "
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 font-sans text-xl font-medium "
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item onClick={Logout}>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active ? "bg-red-600 text-white" : "",
                                    "block px-4 py-2 text-sm cursor-pointer font-sans text-xl font-medium "
                                  )}
                                >
                                  {logStatus}
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
