export default function LanguageCard(props: LanguageCardProps){
    const { color, imgName, level, name } = props;
    return(
        <div className="p-2 basis-[200px] rounded-lg shadow-md border-2 border-gray-200">
            <div className="w-[200px] h-[200px] relative">
                <img src={"/images/languages/"+imgName} className="p-2 w-full h-full" alt={name + " image"} />
            </div>
            <p className="px-2 text-xl text-black">{name}</p>
            <div className="w-full my-2 px-2">
                <p className="text-gray-700">knowledge</p>
                <div className="bg-gray-200 relative h-[20px] rounded-lg">
                    <div style={{width: level + "%", backgroundColor: color}} className={`absolute shadow-md flex items-center rounded-md h-full`}>
                        <p className="text-sm px-1 text-white h-full">
                            {level}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export type LanguageCardProps = {
    name: string
    imgName: string
    color: string
    level: number
}
