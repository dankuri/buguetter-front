import Avatar from './Avatar'

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
        <div className="post border-b-2 border-green-400 p-4 text-2xl last:border-0">
            {user && (
                <div className="flex items-center pb-2">
                    <Avatar size={64} name={user} />
                    <span className="pl-4">{user}</span>
                </div>
            )}
            <span className="block pb-2 text-left">{text}</span>
            <footer className="flex items-center justify-between">
                <div className="reactions inline-block">
                    {Object.entries(reactions)}
                </div>
                <div className="post_date inline-block">{formatDate(date)}</div>
            </footer>
        </div>
    )
}
