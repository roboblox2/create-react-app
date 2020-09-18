import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metscore: "",
};

function UpdateMovie() {
  const history = useHistory();
  const { id } = useParams(); // useParams returns an object with all the dynamic params as properties
  const { movie, setMovie } = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, [id, setMovie]);
  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  const submitMovie = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log("handleSumbmit", res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={submitMovie}>
        <label htmlFor="name">
          Name: &nbsp;
          <input
            type="text"
            name="name"
            id="name"
            value={movie.title}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="director">
          Age: &nbsp;
          <input
            type="text"
            id="director"
            name="director"
            value={movie.director}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="metascore">
          Email: &nbsp;
          <input
            type="text"
            id="metascore"
            name="metascore"
            value={movie.metascore}
            onChange={onInputChange}
          />
        </label>
        <button>Add Movie</button>
      </form>
    </div>
  );
}

export default UpdateMovie;
