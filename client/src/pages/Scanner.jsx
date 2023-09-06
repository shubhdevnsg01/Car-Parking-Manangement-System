import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { axiosPrivate } from "../api/axios";

const Scanner = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const handleScanError = (e) => {
    // setError(e);
  };
  const handleScan = (d) => {
    if (d) {
      setData(d.text);
    }
  };
  const handleSubmit = async (event) => {
    event.target.innerHTML = "Verifying..";
    try {
      const res = await axiosPrivate.post("parking/park-car", {
        userId: data,
      });
      event.target.innerHTML = "Done!";
      console.log(res.data);
      setUser(res.data.user);
    } catch (e) {
      event.target.innerHTML = "Failed!";
      setError(e.response.data.message);
    }
  };

  return (
    <div className="w-[600px] mt-10 mx-auto">
      <QrReader delay={5000} onError={handleScanError} onScan={handleScan} />
      {data ? (
        <>
          <div
            class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>{data}</p>
            <button
              onClick={handleSubmit}
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-48"
            >
              Allow To Park
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      {error ? (
        <div role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 mt-5">
            Cannot Allow To Enter
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      {user ? (
        <div className="flex justify-around mt-10">
          <img className="w-44 h-44" src={user.image} alt="" />
          <div>
            <h1 class="text-4xl font-medium text-gray-700">{user.name}</h1>
            <p>ID: {user.id}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Scanner;
