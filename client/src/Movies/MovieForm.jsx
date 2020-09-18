import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const MovieForm = () => {
  const [movie, setMovie] = useState(initialState);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={movie.title}
            />
          </div>
          <div>
            <label htmlFor="director">Director</label>
            <input
              id="director"
              type="text"
              name="director"
              placeholder="Director"
              onChange={handleChange}
              value={movie.director}
            />
          </div>
          <div>
            <label htmlFor="metascore">Metascore</label>
            <input
              id="metascore"
              type="text"
              name="metascore"
              placeholder="Metascore"
              onChange={handleChange}
              value={movie.metascore}
            />
          </div>

          <button>Update Movie</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
