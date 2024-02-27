import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(state?.img || null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();
  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      }
    } catch (error) {}
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      console.log("this is ", state);
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : state.img,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor"
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            <h1>Upload Image</h1>
          </label>
          <div className="buttons">
            <button>Save as draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              checked={cat === "art"}
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">ART</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              checked={cat === "science"}
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">SCIENCE</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              checked={cat === "design"}
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">DESIGN</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              checked={cat === "technology"}
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">TECHNOLOGY</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              checked={cat === "cinema"}
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">CINEMA</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              checked={cat === "food"}
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">FOOD</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
