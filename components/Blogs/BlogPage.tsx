"use client";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { blogs } from "./blogdetails";
import Share, { MiniShare } from "../Share/Share";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Footer from "../Footer/Footer";
import MatrixLetters from "@/decorations/MatrixLetters";

interface BlogPageInterface {
    blogIndex: string;
}

type CodeProps = {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

export default function BlogPage({ blogIndex }: BlogPageInterface) {
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
            <MatrixLetters />
            <div className="flex flex-col md:flex-row w-full h-full mt-8">
                {/* Sticky & Scrollable Table of Contents */}
                <div className="hidden md:flex w-[33%] justify-center">
                    <div className="w-[250px] sticky top-0 max-h-screen overflow-y-auto self-start p-4 ">
                        <span className="text-white text-lg font-bold mb-4 block">Table of Contents</span>
                        <div className="w-full h-[1px] bg-white opacity-15 my-4"></div>
                        <ul className="list-none p-0">
                            {blogs[Number(blogIndex)].sections.map((section, index) => (
                                <li key={index} className="mb-2">
                                    <button
                                        onClick={() => scrollToSection(index)}
                                        className="text-white text-sm opacity-70 hover:opacity-100 hover:text-[#663FFF] transition-all"
                                        aria-label={`Scroll to ${section.header}`}
                                    >
                                        {shortenTitle(section.header)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="flex flex-col w-full md:w-[709px] px-4 md:px-0">
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
                        className="my-12 w-full h-auto"
                    />
                    {blogs[Number(blogIndex)].sections.map((section, index) => (
                        <div
                            key={index}
                            className="flex flex-col mb-8"
                            ref={(el) => { sectionRefs.current[index] = el; }}
                        >
                            <span className="text-white text-2xl mb-4">{section.header}</span>
                            <div className="text-[#808080] text-base normal-case font-extralight">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ inline, className, children, ...props }: CodeProps) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={dracula}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        img({ src, alt }) {
                                            return src ? (
                                                <Image
                                                    src={src}
                                                    alt={alt || "Blog Image"}
                                                    width={700}
                                                    height={400}
                                                    className="rounded-lg my-8 mx-auto"
                                                />
                                            ) : null;
                                        },
                                        p({ children }) {
                                            if (
                                                Array.isArray(children) &&
                                                children.length === 1 &&
                                                typeof children[0] === "object" &&
                                                "type" in children[0] &&
                                                children[0].type === "img"
                                            ) {
                                                return <>{children}</>;
                                            }
                                            return <p className="mb-4">{children}</p>;
                                        },
                                    }}
                                >
                                    {section.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    <div className="w-full h-[1px] bg-white opacity-50"></div>
                    <div className="flex flex-row justify-start my-14">
                        <div className="flex flex-row justify-center items-center mr-4">
                            <span className="text-white text-base normal-case mr-4">Share on</span>
                            <MiniShare image="/twitter.svg" platform="twitter" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
