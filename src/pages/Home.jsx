import React, {useEffect, useState} from 'react'
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config'


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        appwriteService.getAllPosts()
            .then((posts)=> {
                if(posts){
                    setPosts(posts.documents)
                }
            })
            .catch(()=>{
                setError('Failed to load posts.');
            })
            .finally(()=>{
                setLoading(false);
            })
    },[])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>Loading...</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold text-red-500 hover:text-gray-500'>{error}</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>No posts found</h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
                {posts.map((post)=> (
                    <div key={post.$id} className='p-2 w-1/2'>
                        <PostCard post={post}/>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Home
