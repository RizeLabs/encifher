import { Feature } from "./Feature"

const features = [
    {
        title: "Privacy to the Existing Ecosystem",
        description: "Users don't need to leave their favorite chains and communities just to get privacy as an added feature in a chain.",
        icon: "/star.svg"
    },
    {
        title: "Programmable Compliance",
        description: "With Privacy 2.0, we enable users to adopt compliance-friendly methods of protecting their funds.",
        icon: "/pass.svg"
    },
    {
        title: "Seamless User Experience",
        description: "Enjoy privacy without compromising on speed, usability, or functionality. Encifher integrates directly into your favorite DeFi platforms, making the experience as intuitive as ever.",
        icon: "/account.svg"
    }
]

export default function Choose() {
    return (
        <div className="mt-[8rem] flex flex-col items-center gap-[4rem] mb-[9rem]">
            <div className="px-[10%] py-[4%] w-full text-center md:text-left">
                <h1 className="gradient-text text-3xl md:text-[48px] font-[400]">Why Choose Encifher?</h1>
            </div>
            {features.map((feature, index) => (
                <Feature
                    key={index}
                    id={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                />
            ))}
        </div>
    )
}