import { useState } from 'react'
import LoadingScreen from './LoadingScreen'

type Props = {
    size: number
    name: string
}

export default function Avatar({ size, name }: Props) {
    const [isLoading, setLoading] = useState(true)

    return (
        <div style={{ width: size + 'px', height: size + 'px' }}>
            {isLoading && <LoadingScreen />}
            <img
                src={`https://joeschmoe.io/api/v1/${name}`}
                alt="profile pic"
                style={{ width: size + 'px', height: size + 'px' }}
                className={isLoading ? 'hidden' : 'rounded-full bg-gray-800'}
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}
