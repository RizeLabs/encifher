import Image from 'next/image';

interface FeatureProps {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export const Feature = ({ id, title, description, icon }: FeatureProps) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-1 md:gap-[100px] w-full md:w-[70%] py-[2%] px-2 md:px-0">
            {
                (id % 2 === 0) && <div className="relative">
                    <Image src='/concentric.svg' width={10} height={10} alt='' className='w-[200px] h-[200px] md:w-[300px] md:h-[300px]' />
                    <Image src={icon} width={10} height={10} alt='' className='absolute m-auto inset-0 w-[160px] h-[160px]' />
                </div>
            }
            {
                (id % 2) && <div className="md:hidden relative mb-6 md:mb-0">
                    <Image src='/concentric.svg' width={10} height={10} alt='' className='w-[200px] h-[200px] md:w-[300px] md:h-[300px]' />
                    <Image src={icon} width={10} height={10} alt='' className='absolute m-auto inset-0 w-[160px] h-[160px]' />
                </div>
            }
            <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-4">
                <h1 className="gradient-text text-2xl md:text-[32px] font-[400] text-center md:text-left">{title}</h1>
                <p className="text-white/60 text-[16px] md:text-[20px] font-[300] leading-[32px] text-center md:text-left">{description}</p>
            </div>
            {
                (id % 2) && <div className="hidden md:block relative">
                    <Image src='/concentric.svg' width={10} height={10} alt='' className='w-[200px] h-[200px] md:w-[300px] md:h-[300px]' />
                    <Image src={icon} width={10} height={10} alt='' className='absolute m-auto inset-0 w-[160px] h-[160px]' />
                </div>
            }
        </div>
    )
}