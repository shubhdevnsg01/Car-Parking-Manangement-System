import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  return (
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-24">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p class="font-bold text-gray-700 text-xl">10</p>
              <p class="text-gray-400">Total Hours Parked</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">10</p>
              <p class="text-gray-400">Events</p>
            </div>
            <div>
              <p class="font-bold text-gray-700 text-xl">6.5 ⭐</p>
              <p class="text-gray-400">Rating</p>
            </div>
          </div>
          <div class="relative">
            <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <img className="w-44 h-44 rounded-full" src={auth.user.image} />
            </div>
          </div>
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            
          </div>
        </div>
        <div class="mt-20 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">
            {auth.user.name},<span class="font-light text-gray-500"> 01</span>
          </h1>
          <p class="font-light text-gray-600 mt-3">Noida, Utter Pradesh</p>
         
          <p class="mt-2 text-gray-500">
            Jaypee Institute Of Information Technology
          </p>
        </div>
        <div class="mt-12 flex flex-col justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
