import BlogPage from "@/components/Blogs/BlogPage"

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    return (
        <BlogPage blogIndex={slug}/>
    )
  }