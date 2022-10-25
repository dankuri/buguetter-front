import { useState } from 'react'
import moment from 'moment'
import Avatar from './Avatar'
import { useMutation } from '@apollo/client'
import { AddReactionDocument, DeleteReactionDocument } from '../graphql/gql'

type PostProps = {
    id: number
    text: string
    reactions: {
        userId: number
        reaction: string
    }[]
    date: number
    user?: string
    userId: number
}

type ReactionProps = {
    type: 'cool' | 'nice' | 'angry' | 'shit'
    count: number
    selected: boolean
    onClick: () => Promise<void>
}

const reactionEmojis = {
    cool: '😎',
    nice: '👍',
    angry: '😠',
    shit: '💩'
}

const Reaction = ({ type, count, selected, onClick }: ReactionProps) => {
    return (
        <button
            className={selected ? 'btn text-green-500' : 'btn'}
            onClick={onClick}
        >
            {reactionEmojis[type]} {count}
        </button>
    )
}

export default function Post({
    id,
    text,
    reactions,
    date,
    user,
    userId
}: PostProps) {
    const userReaction: string =
        reactions.find(value => value.userId === userId)?.reaction || ''

    const [reactionCount] = useState({
        cool: reactions.filter(reaction => reaction.reaction == 'cool').length,
        nice: reactions.filter(reaction => reaction.reaction == 'nice').length,
        angry: reactions.filter(reaction => reaction.reaction == 'angry')
            .length,
        shit: reactions.filter(reaction => reaction.reaction == 'shit').length
    })

    const [reaction, setReaction] = useState(userReaction)
    const [addReactionMutation] = useMutation(AddReactionDocument)
    const [deleteReactionMutation] = useMutation(DeleteReactionDocument)

    const sendReaction = async (
        newReaction: 'cool' | 'nice' | 'angry' | 'shit'
    ) => {
        // FIXME: try to avoid this ts ignore
        // @ts-ignore
        if (reaction) reactionCount[reaction] -= 1
        if (reaction != newReaction) {
            setReaction(newReaction)
            await addReactionMutation({
                variables: {
                    postId: id,
                    reaction: newReaction,
                    section: 'post'
                }
            })
            reactionCount[newReaction] += 1
        } else {
            setReaction('')
            await deleteReactionMutation({
                variables: {
                    postId: id,
                    section: 'post'
                }
            })
        }
    }
    // TODO: change it so it updates with incoming data
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
                    <Reaction
                        count={reactionCount.cool}
                        selected={reaction == 'cool'}
                        type="cool"
                        onClick={() => sendReaction('cool')}
                    />
                    <Reaction
                        count={reactionCount.nice}
                        selected={reaction == 'nice'}
                        type="nice"
                        onClick={() => sendReaction('nice')}
                    />
                    <Reaction
                        count={reactionCount.angry}
                        selected={reaction == 'angry'}
                        type="angry"
                        onClick={() => sendReaction('angry')}
                    />
                    <Reaction
                        count={reactionCount.shit}
                        selected={reaction == 'shit'}
                        type="shit"
                        onClick={() => sendReaction('shit')}
                    />
                </div>
                <div className="post_date inline-block">
                    {moment.unix(date).format('DD/MM/YY')}
                </div>
            </footer>
        </div>
    )
}
