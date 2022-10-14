import loading from '/loading.svg'

export default function LoadingScreen() {
    return (
        <div className="flex grow items-center justify-center">
            <img src={loading} alt="loading loop" />
        </div>
    )
}
