import * as React from 'react';
import {useEffect} from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const ProfileComponent = ({user}) => {
    return <div className="flex flex-wrap items-center justify-center w-full ">
        <div className="container mx-auto mt-24">
            <div>

                <div className="bg-white relative shadow rounded-lg w-5/6 md:w-4/6  lg:w-3/6 xl:w-2/6 mx-auto">
                    <div className="flex justify-center">
                        <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt=""
                             className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                    </div>

                    <div className="mt-16">
                        <h1 className="font-bold text-center text-3xl text-gray-900">{user.name}</h1>
                        <p className="text-center text-sm text-gray-400 font-medium">{user.jobType}</p>
                        <p className="text-center text-sm text-gray-400 font-medium">@{user.userName}</p>
                        <p>
                        <span>

                        </span>
                        </p>
                        <div className="my-5 px-6">
                            <a href="#"
                               className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Average
                                Rating : <span className="font-bold">4</span></a>
                        </div>
                        <div className="flex justify-between items-center my-5 px-6">
                            <a href=""
                               className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Speciality
                                1</a>
                            <a href=""
                               className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Speciality
                                2</a>
                            <a href=""
                               className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Speciality
                                3</a>
                            <a href=""
                               className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Speciality
                                4</a>
                        </div>

                        <div className="w-full">
                            <h3 className="font-medium text-gray-900 text-left px-6">Recent activites</h3>
                            <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                                <a href="#"
                                   className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt=""
                                         className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                    Successfully completed a Gig, got 5 star.
                                    <span className="text-gray-500 text-xs">24 min ago</span>
                                </a>

                                <a href="#"
                                   className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt=""
                                         className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                    Successfully completed a Gig, got 4 star.
                                    <span className="text-gray-500 text-xs">42 min ago</span>
                                </a>

                                <a href="#"
                                   className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                    <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt=""
                                         className="rounded-full h-6 shadow-md inline-block mr-2"/>
                                    Successfully Completed 15 <span className="font-bold">Gigs</span>
                                    <span className="text-gray-500 text-xs">4 days ago</span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

const Profile = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    return (
        <ProfileComponent user={user} />
    );
};

export default Profile;
