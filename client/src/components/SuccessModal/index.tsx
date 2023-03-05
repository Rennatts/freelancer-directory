import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";

interface ISuccessModalProps {
  showSuccessModal: boolean,
  onHandleSuccessStatusChange: (newSuccessStatus: boolean) => void;
}


export const SuccessModal = ({showSuccessModal, onHandleSuccessStatusChange}: ISuccessModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [ status, setStatus ] = React.useState({
    isValid: false,
    message: "",
  })

  const handleButtonClick = () => {
    const newSuccessStatus: boolean = false
    onHandleSuccessStatusChange(newSuccessStatus);
  };


  return (
    <>
      {showSuccessModal ? (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between p-5 border-b border-solid border-gray-300 rounded-t flex-col">
                            <div className="w-full mt-27 mb-20 flex flex-col items-center flex-center mt-6">
                              <GrStatusGood color="blue" size="60px"></GrStatusGood>
                              <h2 className="mt-6">SUCCESS</h2>
                              <p className="mt-6">User registered</p>
                            </div>
                            <div className="flex justify-center items-center flex-center">
                              <button className="bg-teal-500 text-white active:bg-teal-300 font-bold px-6 py-3 rounded shadow hover:shadow-lg hover:bg-teal-300 hover:border-teal-300 hover:tex-black outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => handleButtonClick()}>Close
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : null}
    </>
  );
};