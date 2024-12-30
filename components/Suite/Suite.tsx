import { Card } from "./Card";

const cards = [
    {
        icon: "/card1.svg",
        title: "Trade Privately Without Fear of Exploitation",
        description: "Leverage existing TVL-rich platforms for optimal pricing, with full privacy protection."
    },
    {
        icon: "/card2.svg",
        title: "Redefining P2P Payments with Privacy at Its Core",
        description: "Enable compliant cross-border transactions without complexity."
    }
]

export default function Suite() {
    return (
        <div className="flex flex-col gap-[2rem] px-4 md:px-[10%] mt-[8rem]">
            <h1 className="text-3xl md:text-[48px] gradient-text font-[400] mb-[2rem] text-center md:text-left">Encifher Suite</h1>
            <div className="w-full pt-[3rem] flex flex-col md:flex-row items-start items-center items-stretch justify-around gap-8">
                {cards.map((card, index) => (
                    <Card key={index} icon={card.icon} title={card.title} description={card.description} />
                ))}
            </div>
            <Card
                icon="/card3.svg"
                title="Make Your DApps Private with Ease"
                description="Introducing Salus - A Modular SDK For Seamless Privacy Integration."
            />
        </div>
    )
}