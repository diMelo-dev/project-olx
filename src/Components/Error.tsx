
type Props = {
    message: string
}

export function Error({ message }: Props) {

    let messages = message.split('&&');

    return(
        <div className=" p-[10px] bg-red-600 text-white rounded">
            {messages.map((item, index) => (
                <div className="" key={index}>{item}</div>
            ))}
        </div>
    );
}