import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(slug){
            appwriteService.getPost(slug).then((post)=> {
                if(post){
                    setPost(post);
                } else {
                    setError('Post not found.');
                    navigate('/');
                }
            }).catch(() => {
                setError('Failed to fetch post.');
                navigate('/');
            })
        }else{
            setError('Invalid post identifier.');
            navigate('/');
        }
    }, [slug, navigate])

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : <div className="text-center py-8">Loading...</div>
}

export default EditPost
