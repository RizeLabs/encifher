"use client"
import BlogCard from "../BlogContent/BlogCard";
import Navbar from "../Navbar/Navbar";
import { blogs } from "./blogdetails";

export default function Blogs() {

    return (
        <>
            <Navbar />
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex flex-col w-[63%]">
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
        </>
    );
}