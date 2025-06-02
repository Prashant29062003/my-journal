import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const Post = () => {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state)=> state.auth.userdata);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(()=> {
      if(slug){
        appwriteService.getPost(slug).then((post)=> {
          if(post) setPost(post);
          else navigate('/');
        })
      }else{
        navigate('/');
      }
    },[slug, navigate]);

    const deletePost = () => {
      appwriteService.deletePost(post.$id).then((staus)=> {
        if(staus){
          appwriteService.deleteFile(post.featureImage);
          navigate('/');
        }
      })

    }
  return (
    <div>
      
    </div>
  )
}

export default Post
