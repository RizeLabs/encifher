"use client";

import { useRef, useState, useEffect } from "react";
import MobileTestimonials from "./MobileTestimonials";

export interface Testimonial {
  id: number;
  name: string;
  username: string;
  dp: string;
  content: string;
  link: string;
  isQt?: boolean;
  qtDp?: string;
  qtName?: string;
  qtUsername?: string;
  qtContent?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mohamed Fouda",
    username: "@MohamedFFouda",
    dp: "https://pbs.twimg.com/profile_images/1573010416652980224/mQud4POA_400x400.jpg",
    content:
      "I have been really impressed by the leaps happening in this space but the UX of @encifherio has really hit it. Doing swaps between any Solana assets within 30 seconds is the UX this sector needs to pick up",
    link: "https://x.com/mohamedffouda/status/1940858496821387277",
  },
  {
    id: 2,
    name: "Kash (🐱, 🐐)",
    username: "@kashdhanda",
    dp: "https://pbs.twimg.com/profile_images/1921122530405863425/wTbPEY2B_400x400.jpg",
    content: "lfggg can't wait to try it out",
    link: "https://x.com/kashdhanda/status/1932106329088504000",
  },
  {
    id: 3,
    name: "Jupiter (🐱, 🐐)",
    username: "@JupiterExchange",
    dp: "https://pbs.twimg.com/profile_images/1944921381168099328/mVkHxhxy_400x400.jpg",
    content: "Build on Jupiter. 🪐",
    link: "https://x.com/JupiterExchange/status/1932362112464302138",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 4,
    name: "Eli5DeFi",
    username: "@eli5_defi",
    dp: "https://pbs.twimg.com/profile_images/1684835274424242176/RxuyXAaJ_400x400.jpg",
    content:
      "Encifher is a privacy-centric solution for @Solana DeFi, delivering secure, private, and rapid trading without exposing wallet details. It is targeted at users who demand both top performance and strong privacy protections.",
    link: "https://x.com/eli5_defi/status/1946585884369072467",
  },
  {
    id: 5,
    name: "shek",
    username: "@shek_dev",
    dp: "https://pbs.twimg.com/profile_images/1803645845352378368/DifayeJH_400x400.jpg",
    content: "Privacy preserving swaps, coming to a dex near you.",
    link: "https://x.com/shek_dev/status/1932056506490630303",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 6,
    name: "Solana",
    username: "@solana",
    dp: "https://pbs.twimg.com/profile_images/1472933274209107976/6u-LQfjG_400x400.jpg",
    content:
      "📈 Third prize in the DeFi Track goes to  @encifherio, a platform that adds encrypted privacy to Solana DeFi.",
    link: "https://x.com/solana/status/1940439610498375782",
  },
  {
    id: 7,
    name: "Irffan",
    username: "@IrffanAsiff",
    dp: "https://pbs.twimg.com/profile_images/1926262000537018368/ANEQOAqj_400x400.jpg",
    content: "Incognito mode for swaps",
    link: "https://x.com/IrffanAsiff/status/1932064198420508738",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 8,
    name: "gaurang.eth|.lens ᵍᵐ 🔮 🦇🔊 🌱 ᛤ 🧪",
    username: "@iamgaurangdesai",
    dp: "https://pbs.twimg.com/profile_images/1586974754325422080/1Ps_9fN0_400x400.png",
    content: `privacy on @solana via @JupiterExchange
          powered by @encifherio 
          why because privacy matters`,
    link: "https://x.com/iamgaurangdesai/status/1933812384772375029",
  },
  {
    id: 9,
    name: "ArtueroY",
    username: "@ArtueroY",
    dp: "https://pbs.twimg.com/profile_images/1722355327964766208/Si7jfu-E_400x400.jpg",
    content:
      "Had an opportunity to test @encifherio, even with all my Solana tracking experience, I couldn't trace a thing. Really impressive👀",
    link: "https://x.com/ArtueroY/status/1940822500876730575?t=wIm5fNk3UyOcPWgUOtDbbQ&s=35",
  },
  {
    id: 10,
    name: "Kaleve",
    username: "@Kaleve_",
    dp: "https://pbs.twimg.com/profile_images/1663232703175573504/rrLdnCHq_400x400.jpg",
    content: `Testing the @encifherio protocol 
          (built on top of Jupiter)
          It allows you to make transactions with privacy.
  
          Is it like a mixer?
          No, it only encrypts the transaction amounts, while keeping the addresses visible.
          `,
    link: "https://x.com/Kaleve_/status/1940445593278746704",
  },
  {
    id: 11,
    name: "Paarug Sethi",
    username: "@paarugsethi",
    dp: "https://pbs.twimg.com/profile_images/1655844859557875712/juQ_AN-O_400x400.jpg",
    content:
      "private transactions are coming to @solana faster than you think.",
    link: "https://x.com/paarugsethi/status/1932064447838990635",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 12,
    name: "Javier ⚛ priv/acc 🌒",
    username: "@jvr0x",
    dp: "https://pbs.twimg.com/profile_images/1780590526737121280/W2kzTBDX_400x400.jpg",
    content: "Privacy wins today, well done @encifherio",
    link: "https://x.com/jvr0x/status/1940041001478828100",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1909681579992969216/Pz1qdZ8F_400x400.jpg",
    qtName: "Nitanshu (priv/acc)",
    qtUsername: "@NitanshuL",
    qtContent: "You can just buy US stocks privately",
  },
  {
    id: 13,
    name: "vaijanath.eth",
    username: "@vaijanath_eth",
    dp: "https://pbs.twimg.com/profile_images/1922320174797225985/5mBLN0r__400x400.jpg",
    content:
      "Kudos to @encifherio team for BUIDLing a privacy tool on @solana Really amazed by the product. Try it out and you won't regret it.",
    link: "https://x.com/vaijanath_eth/status/1950467597159584257?t=FAA-665PCX0DSDttAZ9fpA&s=19",
  },
  {
    id: 14,
    name: "Abhitej | Filament",
    username: "@abhitejxyz",
    dp: "https://pbs.twimg.com/profile_images/1629489391713374208/jwVv332X_400x400.jpg",
    content: "Cookin' fr - follow @rishotics for Privacy-first apps.",
    link: "https://x.com/abhitejxyz/status/1932095218108506477",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 15,
    name: "Arhat",
    username: "@0xArhat",
    dp: "https://pbs.twimg.com/profile_images/1927647502712594432/1rsx_wZm_400x400.jpg",
    content: `i don't see why would anyone want to offramp their crypto...`,
    link: "https://x.com/0xArhat/status/1939929329242149365",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1909681579992969216/Pz1qdZ8F_400x400.jpg",
    qtName: "Nitanshu (priv/acc)",
    qtUsername: "@NitanshuL",
    qtContent: "I can literally buy TSLA stock using TRUMP memecoin XD",
  },
  {
    id: 16,
    name: "up (erc-0/acc)",
    username: "@uputkucrypto",
    dp: "https://pbs.twimg.com/profile_images/1518950386517872644/zq1yl9Lu_400x400.jpg",
    content:
      "privacy on a centralized blockchain is a retard level i never imagined was possible",
    link: "https://x.com/uputkucrypto/status/1932149664280980635",
  },
  {
    id: 17,
    name: "DI❍B",
    username: "@diobiyanu",
    dp: "https://pbs.twimg.com/profile_images/1951051953330376704/Xv6k8S2A_400x400.jpg",
    content:
      "@encifherio solves this issue by make sure I don't need to rotate between wallets or go anywhere else. everything about jupiter is kept intact.",
    link: "https://x.com/diobiyanu/status/1950975574060523904",
  },
  {
    id: 18,
    name: "Madruguinha",
    username: "@0xMadruguinha",
    dp: "https://pbs.twimg.com/profile_images/1917330965841526784/SO3D5zkA_400x400.jpg",
    content: `Testei a @encifherio ontem e venho dar um feedback sobre o protocolo, hoje saíram os resultados da @colosseum e a encifher ficou em terceiro lugar na categoria defi. É um protocolo para transações com privacidade, ele é construído em cima da @JupiterExchange, ou seja é basicamente fazer swaps na jupiter só que sem deixar rastros na blockchain. Por exemplo com a carteira A você deposita 10 USDC na encifher, lá dentro pode fazer swap para qualquer token, inclusive as @xStocksFi, pode fazer quantos trades quiser com privacidade, e depois pode fazer a retirada para a carteira A novamente, ou pode retirar para a carteira B (sem haver conexão com a carteira A, linkando-as), algo que era possível a tempos atrás com a antiga elusiv que era muito utilizada. Privacidade é algo que estava faltando na solana então eu vejo muita utilidade nesse protocolo. Não sei se eles terão token no futuro, mas certamente se tiverem quem testar no começo pode ter algum beneficio, e por utilizarem a jupiter estaremos nos expondo ao próximo airdrop deles, que é por volume de transação, então quanto maior o volume, melhor. Quero agradecer ao @rishoticspela oportunidade de testar o protocolo que ainda esta em acesso privado e quem se interessar e quiser testar também, mandem dm para ele pedindo acesso que ele é super receptivo.`,
    link: "https://x.com/0xMadruguinha/status/1940513833229123752",
  },
  {
    id: 19,
    name: "ozeddd.Dot",
    username: "@Penggking",
    dp: "https://pbs.twimg.com/profile_images/1797311793624154112/5txwVDxm_400x400.jpg",
    content:
      "@encifherio brings private swaps to @Solana, keeping your trade amounts hidden while remaining fully compliant.",
    link: "https://x.com/Penggking/status/1947355328242205074",
  },
  {
    id: 20,
    name: "hn",
    username: "@at9inety9ine",
    dp: "https://pbs.twimg.com/profile_images/1919135202908962817/dQBW8Wf5_400x400.jpg",
    content: "revolutionary 💥",
    link: "https://x.com/at9inety9ine/status/1932154113896399169",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1667560609351876608/kp6W5iiJ_400x400.jpg",
    qtName: "Rishabh Gupta",
    qtUsername: "@rishotics",
    qtContent: "Introducing private swaps on @solana with @JupiterExchange⚡️",
  },
  {
    id: 21,
    name: "Priyansh Patel",
    username: "@priyansh_ptl18",
    dp: "hhttps://pbs.twimg.com/profile_images/1925608041321275393/gmyPy1KH_400x400.png",
    content: `Just tested the beta of @encifherio and here's my honest take:
  
          ⚬ The UI is sleek and smooth.
          ⚬ I tried every way I could to trace a transfer — nothing.
          ⚬ It can be traced if traffic is low during withdrawal, so timing matters.
  
          If you're using it, keep these in mind:
          ⚬ Let more users and trades flow through the system.
          ⚬ Delayed withdrawals help you blend in.
          ⚬ Always use fresh wallets for withdrawal.
  
          It's early, but definitely promising. Watching this one closely 👀.`,
    link: "https://x.com/priyansh_ptl18/status/1933875179127476398",
  },
  {
    id: 22,
    name: "tramontinaldo.sol🔌 ⚡",
    username: "@Tramontnaldo21",
    dp: "https://pbs.twimg.com/profile_images/1772214559983484928/yQoQgVI4_400x400.jpg",
    content: `Let's talk about @encifherio 😎
            
          Is a DeFi protocol on @solana focused on private transactions. It uses advanced cryptography and concyclic execution for secure swaps and deposits, integrated with @JupiterExchange. Won 3rd place at the @colosseum competition, showcasing privacy innovation!  #Encifherio #Solana #DeFi
  `,
    link: "https://x.com/Tramontnaldo21/status/1940749007023735080",
  },
  {
    id: 23,
    name: "Ayush 🦀",
    username: "@ayushcodesweb",
    dp: "https://pbs.twimg.com/profile_images/1926913077426941952/aMrFSF17_400x400.jpg",
    content:
      "Watched this video, really amazing work by @encifherio team. It opened a new thought dimension in my mind about privacy on public wallets. Loved the idea, made notes❣️",
    link: "https://x.com/ayushcodesweb/status/1950275016274084300",
  },
  {
    id: 24,
    name: "Ashraf",
    username: "@Ashrafs_Codes",
    dp: "https://pbs.twimg.com/profile_images/1919135202908962817/dQBW8Wf5_400x400.jpg",
    content: "Had an opportunity to play with @encifherio, even with all...",
    link: "https://x.com/Ashrafs_Codes/status/1940738833437675649",
    isQt: true,
    qtDp: "https://pbs.twimg.com/profile_images/1939226375002505216/-MRO8pEx_400x400.jpg",
    qtName: "Encifher",
    qtUsername: "@encifherio",
    qtContent: "We WON 🏆",
  },
  {
    id: 25,
    name: "solbricklayer",
    username: "@solbricklayer",
    dp: "https://pbs.twimg.com/profile_images/1538298021665984514/0H9Uev81_400x400.jpg",
    content: `just tried my first confidential swap on @solana by @encifherio!
  
          love the step by step messaging LOL 😂
          `,
    link: "https://x.com/solbricklayer/status/1948626869194018855?s=46",
  },
  {
    id: 26,
    name: "Prifea✨",
    username: "@princess_i5",
    dp: "https://pbs.twimg.com/profile_images/1908974626375442432/a_Nqws2B_400x400.jpg",
    content: `Privacy is something most DeFi apps ignore.
          But @encifherio is changing that without breaking how things work.
          It's a privacy tool on Solana for private swaps on Jupiter.
          I beta tested it, shoutout @Chiragagrwal7, and it was easy to use.
          Here's a video I made while using it`,
    link: "https://x.com/princess_i5/status/1950812776265388385",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const handleClick = () => {
    window.open(testimonial.link, "_blank");
  };

  return (
    <div
      className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-black/30 transition-all duration-300 overflow-hidden h-[165px]"
      onClick={handleClick}
    >
      <div className="w-full flex-col items-start">
        <div className="flex flex-row items-center justify-between space-x-3 mb-3">
          <img
            src={testimonial.dp}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-mono text-sm font-semibold">
                  {testimonial.name}
                </h4>
                <p className="text-white/60 font-mono text-xs">
                  {testimonial.username}
                </p>
              </div>
              <div className="border border-white/20 rounded-lg p-2">
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white/80 font-mono text-sm leading-relaxed mb-3 line-clamp-3">
          {testimonial.content}
        </p>

        {testimonial.isQt && (
          <div className="w-full bg-black/50 rounded-lg border border-white/10 p-3">
            <div className="flex items-start gap-3">
              <img
                src={testimonial.qtDp}
                alt={testimonial.qtName}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-mono text-xs font-semibold">
                    {testimonial.qtName}
                  </h4>
                  <p className="text-white/60 font-mono text-xs">
                    {testimonial.qtUsername}
                  </p>
                </div>
                <p className="text-white/80 font-mono text-xs leading-relaxed line-clamp-2">
                  {testimonial.qtContent}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Testimonial() {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const [isFirstRowHovered, setIsFirstRowHovered] = useState(false);
  const [isSecondRowHovered, setIsSecondRowHovered] = useState(false);
  const firstRowPositionRef = useRef(-100);
  const secondRowPositionRef = useRef(0);

  useEffect(() => {
    let firstRowAnimationId: number;
    let secondRowAnimationId: number;

    // Only run animation on screens larger than tablet (lg breakpoint)
    const isTabletOrMobile =
      typeof window !== "undefined" ? window.innerWidth < 1024 : false;

    if (isTabletOrMobile) return;

    const speed = 1.5;

    const animateFirstRow = () => {
      if (firstRowRef.current) {
        if (!isFirstRowHovered) {
          const newPosition = firstRowPositionRef.current + speed / 240;
          const finalPosition = newPosition >= 0 ? -100 : newPosition;
          firstRowPositionRef.current = finalPosition;
          firstRowRef.current.style.transform = `translateX(${finalPosition}%)`;
        } else {
          firstRowRef.current.style.transform = `translateX(${firstRowPositionRef.current}%)`;
        }
      }
      firstRowAnimationId = requestAnimationFrame(animateFirstRow);
    };

    const animateSecondRow = () => {
      if (secondRowRef.current) {
        if (!isSecondRowHovered) {
          const newPosition = secondRowPositionRef.current - speed / 240;
          const finalPosition = newPosition <= -100 ? 0 : newPosition;
          secondRowPositionRef.current = finalPosition;
          secondRowRef.current.style.transform = `translateX(${newPosition}%)`;
        } else {
          secondRowRef.current.style.transform = `translateX(${secondRowPositionRef.current}%)`;
        }
      }
      secondRowAnimationId = requestAnimationFrame(animateSecondRow);
    };

    animateFirstRow();
    animateSecondRow();

    return () => {
      cancelAnimationFrame(firstRowAnimationId);
      cancelAnimationFrame(secondRowAnimationId);
    };
  }, [isFirstRowHovered, isSecondRowHovered]);

  return (
    <section className="bg-[#0c0c0c] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Users Love Encifher
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4">
            Chosen by traders who won&apos;t compromise on performance or
            privacy
          </p>
        </div>

        {/* Mobile Layout with Animation */}
        <div className="block lg:hidden relative">
          <MobileTestimonials />
        </div>

        {/* Desktop Scrolling Layout */}
        <div className="hidden lg:block space-y-16 relative">
          {/* First Row */}
          <div
            className="overflow-hidden relative"
            onMouseEnter={() => setIsFirstRowHovered(true)}
            onMouseLeave={() => setIsFirstRowHovered(false)}
          >
            {/* Left Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>

            {/* Right Fade Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>

            <div
              ref={firstRowRef}
              className="flex space-x-6 items-start"
              style={{ transform: "translateX(-100%)" }}
            >
              {testimonials
                .slice(0, Math.ceil(testimonials.length / 2))
                .map((testimonial, index) => (
                  <div
                    key={`desktop-first-${index}`}
                    className="flex-shrink-0 w-[500px] lg:w-[600px]"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
            </div>
          </div>

          {/* Second Row */}
          <div
            className="overflow-hidden relative"
            onMouseEnter={() => setIsSecondRowHovered(true)}
            onMouseLeave={() => setIsSecondRowHovered(false)}
          >
            {/* Left Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>

            {/* Right Fade Effect */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10 pointer-events-none"></div>

            <div
              ref={secondRowRef}
              className="flex space-x-6 items-start"
              style={{ transform: "translateX(0%)" }}
            >
              {testimonials
                .slice(Math.ceil(testimonials.length / 2), testimonials.length)
                .map((testimonial, index) => (
                  <div
                    key={`desktop-second-${index}`}
                    className="flex-shrink-0 w-[500px] lg:w-[600px]"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
