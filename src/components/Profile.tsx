import { useEffect, useState } from 'react'
import { apiFetchGetData } from '../apiFetch'
import Avatar from './Avatar'
import LoadingScreen from './LoadingScreen'
import Post from './Post'

type Props = {
    current: boolean
    name: string
    followers: number
    following: number
    userId: number
}

export default function Profile({
    current,
    name,
    followers,
    following,
    userId
}: Props) {
    const [section, setSection] = useState('posts')
    const [posts, setPosts] = useState({})
    const [isLoading, setLoading] = useState(false)
    const dateJoined = '24/12/22'

    const editProfile = () => {
        console.log('edit profile click')
    }

    const follow = () => {
        console.log('follow')
    }

    useEffect(() => {
        console.log('Profile useEffect')
        setLoading(true)
        const getPosts = async () => {
            const data = await apiFetchGetData('/api/get_user_post', 'POST', {
                user_id: userId
            })
            setPosts(data)
            setLoading(false)
            console.log(data)
        }

        getPosts()
    }, [userId])

    return (
        <div className="m-auto flex grow flex-col rounded-2xl border-2 border-white text-center sm:w-[640px] md:w-[768px]">
            <header className="flex items-center justify-around px-48">
                <Avatar name={name} size={128} />
                <h1>{name}</h1>
            </header>
            <div className="profile_panel flex flex-col items-start border-2 border-gray-500 p-4 text-2xl">
                {current ? (
                    <button className="btn mb-4" onClick={editProfile}>
                        edit profile
                    </button>
                ) : (
                    <button className="btn mb-4" onClick={follow}>
                        follow
                    </button>
                )}
                <div className="profile_panel_numbers flex w-full justify-between">
                    <span>
                        {followers} followers, {following} following
                    </span>
                    <span>joined {dateJoined}</span>
                </div>
            </div>
            <div className="profile_panel_select grid grid-cols-3 space-x-7 border-b-2 text-2xl">
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
                    {!isLoading ? (
                        Object.keys(posts).map(key => (
                            <Post
                                text={posts[key].text}
                                date={posts[key].data * 1000}
                                reactionsCount={posts[key].reactions}
                                key={key}
                            />
                        ))
                    ) : (
                        <LoadingScreen />
                    )}
                </div>
            ) : section == 'likes' ? (
                <div className="likes">
                    <Post
                        text="like me pls"
                        reactionsCount={{ '😭': 1488, '🍑': 19, '🔥': 2 }}
                        date={Date.now()}
                        user={'anton'}
                    />
                    <Post
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactionsCount={{ '😨': 420, '🔥': 120 }}
                        date={1665491590000}
                        user={'oleg'}
                    />
                </div>
            ) : section == 'comments' ? (
                <div className="comments">
                    <Post
                        text="wow"
                        reactionsCount={{ '🔥': 8324 }}
                        date={Date.now()}
                        user={'danya'}
                    />
                    <Post
                        text="amazing"
                        reactionsCount={{ '🔥': 9824 }}
                        date={Date.now()}
                        user={'danya'}
                    />
                    <Post
                        text="this will be dead..."
                        reactionsCount={{ '😭': 19123 }}
                        date={Date.now()}
                        user={'valera'}
                    />
                </div>
            ) : (
                <div className="error">wtf</div>
            )}
        </div>
    )
}
