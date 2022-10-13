import Avatar from './Avatar'

type Props = {
    text: string
    reactionsCount: { [key: string]: number }
    date: number
    user?: string
}

const reactions = {
    cool: '😎',
    nice: '👍',
    angry: '😠',
    shit: '💩'
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

export default function Post({ text, reactionsCount, date, user }: Props) {
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
                <div className="reactions flex justify-between">
                    <button className="btn">
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
                    </button>
                </div>
                <div className="post_date inline-block">{formatDate(date)}</div>
            </footer>
        </div>
    )
}
