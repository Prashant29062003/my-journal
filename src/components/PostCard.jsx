import React from 'react'
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';
const PostCard = ({$id, title, featuredImage}) => {
  const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : '/default-image.png';
  return (
    <div className="transition-transform duration-200 hover:scale-105">
      <Link to={`/post/${$id}`} className="block h-full">
        <div className="w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl p-4 shadow hover:shadow-lg h-full flex flex-col justify-between">
          <div className="w-full flex justify-center mb-4">
            <img 
              src={imageUrl} 
              alt={title || 'Post image'} 
              className="rounded-xl object-cover max-h-48 w-full border border-gray-200 shadow-sm bg-white"
              onError={e => { e.target.onerror = null; e.target.src = '/default-image.png'; }}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate" title={title}>{title}</h2>
          <span className="text-xs text-gray-500">Read more &rarr;</span>
        </div>
      </Link>
    </div>
  )
}

export default PostCard
