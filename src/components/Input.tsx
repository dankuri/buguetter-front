type Props = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

export default function Input({ value, placeholder, onChange }: Props) {
    return (
        <input
            type="name"
            className="block m-4 p-2 text-2xl rounded-lg bg-slate-700"
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
}
