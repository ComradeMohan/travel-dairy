import React from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

interface TravelCardProps {
  id: string;
  image: string;
  location: string;
  date: string;
  description: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked: boolean;
  onLike: () => void;
}

export default function TravelCard({ 
  image, 
  location, 
  date, 
  description, 
  likes, 
  comments, 
  tags,
  isLiked,
  onLike 
}: TravelCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="relative aspect-[4/3]">
        <img
          src={image}
          alt={location}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center text-white">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{date}</div>
        <p className="text-gray-800 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <button 
            onClick={onLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-rose-500">
            <MessageCircle className="h-5 w-5" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-rose-500">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}