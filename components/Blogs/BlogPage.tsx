"use client";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { blogs } from "./blogdetails";
import Share from "../Share/Share";
import { useRef } from "react";

interface BlogPageInterface {
    blogIndex: string;
}

export default function BlogPage({ blogIndex }:BlogPageInterface) {
    const clock = "/clock.svg";
    const calendar = "/calendar.svg";
    const back = "/back.svg";

    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToSection = (index: number) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    };

    const shortenTitle = (title: string) => {
        return title.length > 20 ? title.substring(0, 20) + "..." : title;
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-row w-full h-full mt-8">

                <div className="w-[33%] flex justify-center" >
                    <div className="w-[200px] sticky top-20 ml-4 hidden md:block">
                        <span className="text-white text-lg font-bold mb-4">Table of Contents</span>
                        <div className="w-[200px] h-[1px] bg-white opacity-15 my-4"></div>
                        <ul className="list-none p-0">
                            {blogs[Number(blogIndex)].sections.map((section, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={() => scrollToSection(index)}
                                        className="text-white text-sm opacity-70 hover:opacity-100 hover:text-[#663FFF] transition-all"
                                    >
                                        {shortenTitle(section.header)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Blog Content (Preserve Current Positioning and Size) */}
                <div className="flex flex-col w-[709px]">
                    <span
                        className="flex flex-row text-white text-sm mb-4 cursor-pointer"
                        onClick={() => (window.location.href = `/blogs`)}
                    >
                        <Image src={back} width={9} height={9} alt="Back Icon" className="mr-2" />
                        Go Back
                    </span>
                    <span className="text-white text-3xl text-[#663FFF]">{blogs[Number(blogIndex)].title}</span>
                    <span className="flex flex-row my-4 opacity-50">
                        <span className="flex flex-row text-white text-[12px] mr-6">
                            <Image src={clock} width={18} height={18} alt="Clock Icon" className="mr-2" />
                            {blogs[Number(blogIndex)].readtime} min read
                        </span>
                        <span className="text-white text-[12px] flex flex-row">
                            <Image src={calendar} width={14} height={14} alt="Calendar Icon" className="mr-2" />
                            {blogs[Number(blogIndex)].date}
                        </span>
                    </span>
                    <Image
                        src={blogs[Number(blogIndex)].image}
                        width={709}
                        height={400}
                        alt="Blog Image"
                        className="my-12"
                    />
                    {blogs[Number(blogIndex)].sections.map((section, index) => (
                        <div
                            key={index}
                            className="flex flex-col mb-8"
                            ref={(el) => { sectionRefs.current[index] = el; }} 
                        >
                            <span className="text-white text-2xl mb-4">{section.header}</span>
                            <div className="text-white text-base normal-case opacity-50">{section.content}</div>
                        </div>
                    ))}

                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                    <span className="text-white text-base normal-case md:mt-16">Share on</span>
                    <div className="flex flex-row justify-start my-4">
                        <Share image="/telegram.svg" />
                        <Share image="/twitter.svg" />
                        <Share image="/discord.svg" />
                        <Share image="/github.svg" />
                    </div>
                </div>
            </div>
        </>
    );
}