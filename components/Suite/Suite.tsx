'use client';
import { Card } from "./Card";

const cards = [
    {
        icon: "/card1.svg",
        title: "Redefining P2P Trading with Privacy at Its Core",
        description: "Enable compliant cross-border transactions without complexity.",
        url: 'https://docs.encifher.io/docs/solution/trading'
    },
    {
        icon: "/card2.svg",
        title: "Make your dapps private with ease",
        description: "Introducing Salus - A Modular SDK For Seamless Privacy Integration.",
        url: 'https://docs.encifher.io/docs/solution/P2P'
    }
]

export default function Suite() {
    return (
        <div className="flex flex-col gap-[2rem] px-4 md:px-[10%] mt-[8rem]">
            <h1 className="text-3xl md:text-[48px] gradient-text font-[400] mb-[2rem] text-center md:text-left">Encifher Suite</h1>
            <Card
                icon="/card3.svg"
                title="Trade Privately without fear of exploitation"
                description="Leverage existing TVL-rich platforms for optimal pricing, with full privacy protection."
                onClick={() => null}
            />
            <div className="w-full pt-3 md:pt-[3rem] flex flex-col md:flex-row items-start items-center items-stretch justify-around gap-8">
                {cards.map((card, index) => (
                    <Card key={index} icon={card.icon} title={card.title} description={card.description} onClick={() => window.open(card.url, '_blank')} />
                ))}
            </div>
            <Card
                icon="/card4.svg"
                title="Encrypted Tokenization, Built for the Real World"
                description="Whether it’s sensitive real estate information, private credit data or IP rights, we make tokenized assets private, auditable, and programmable from day one."
                onClick={() => null}
            />
        </div>
    )
}