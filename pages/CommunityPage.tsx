
import React, { useState } from 'react';
import { mockCommunityPosts, mockUsersById, mockAchievements } from '../data/mockData';
import { CommunityPost, Achievement } from '../types';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { HeartIcon, ChatBubbleIcon, TrophyIcon } from '../components/icons';

// Helper to format date
const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

// FIX: Changed PostCard to a React.FC to fix an issue where the 'key' prop was being incorrectly assigned, causing a type error.
const PostCard: React.FC<{ post: CommunityPost; onLike: (postId: string) => void; onAddComment: (postId: string, content: string) => void }> = ({ post, onLike, onAddComment }) => {
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState('');
    const author = mockUsersById[post.authorId];
    const hasLiked = user ? post.likes.includes(user.id) : false;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment(post.id, comment);
            setComment('');
        }
    };

    return (
        <Card className="p-6 ">
            <div className="flex items-start space-x-4">
                <img src={author?.avatarUrl} alt={author?.name} className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <p className="font-bold text-gray-900">{author?.name}</p>
                        <p className="text-sm text-gray-500">· {timeSince(post.timestamp)}</p>
                    </div>
                    <p className="mt-2 text-gray-800">{post.content}</p>
                </div>
            </div>
            <div className="mt-4 flex items-center space-x-6 text-gray-500">
                <button
                    onClick={() => onLike(post.id)}
                    className={`flex items-center space-x-1.5 group focus:outline-none ${hasLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                    aria-label="Like post"
                    disabled={!user}
                >
                    <HeartIcon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${hasLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes.length}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1.5 hover:text-blue-500 group focus:outline-none" aria-label="Comment on post">
                    <ChatBubbleIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    <span>{post.comments.length}</span>
                </button>
            </div>
            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    {post.comments.map(c => {
                        const commentAuthor = mockUsersById[c.authorId];
                        return (
                            <div key={c.id} className="flex items-start space-x-3 mb-3">
                                <img src={commentAuthor?.avatarUrl} alt={commentAuthor?.name} className="h-8 w-8 rounded-full" />
                                <div className="bg-gray-100 rounded-lg p-3 flex-1">
                                    <p className="font-semibold text-sm text-gray-800">{commentAuthor?.name}</p>
                                    <p className="text-sm text-gray-700">{c.content}</p>
                                </div>
                            </div>
                        );
                    })}
                    {user && (
                        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mt-4">
                            <img src={user.avatarUrl} alt={user.name} className="h-8 w-8 rounded-full" />
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>
                    )}
                </div>
            )}
        </Card>
    );
};

const CreatePost = ({ onAddPost }: { onAddPost: (content: string) => void }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onAddPost(content);
            setContent('');
        }
    };

    if (!user) return null;

    return (
        <Card className="p-4 mb-8">
            <form onSubmit={handleSubmit} className="flex items-start space-x-4">
                <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${user.name}?`}
                        rows={3}
                        className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={!content.trim()}>Post</Button>
                    </div>
                </div>
            </form>
        </Card>
    );
};

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
  <Card variant="elevated" className="flex flex-col">
    <img className="h-56 w-full object-cover" src={achievement.imageUrl} alt={achievement.title} />
    <div className="p-6 flex-grow flex flex-col">
       <div className="flex items-center justify-between">
         <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start ${
            achievement.category === 'Faculty' ? 'bg-indigo-100 text-indigo-800' : 
            achievement.category === 'Student' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
          }`}>{achievement.category}</span>
          <p className="text-sm text-gray-500">{achievement.date}</p>
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">{achievement.title}</h3>
      <p className="mt-2 text-gray-700 font-medium">{achievement.recipient}</p>
      <p className="mt-2 text-gray-600 flex-grow">{achievement.description}</p>
    </div>
  </Card>
);

// FIX: Changed CommunityPage to a React.FC to fix a type error when used as a route element.
const CommunityPage: React.FC = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
    const [achievementFilter, setAchievementFilter] = useState<'All' | 'Faculty' | 'Student' | 'University'>('All');
  
    const filteredAchievements = mockAchievements.filter(a => achievementFilter === 'All' || a.category === achievementFilter);


    const handleAddPost = (content: string) => {
        if (!user) return;
        const newPost: CommunityPost = {
            id: `post-${Date.now()}`,
            authorId: user.id,
            content,
            timestamp: new Date().toISOString(),
            likes: [],
            comments: []
        };
        setPosts([newPost, ...posts]);
    };

    const handleLike = (postId: string) => {
        if (!user) return;
        setPosts(posts.map(p => {
            if (p.id === postId) {
                const hasLiked = p.likes.includes(user.id);
                const newLikes = hasLiked
                    ? p.likes.filter(uid => uid !== user.id)
                    : [...p.likes, user.id];
                return { ...p, likes: newLikes };
            }
            return p;
        }));
    };
    
    const handleAddComment = (postId: string, content: string) => {
        if (!user) return;
        setPosts(posts.map(p => {
            if (p.id === postId) {
                const newComment = {
                    id: `comment-${Date.now()}`,
                    authorId: user.id,
                    content,
                    timestamp: new Date().toISOString()
                };
                return { ...p, comments: [...p.comments, newComment] };
            }
            return p;
        }));
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Read our latest posts, share ideas, and celebrate achievements from the Center of Excellence.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <CreatePost onAddPost={handleAddPost} />

                    <div className="space-y-8">
                        {posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((post: CommunityPost) => (
                            <PostCard key={post.id} post={post} onLike={handleLike} onAddComment={handleAddComment} />
                        ))}
                    </div>
                </div>

                {/* --- Achievements Section --- */}
                <div className="mt-24">
                    <div className="text-center">
                        <TrophyIcon className="mx-auto h-12 w-12 text-orange-accent" />
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Recent Achievements</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                            Celebrating the remarkable achievements of our members.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button onClick={() => setAchievementFilter('All')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${achievementFilter === 'All' ? 'bg-dark-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>All</button>
                        <button onClick={() => setAchievementFilter('Faculty')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${achievementFilter === 'Faculty' ? 'bg-dark-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Faculty</button>
                        <button onClick={() => setAchievementFilter('Student')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${achievementFilter === 'Student' ? 'bg-dark-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Students</button>
                        <button onClick={() => setAchievementFilter('University')} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${achievementFilter === 'University' ? 'bg-dark-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>University</button>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAchievements.map(achievement => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
