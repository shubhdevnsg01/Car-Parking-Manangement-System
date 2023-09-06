import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";

const Banner = ({ carName, ownerName, description, id, image, time }) => {
  const handleEndParking = async () => {
    try {
      const res = await axiosPrivate.post("/parking/unpark-car");
      console.log(res.data);
    } catch (e) {}
  };

  return (
    <div className="m-10">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-xl dark:bg-gray-800 dark:border-gray-700 flex">
        <img
          className="rounded-t-lg w-[250px] h-[250px] m-6"
          src={image}
          alt=""
        />
        <div className="p-5">
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
            {carName}
          </h5>
          <h5 className="text-gray-900 font-semibold text-2xl tracking-tight mb-2 dark:text-white">
            {ownerName}
          </h5>
          <p className="font-normal text-gray-700 mb-2 dark:text-gray-400">
            {description}
          </p>
          <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
            Parking started {Math.floor(time / (1000 * 60))} min ago
          </p>
          <p className="font-normal text-gray-700 mb-1 dark:text-gray-400">
            Safety QR
          </p>
          <img
            className="rounded-t-lg w-[150px] h-[150px] my-1"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`}
            alt=""
          />
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEndParking}
          >
            End Parking
          </button>
        </div>
      </div>
    </div>
  );
};

const ParkingBanners = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosPrivate.get("/auth/me");
        setUser(res.data);
        console.log("user:", res.data);
      } catch (e) {
        alert("Parking Banner Error");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {user?.parkingDetails ? (
        <>
          <Banner
            carName={user.carName}
            ownerName={user.ownerName}
            description={user.description}
            image={user.image}
            id={user.id}
            time={Date.now() - user.parkingDetails.entryTime}
          />
        </>
      ) : (
        <>No Parkings to display</>
      )}
    </>
  );
};

export default ParkingBanners;
