import { useState } from 'react'
import Avatar from './Avatar'
import moment from 'moment'

type Props = {
    id: number
    text: string
    reactionsCount: {
        userId: number
        reaction: string
    }[]
    date: number
    user?: string
    userId: number
}

const reactions = {
    cool: '😎',
    nice: '👍',
    angry: '😠',
    shit: '💩'
}

export default function Post({
    id,
    text,
    reactionsCount,
    date,
    user,
    userId
}: Props) {
    const userReaction: string =
        reactionsCount.find(value => value.userId === userId)?.reaction || ''
    const [reaction, setReaction] = useState(userReaction)
    return (
        <div className="post border-b-2 border-green-400 p-4 text-2xl last:border-0">
            {user && (
                <div className="flex items-center pb-2">
                    <Avatar size={64} name={user} />
                    <span className="pl-4">{user}</span>
                </div>
            )}
            <p className="block pb-2 text-left">{text}</p>
            <footer className="flex items-center justify-between">
                <div className="reactions">
                    {/* FIXME: change this to map incoming reactionsCount object */}
                    <button
                        className={
                            reaction == 'cool' ? 'btn text-green-500' : 'btn'
                        }
                    >
                        {reactions.cool}:{' '}
                        {
                            reactionsCount.filter(el => el.reaction == 'cool')
                                .length
                        }
                    </button>
                    <button
                        className={
                            reaction == 'like' ? 'btn text-green-500' : 'btn'
                        }
                    >
                        {reactions.cool}:{' '}
                        {
                            reactionsCount.filter(el => el.reaction == 'like')
                                .length
                        }
                    </button>
                    <button
                        className={
                            reaction == 'shit' ? 'btn text-green-500' : 'btn'
                        }
                    >
                        {reactions.cool}:{' '}
                        {
                            reactionsCount.filter(el => el.reaction == 'shit')
                                .length
                        }
                    </button>
                    <button
                        className={
                            reaction == 'angry' ? 'btn text-green-500' : 'btn'
                        }
                    >
                        {reactions.cool}:{' '}
                        {
                            reactionsCount.filter(el => el.reaction == 'angry')
                                .length
                        }
                    </button>
                    {/* {reactionsCount.map(reaction => {
                        return (
                            <button
                                className={
                                    reaction.reaction == userReaction
                                        ? 'btn text-green-500'
                                        : 'btn'
                                }
                                onClick={() => {
                                    setReaction(reaction.reaction)
                                }}
                                key={id + reaction.reaction}
                            >
                                {reactions[reaction.reaction]}
                                {reactionsCount[reaction.reaction]}
                            </button>
                        )
                    })} */}
                    {/* {Object.keys(reactionsCount).map(key => {
                        if (key == 'user_reaction') return
                        return (
                            <button
                                className={
                                    reaction == key
                                        ? 'btn text-green-500'
                                        : 'btn'
                                }
                                onClick={() => {
                                    setReaction(key)
                                }}
                                key={id + reactions[key]}
                            >
                                {reactions[key]}
                                {reactionsCount[key]}
                            </button>
                        )
                    })} */}
                </div>
                <div className="post_date inline-block">
                    {moment.unix(date).format('DD/MM/YY')}
                </div>
            </footer>
        </div>
    )
}
