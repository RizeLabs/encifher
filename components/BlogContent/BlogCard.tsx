import Image from "next/image";

interface BlogCardInterface {
    blogIndex: number;
    title: string;
    image: string;
    readtime: string;
    date: string;
    content: string;
}

export default function BlogCard({ blogIndex, title, image, readtime, date, content }: BlogCardInterface) {
    const clock = "/clock.svg";
    const calendar = "/calendar.svg";

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col w-full md:w-[50%]">
                    <span 
                        className="cursor-pointer text-white text-2xl"
                        onClick={() => window.location.href = `/blog/${blogIndex}`}
                    >
                        {title}
                    </span>

                    <span className="flex flex-row my-4 opacity-50">
                        <span className="flex flex-row text-white text-base mr-6">
                            <Image src={clock} width={20} height={20} alt="Clock Icon" className="mr-2" />
                            {readtime} min read
                        </span>
                        <span className="text-white text-base flex flex-row">
                            <Image src={calendar} width={16} height={16} alt="Calendar Icon" className="mr-2" />
                            {date}
                        </span>
                    </span>

                    <div className="text-white text-base normal-case opacity-50">
                        {content}
                    </div>
                </div>

                    <Image src={image} width={500} height={100} alt="Blog Image" className="md:ml-4 ml-0 mt-8 md:mt-0" />
            </div>

            <div className="w-full h-[1px] bg-white opacity-50 my-8 md:my-16"></div>
        </>
    );
}