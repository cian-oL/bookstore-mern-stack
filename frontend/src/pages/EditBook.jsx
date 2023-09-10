import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(({ data }) => {
        setAuthor(data.author);
        setTitle(data.title);
        setPublishYear(data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(
          "An error has occured. Check the console for more information",
          { variant: "error" }
        );
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
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
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author: </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Year Published:{" "}
            </label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};
export default EditBook;
