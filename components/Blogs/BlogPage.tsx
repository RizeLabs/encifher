"use client";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import { blogs } from "./blogdetails";
import { MiniShare } from "../Share/Share";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Footer from "../Footer/Footer";
import MatrixLetters from "@/decorations/MatrixLetters";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeRaw from "rehype-raw";

interface BlogPageInterface {
  blogSlug: string;
}

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export default function BlogPage({ blogSlug }: BlogPageInterface) {
  // Find the blog that matches the slug
  const blog = blogs.find((b) => b.slug === blogSlug);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">Blog not found.</p>
      </div>
    );
  }

  const clock = "/clock.svg";
  const calendar = "/calendar.svg";
  const back = "/back.svg";

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const shortenTitle = (title: string) => {
    return title.length > 20 ? title.substring(0, 20) + "..." : title;
  };

  return (
    <>
      <Navbar isMenuOpen={false} onMenuClick={() => {}} onLogoClick={() => {}} />
      <MatrixLetters />
      <div className="flex flex-col md:flex-row w-full h-full mt-8">
        {/* Sticky & Scrollable Table of Contents */}
        <div className="hidden md:flex w-full md:w-[33%] justify-center mb-8 md:mb-0">
          <div className="w-full md:w-[250px] sticky top-0 max-h-screen overflow-y-auto self-start p-4">
            <span className="text-white text-lg font-bold mb-4 block">
              Table of Contents
            </span>
            <div className="w-full h-[1px] bg-white opacity-15 my-4"></div>
            <ul className="list-none p-0">
              {blog.sections.map((section, index) => (
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
        <div className="flex flex-col w-full md:w-[67%] max-w-full px-4 md:px-0">
          <span
            className="flex flex-row text-white text-sm mb-4 cursor-pointer"
            onClick={() => (window.location.href = `/blogs`)}
          >
            <Image
              src={back}
              width={9}
              height={9}
              alt="Back Icon"
              className="mr-2"
            />
            Go Back
          </span>
          <span className="text-white text-3xl text-[#663FFF]">
            {blog.title}
          </span>
          <span className="flex flex-row my-4 opacity-50">
            <span className="flex flex-row text-white text-[12px] mr-6">
              <Image
                src={clock}
                width={18}
                height={18}
                alt="Clock Icon"
                className="mr-2"
              />
              {blog.readtime} min read
            </span>
            <span className="text-white text-[12px] flex flex-row">
              <Image
                src={calendar}
                width={14}
                height={14}
                alt="Calendar Icon"
                className="mr-2"
              />
              {blog.date}
            </span>
          </span>
          <Image
            src={blog.image}
            width={709}
            height={400}
            alt="Blog Image"
            className="my-12 w-full h-auto max-w-full rounded-lg"
          />
          {blog.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col mb-8"
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
            >
              <span className="text-white text-2xl mb-4">
                {section.header}
              </span>
              <div className="text-white opacity-90 text-base normal-case font-extralight">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
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
                          className="rounded-lg my-8 mx-auto w-full max-w-full h-auto"
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
                    h1({ children }) {
                      return <h1 className="text-4xl font-bold mt-10 mb-6">{children}</h1>;
                    },
                    h2({ children }) {
                      return <h2 className="text-3xl font-semibold mt-8 mb-4">{children}</h2>;
                    },
                    h3({ children }) {
                      return <h3 className="text-2xl font-medium mt-6 mb-3">{children}</h3>;
                    },
                    ul({ children }) {
                      return <ul className="list-disc pl-6 mb-4">{children}</ul>;
                    },
                    ol({ children }) {
                      return <ol className="list-decimal pl-6 mb-4">{children}</ol>;
                    },
                    li({ children }) {
                      return <li className="mb-1">{children}</li>;
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-6 w-full">
                          <table className="min-w-full border border-gray-300 text-left">
                            {children}
                          </table>
                        </div>
                      );
                    },
                    thead({ children }) {
                      return (
                        <thead className="bg-gray-800 border-b border-gray-300">
                          {children}
                        </thead>
                      );
                    },
                    tbody({ children }) {
                      return <tbody>{children}</tbody>;
                    },
                    tr({ children }) {
                      return <tr className="border-b border-gray-200">{children}</tr>;
                    },
                    th({ children }) {
                      return (
                        <th className="px-4 py-2 font-semibold text-sm text-white">
                          {children}
                        </th>
                      );
                    },
                    td({ children }) {
                      return (
                        <td className="px-4 py-2 text-sm text-white">
                          {children}
                        </td>
                      );
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
              <span className="text-white text-base normal-case mr-4">
                Share on
              </span>
              <MiniShare image="/twitter.svg" platform="twitter" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
