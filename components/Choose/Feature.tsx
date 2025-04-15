import Image from 'next/image';

interface FeatureProps {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export const Feature = ({ id, title, description, icon }: FeatureProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-[100px] w-full md:w-[70%] py-[2%] px-2 md:px-0">
            <div className={`relative ${id % 2 === 0 ? 'order-first' : 'order-first md:order-last'}`}>
                <Image src={icon} width={10} height={10} alt='' className='m-auto w-[300px] h-[200px] md:w-[500px] md:h-[350px]' />
            </div>
            <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-4">
                <h1 className="gradient-text text-[20px] md:text-[32px] font-[400] text-center md:text-left">{title}</h1>
                <p className="text-white/60 text-[16px] md:text-[20px] font-[300] leading-[25px] md:leading-[32px] text-center md:text-left">{description}</p>
            </div>
        </div>
    )
}