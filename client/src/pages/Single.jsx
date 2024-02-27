import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faC,
    faCoffee,
    faEdit,
    faMonument,
    faTrash,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";
import moment from 'moment'
import { AuthContext } from '../context/authContext';


const Single = () => {

  const [post, setPost] = useState({date:'', username:'', img:'', userImage: '', title: '', desc:'', cat:''})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split('/')[2]

  const {currentUser} = useContext(AuthContext)

  useEffect(()=> {
    const fetchData =async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data);
        console.log(res.data)
      } catch (error) {
        
      }
    }
    fetchData()
  }, [postId])

  const handleDelete =async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    }
    catch (err) {

    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  }
  


    return (
        <div className="single">
          <div className="content">
            <img src={`../upload/${post?.img}`} />
              <div className="user">
                <img src={`${post.userImage}`} />
                <span>Username: {post.username}</span>
              </div>
              <div className="info">
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {currentUser?.username === post.username && (<div className="edit">
                <Link to="/write?edit=2" state={post}>
                    <FontAwesomeIcon
                        icon={faEdit}
                        size="1x"
                        color="black"
                    />
                </Link>
                
                    <FontAwesomeIcon
                        icon={faTrash}
                        size="1x"
                        color="black"
                        onClick={handleDelete}
                    />
                
              </div>)}
              <div className="content">
              <h1>{post.title}</h1>
              <div>{getText(post.desc)}</div>
              </div>
            </div>

            <Menu cat={post.cat}/>
        </div>
    );
};

export default Single;
