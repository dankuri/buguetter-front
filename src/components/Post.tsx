import { useState } from 'react'

type Props = {
    text: string
    reactions: { [key: string]: number }
    date: number
    user?: string
}

const formatDate = (date: number) => {
    const dateObject = new Date(date)
    const day = dateObject.getDate()
    const rawMonth = dateObject.getMonth() + 1
    const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth
    const year = dateObject.getFullYear().toString().slice(2)
    return `${day}/${month}/${year}`
}
// TODO: reactions - select one reaction & increase it's count
// const ReactionsBtns = (reactions: { [key: string]: number }) => {
//     return Object.keys(reactions).map(key => {
//         const [reaction, setReaction] = useState(reactions[key]);

//         const increaseReactionCount = () => {
//             setReaction(reactions[key] + 1);
//         };

//         return (
//             <button className="btn" onClick={increaseReactionCount} key={key}>
//                 {key}: {reaction}
//             </button>
//         );
//     });
// };

export default function Post({ text, reactions, date, user }: Props) {
    return (
        <div className="post border-2 border-green-400 rounded-2xl">
            {user && <span>{user}</span>}
            <span className="block text-left p-4 pb-1">{text}</span>
            <footer className="m-2 px-2 flex justify-between items-center">
                <div className="reactions inline-block">
                    {Object.entries(reactions)}
                </div>
                <div className="post_date inline-block">{formatDate(date)}</div>
            </footer>
        </div>
    )
}
