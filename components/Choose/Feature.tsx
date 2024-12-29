import Image from 'next/image';

interface FeatureProps {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export const Feature = ({ id, title, description, icon }: FeatureProps) => {
    return (
        <div className="flex items-center justify-center gap-[100px] w-full px-[10%] py-[2%]">
            {
                (id % 2 === 0) && <div className="relative">
                    <Image src='/concentric.svg' width={10} height={10} alt='' className='w-[300px] h-[300px]' />
                    <Image src={icon} width={10} height={10} alt='' className='absolute m-auto inset-0 w-[160px] h-[160px]' />
                </div>
            }
            <div className="w-[50%] flex flex-col items-start gap-4">
                <h1 className="gradient-text text-[32px] font-[400]">{title}</h1>
                <p className="text-white text-opacity-60 text-[20px] font-[300] leading-[32px]">{description}</p>
            </div>
            {
                (id % 2) && <div className="relative">
                    <Image src='/concentric.svg' width={10} height={10} alt='' className='w-[300px] h-[300px]' />
                    <Image src={icon} width={10} height={10} alt='' className='absolute m-auto inset-0 w-[160px] h-[160px]' />
                </div>
            }
        </div>
    )
}