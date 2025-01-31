"use client";
import MatrixLetters from "@/decorations/MatrixLetters";
import BlogCard from "../BlogContent/BlogCard";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { blogs } from "./blogdetails";

export default function Blogs() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <MatrixLetters />

            <div className="flex flex-col w-full flex-grow justify-center items-center">
                <div className="flex flex-col md:w-[63%] w-[85%]">
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            image={blog.image}
                            readtime={blog.readtime}
                            date={blog.date}
                            content={blog.content}
                            blogIndex={index}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
