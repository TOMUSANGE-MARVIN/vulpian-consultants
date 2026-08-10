import { blogs } from "@/lib/staticContent";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
    title: "Blog | Vulpian Consultants",
};

type Props = {
    params: Promise<{ slug: string }>;
};

const BlogDetails = async ({ params }: Props) => {
    const { slug } = await params;
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) return notFound();

    const otherPosts = blogs.filter((b) => b.slug !== slug);
    const categories = Array.from(new Set(blogs.map((b) => b.category)));

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/blog", text: "Blog Details" },
    ];

    return (
        <>
            <HeroSub title={blog.title} description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-2.jpg" />

            <section className="py-15">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex flex-col lg:flex-row gap-5">
                    <div className="lg:w-[60%] w-full">
                        <div className="bg-white p-5 rounded-2xl">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                width={800}
                                height={400}
                                className="w-full h-[400px] object-cover rounded-2xl"
                            />
                            <p className="pt-5 text-sm text-pera-dark">
                                <span className="border border-border px-2 rounded-sm">{blog.category}</span> By {blog.author} &middot; {blog.date}
                            </p>
                            <h4 className="font-unbounded font-medium text-3xl py-3">{blog.title}</h4>

                            {blog.body.map((paragraph, i) => (
                                <p key={i} className="pb-4 text-pera-dark text-16 leading-6">
                                    {paragraph}
                                </p>
                            ))}

                            <div className="border border-border rounded-lg p-5 bg-prim-light">
                                <Icon icon="tabler:quote" width="48" height="48" className="mb-3 text-dark" />
                                <h5 className="text-black font-semibold font-chakrapetch leading-8">{blog.pullQuote.text}</h5>
                                <span className="w-full text-end block font-semibold font-unbounded mt-2">
                                    - {blog.pullQuote.attribution}
                                </span>
                            </div>

                            <h4 className="font-unbounded py-5">
                                Key Takeaways
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {blog.takeaways.map((point, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <Icon icon="material-symbols:check-rounded" width="24" height="24" className="bg-prim text-white rounded-full p-0.5 shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:w-[40%] w-full lg:self-start lg:sticky top-20 space-y-5 py-5">
                        <div className="border border-gray-100 shadow-lg bg-white p-5 rounded-xl">
                            <h4 className="text-black pb-5">More Insights</h4>
                            <div className="flex flex-col gap-4">
                                {otherPosts.map((post) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex items-center gap-3">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={200}
                                            height={100}
                                            className="w-[120px] h-[80px] object-cover rounded-xl shrink-0"
                                        />
                                        <div>
                                            <h4 className="font-chakrapetch pb-1 text-15 font-semibold leading-tight">
                                                {post.title}
                                            </h4>
                                            <span className="uppercase text-pera-dark text-13">{post.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="border border-gray-100 shadow-lg bg-white p-5 rounded-xl">
                            <h4 className="text-black pb-5">Categories</h4>
                            <ul className="flex flex-col gap-2">
                                {categories.map((cat) => (
                                    <li key={cat} className="flex justify-between items-center">
                                        <span>{cat}</span>
                                        <span>({blogs.filter((b) => b.category === cat).length})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogDetails;
