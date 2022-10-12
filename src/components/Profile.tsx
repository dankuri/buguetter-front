import { useState } from 'react'
import Post from './Post'

type Props = {
    current: boolean
    name: string
}

export default function Profile({ current, name }: Props) {
    const [section, setSection] = useState('posts')
    // const [posts, setPosts] = useState([]);
    const followers = 1337
    const following = 228

    const editProfile = () => {
        console.log('edit profile click')
    }

    return (
        <div className="m-auto border-white border-2 rounded-2xl max-w-screen-md text-center">
            <header className="flex items-center justify-center">
                <img
                    src={`https://joeschmoe.io/api/v1/${name}`}
                    alt="ur profile pic"
                    className="w-32 h-32 mr-16 rounded-full bg-gray-800"
                />
                <h1>{name}</h1>
            </header>
            <div className="profile_panel border-gray-500 border-2 flex flex-col items-center justify-center">
                <button className="btn" onClick={editProfile}>
                    edit profile
                </button>
                <div className="profile_panel_numbers">
                    <span>
                        {followers} followers, {following} following
                    </span>
                </div>
            </div>
            <div className="profile_panel_select grid grid-cols-3 space-x-7">
                <button className="btn" onClick={() => setSection('posts')}>
                    posts
                </button>
                <button className="btn" onClick={() => setSection('likes')}>
                    likes
                </button>
                <button className="btn" onClick={() => setSection('comments')}>
                    comments
                </button>
            </div>
            {section == 'posts' ? (
                <div className="posts">
                    <Post
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactions={{ '😨': 420, '🔥': 120 }}
                        date={1665491590000}
                    />
                    <Post
                        text="henlo world"
                        reactions={{ '🍑': 120, '🔥': 12 }}
                        date={1040733190000}
                    />
                    <Post
                        text="bruh moment"
                        reactions={{ '😭': 1488, '🍑': 19, '🔥': 2 }}
                        date={1000211590000}
                    />
                    <Post
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactions={{ '😨': 420, '🔥': 120 }}
                        date={1665491590000}
                    />
                    <Post
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactions={{ '😨': 420, '🔥': 120 }}
                        date={1665491590000}
                    />
                    <Post
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactions={{ '😨': 420, '🔥': 120 }}
                        date={1665491590000}
                    />
                </div>
            ) : section == 'likes' ? (
                <div className="likes">
                    <Post
                        text="like me pls"
                        reactions={{ '😭': 1488, '🍑': 19, '🔥': 2 }}
                        date={Date.now()}
                        user={name}
                    />
                </div>
            ) : section == 'comments' ? (
                <div className="comments">
                    <p>wow</p>
                    <p>amazing</p>
                </div>
            ) : (
                <div className="error">wtf</div>
            )}
        </div>
    )
}
