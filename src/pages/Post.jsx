import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 


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
      if(window.confirm('Are you sure you want to delete this post?')) {
        appwriteService.deletePost(post.$id).then((status)=> {
          if(status){
            appwriteService.deleteFile(post.featuredImage);
            navigate('/');
          }
        })
      }
    }

  return (
    post ? (
      <div>
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-xl' />
        </div>

        {isAuthor && (
          <div className='absolute right-6 top-6'>
            <Link to={`/edit-post/${post.$id}`}>
              <Button
              bgColor='bg-green-500'
              className='mr-3'
              >
                Edit
              </Button>
            </Link>
            <Button bgColor='bg-red-500' onClick={deletePost}>
              Delete
            </Button>

          </div>
        )}
        <div className='w-full mb-6'>
          <h1 className='text-2xl font-bold'>
            {post.title}
          </h1>
        </div>
        <div className='browser-css'>{parse(post.content)}</div>
      </Container>
    </div>
    ): <p>loading...</p>
  )
}

export default Post
