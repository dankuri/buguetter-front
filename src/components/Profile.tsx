import { useEffect, useState } from 'react'
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

type Posts = {
    [id: number]: {
        data: number
        reactions: {
            angry: number
            cool: number
            nice: number
            shit: number
            user_reaction: 'angry' | 'cool' | 'nice' | 'shit' | null
        }
        text: string
    }
}

export default function Profile({
    current,
    name,
    followers,
    following,
    userId
}: Props) {
    const [section, setSection] = useState('posts')
    const [posts, setPosts] = useState<Posts>({})
    const [isLoading, setLoading] = useState(false)
    const dateJoined = '24/12/22'

    const editProfile = () => {
        console.log('edit profile click')
    }

    const follow = () => {
        console.log('follow')
    }
    // TODO: add sections to deps and different routes for them
    useEffect(() => {
        console.log('Profile useEffect')
        setLoading(true)
        const getPosts = async () => {
            try {
                const res = await fetch('/api/get_user_post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({ user_id: userId })
                })
                const data = await res.json()
                if (data.msg == 'new_token') getPosts()
                else {
                    setPosts(data)
                    console.log(data)
                    setLoading(false)
                }
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
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
                                id={parseInt(key)}
                                text={posts[parseInt(key)].text}
                                date={posts[parseInt(key)].data * 1000}
                                reactionsCount={posts[parseInt(key)].reactions}
                                key={parseInt(key)}
                            />
                        ))
                    ) : (
                        <LoadingScreen />
                    )}
                </div>
            ) : section == 'likes' ? (
                <div className="likes">
                    {/* <Post
                        id={798324}
                        text="like me pls"
                        reactionsCount={{
                            cool: 1488,
                            nice: 19,
                            angry: 2,
                            shit: 0,
                            user_reaction: 'cool'
                        }}
                        date={Date.now()}
                        user={'anton'}
                    />
                    <Post
                        id={798325}
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
                        reactionsCount={{
                            cool: 322,
                            nice: 135,
                            angry: 3452,
                            shit: 2345,
                            user_reaction: 'nice'
                        }}
                        date={1665491590000}
                        user={'oleg'}
                    /> */}
                    likes will be here
                </div>
            ) : section == 'comments' ? (
                <div className="comments">
                    {/* <Post
                        id={798326}
                        text="wow"
                        reactionsCount={{
                            cool: 2354,
                            nice: 234,
                            angry: 65,
                            shit: 587,
                            user_reaction: 'shit'
                        }}
                        date={Date.now()}
                        user={'danya'}
                    />
                    <Post
                        id={798327}
                        text="amazing"
                        reactionsCount={{
                            cool: 5867,
                            nice: 98,
                            angry: 40,
                            shit: 0,
                            user_reaction: 'cool'
                        }}
                        date={Date.now()}
                        user={'danya'}
                    />
                    <Post
                        id={798328}
                        text="this will be dead..."
                        reactionsCount={{
                            cool: 32043,
                            nice: 123,
                            angry: 2030,
                            shit: 1,
                            user_reaction: 'angry'
                        }}
                        date={Date.now()}
                        user={'valera'}
                    /> */}
                    comments will be here
                </div>
            ) : (
                <div className="error">wtf</div>
            )}
        </div>
    )
}
