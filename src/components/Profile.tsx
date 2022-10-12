import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'
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
    const dateJoined = '24/12/22'
    const [isLoading, setLoading] = useState(true)

    const editProfile = () => {
        console.log('edit profile click')
    }

    const follow = () => {
        console.log('follow')
    }
    // TODO: extract imageLoad and avatar logic to component
    const imageLoad = () => {
        document.querySelector('#avatar')?.classList.remove('hidden')
        setLoading(false)
    }

    return (
        <div className="m-auto border-white border-2 rounded-2xl md:w-[768px] sm:w-[640px] text-center flex flex-col grow">
            <header className="flex items-center justify-center">
                <div className="w-32 h-32">
                    {isLoading && <LoadingScreen />}
                    <img
                        src={`https://joeschmoe.io/api/v1/${name}`}
                        alt="ur profile pic"
                        id="avatar"
                        className="w-32 h-32 mr-16 rounded-full bg-gray-800 hidden"
                        onLoad={imageLoad}
                    />
                </div>
                <h1>{name}</h1>
            </header>
            <div className="profile_panel border-gray-500 border-2 flex flex-col items-start py-2">
                {current ? (
                    <button className="btn ml-4 mb-2" onClick={editProfile}>
                        edit profile
                    </button>
                ) : (
                    <button className="btn ml-4" onClick={follow}>
                        follow
                    </button>
                )}
                <div className="profile_panel_numbers flex justify-between px-4 w-full">
                    <span>
                        {followers} followers, {following} following
                    </span>
                    <span>joined {dateJoined}</span>
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
