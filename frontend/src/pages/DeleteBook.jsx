import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book successfully deleted", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar(
          "An error has occured. Check the console for more information",
          { variant: "error" }
        );
      });
  };

  return (
    <div className="p-4 ">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
export default DeleteBook;
