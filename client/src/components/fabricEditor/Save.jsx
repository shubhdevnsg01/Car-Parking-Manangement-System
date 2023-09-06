import React, { useContext, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import canvasContext from "../../context/canvasContext";

const Save = ({ id, setHideParkcarcate, setProgress }) => {
  const { canvas } = useContext(canvasContext);
  const [save, setSave] = useState("save");
  const handleParkcarcateSave = async function () {
    const certi = JSON.stringify(canvas);
    try {
      setSave("saving..");
      await axiosPrivate.patch("/events/" + id, { certificate: certi });
      setSave("save");
      setHideParkcarcate(true);
      setProgress("33%");
    } catch (error) {
      alert("Error While Saving");
      console.log(error);
      setSave("save");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded m-1 px-10 py-2"
        onClick={handleParkcarcateSave}
      >
        {save}
      </button>
    </div>
  );
};

export default Save;
