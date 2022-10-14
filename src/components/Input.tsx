type Props = {
    value: string
    placeholder: string
    type: string
    onChange: (value: string) => void
}

export default function Input({ value, placeholder, type, onChange }: Props) {
    return (
        <input
            type={type}
            className="m-4 block rounded-lg bg-slate-700 p-2 text-2xl"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    )
}
