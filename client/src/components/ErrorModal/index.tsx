import React from "react";
import { MdError } from "react-icons/md";

interface Error {
  existError: boolean,
  errorMessage: string;
}

interface IErrorModalProps {
  error: Error,
  onHandleErrorChange: (newError: Error) => void;
}


export const ErrorModal = ({onHandleErrorChange, error}: IErrorModalProps) => {
  const handleButtonClick = () => {
    const newError: Error = {
      existError: false,
      errorMessage: "",
    };
    onHandleErrorChange(newError);
  };

  return (
    <>
      {error.existError ? (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between p-5 border-b border-solid border-gray-300 rounded-t flex-col">
                            <div className="w-full mt-27 mb-20 flex flex-col items-center flex-center mt-6">
                              <MdError color="red" size="60px"></MdError>
                              <h2 className="mt-6">ERROR</h2>
                              <p className="mt-6">{error.errorMessage}</p>
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