import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdError } from "react-icons/md";
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IMessageModalProps {
  show: boolean,
  userId?: string;
}


const ReviewModal = ({show, userId}: IMessageModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = React.useState<number>(0);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [ reviewText, setReviewText ] = React.useState<string>()

  let { freelancerId } = useParams() as any;

  const context = React.useContext(UserContext);

  const navigate = useNavigate();

  useEffect(()=> {
    if(show){
      setShowModal(show)
    }
  },[show])


  function handleReviewSubmit(){
    const ratingData = {
      userId: userId,
      score: rating,
    }

    axios.put(`http://localhost:3000/api/freelancer/rating/${freelancerId}`, ratingData)
    .then((res) => {
      if(res.status === 200){
        setSuccess(true)
      }
    })
    .catch((err) => setError(true));

    const newReview = {
      reviewText: reviewText,
      userId: userId,
    }

    axios.put(`http://localhost:3000/api/freelancer/review/${freelancerId}`, newReview)
    .then((res) => {
      if(res.status === 200){
        setSuccess(true)
      }
    })
    .catch((err) => setError(true));

    setShowModal(false)
    window.location.reload();

  }

  return (
    <>
      {showModal ? (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between p-5 border-b border-solid border-gray-300 rounded-t flex-col">
                          <div className="cursor-pointer" onClick={() => setShowModal(false)}>
                            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                          </div>
                            <div className="w-full mt-27 mb-20 flex flex-col items-center flex-center mt-6">
                              <h2 className="mt-6 text-xl text-teal-500">Create Review</h2>
                              <div className='text-xl mt-6'>
                                <StarRatingComponent 
                                name="rate1" 
                                starCount={5}
                                value={rating}
                                onStarClick={(rating: any)=> setRating(rating)}
                                />
                              </div>
                              <div className="flex items-start flex-col mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Description 
                                </label>
                                <textarea               
                                id="input" 
                                name='reviewText'
                                value={reviewText}
                                onChange={(event)=> setReviewText(event.target.value)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                                </textarea>
                              </div>
                            </div>
                            <div className="flex justify-center items-center flex-center">
                              <button className="bg-teal-500 text-white active:bg-teal-300 font-bold px-6 py-3 rounded shadow hover:shadow-lg hover:bg-teal-300 hover:border-teal-300 hover:tex-black outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={handleReviewSubmit}>Submit
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

export default ReviewModal;