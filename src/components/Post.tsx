import { useEffect, useState } from 'react'
import Avatar from './Avatar'
import moment from 'moment'

type Props = {
    id: number
    text: string
    reactionsCount: {
        cool: number
        nice: number
        angry: number
        shit: number
        user_reaction: string
    }
    date: number
    user?: string
}

const reactions = {
    cool: '😎',
    nice: '👍',
    angry: '😠',
    shit: '💩'
}

// const formatDate = (date: number) => {
//     const dateObject = new Date(date)
//     const day = dateObject.getDate()
//     const rawMonth = dateObject.getMonth() + 1
//     const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth
//     const year = dateObject.getFullYear().toString().slice(2)
//     return `${day}/${month}/${year}`
// }

export default function Post({ id, text, reactionsCount, date, user }: Props) {
    const [reaction, setReaction] = useState(reactionsCount.user_reaction)

    const sendReaction = async (reaction: string) => {
        try {
            const res = await fetch('/api/add_reaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ post_id: id, reactions: reaction })
            })
            const data = await res.json()
            if (data.msg == 'new_token') sendReaction(reaction)
            else console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="post border-b-2 border-green-400 p-4 text-2xl last:border-0">
            {user && (
                <div className="flex items-center pb-2">
                    <Avatar size={64} name={user} />
                    <span className="pl-4">{user}</span>
                </div>
            )}
            <span className="block pb-2 text-left">{text}</span>
            <footer className="flex items-center justify-between">
                <div className="reactions">
                    {Object.keys(reactionsCount).map(key => {
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
                                    sendReaction(key)
                                }}
                            >
                                {reactions[key]}
                                {reactionsCount[key]}
                            </button>
                        )
                    })}
                    {/* <button className="btn">
                        {reactions.cool}
                        {reactionsCount.cool}
                    </button>
                    <button className="btn">
                        {reactions.nice}
                        {reactionsCount.nice}
                    </button>
                    <button className="btn">
                        {reactions.angry}
                        {reactionsCount.angry}
                    </button>
                    <button className="btn">
                        {reactions.shit}
                        {reactionsCount.shit}
                    </button> */}
                </div>
                <div className="post_date inline-block">
                    {moment.unix(date).format('DD/MM/YY')}
                </div>
            </footer>
        </div>
    )
}
