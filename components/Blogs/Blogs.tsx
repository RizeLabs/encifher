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

      <div className="flex flex-col w-full flex-grow justify-center items-center mt-8 px-2 md:px-0">
        <div className="flex flex-col w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              slug={blog.slug}
              title={blog.title}
              image={blog.image}
              readtime={blog.readtime}
              date={blog.date}
              content={blog.content}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
