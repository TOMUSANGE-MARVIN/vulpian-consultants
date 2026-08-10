"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Post } from "@/lib/cms";

const BlogBrowser: React.FC<{ blogs: Post[] }> = ({ blogs }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = blogs.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const categories = Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)));

    return (
        <div className="container flex items-start mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 gap-5 flex-col lg:flex-row">
            <div className="lg:w-[60%] w-full">
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <div key={item._id} className="blog-item border border-border w-full bg-white p-5 rounded-2xl group h-auto mb-5">
                            <div className="blog-image w-full rounded-2xl overflow-hidden relative">
                                <Image
                                    src={item.image || "/images/blog/blog-2.jpg"}
                                    alt={item.title}
                                    width={1540}
                                    height={700}
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="w-full h-[320px] group-hover:scale-110 transition duration-500 object-cover"
                                />
                                <span className="absolute right-5 bottom-5 text-white font-chakrapetch bg-white/10 font-semibold backdrop-blur-sm rounded-sm text-2xl text-center p-3">
                                    {item.date}
                                </span>
                            </div>

                            <div className="blog-content px-2 py-5 space-y-5">
                                <p>
                                    <span className="border border-border px-2 rounded-sm">{item.category}</span> By {item.author}
                                </p>
                                <h4 className="font-unbounded font-medium pb-2">{item.title}</h4>
                                <p className="leading-6 text-pera-dark">{item.description}</p>

                                <Link
                                    href={`/blog/${item.slug}`}
                                    className="text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 px-2 justify-center items-center tracking-wider group mt-5 lg:mt-0"
                                >
                                    Read More
                                    <Icon icon="tabler:arrow-right" width="24" height="24"
                                        className="bg-prim text-white rounded-full h-full w-[30px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-10">
                        No posts found matching &quot;{searchTerm}&quot;.
                    </p>
                )}
            </div>

            <div className="lg:w-[40%] w-full lg:self-start sticky top-0 right-0">
                <div className="lg:sticky top-20 space-y-5">
                    <div className="shadow-lg border border-gray-100 bg-white p-5 rounded-xl">
                        <h4 className="text-black pb-5">Search here</h4>
                        <form className="search-box" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="Search here"
                                className="p-3 border border-border w-full rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="border border-gray-100 shadow-lg bg-white p-5 rounded-xl">
                        <h4 className="text-black pb-5">Recent Posts</h4>
                        <div className="flex flex-col gap-4">
                            {blogs.slice(0, 5).map((post) => (
                                <Link key={post._id} href={`/blog/${post.slug}`} className="flex items-center gap-3">
                                    <Image
                                        src={post.image || "/images/blog/blog-2.jpg"}
                                        alt={post.title}
                                        width={240}
                                        height={160}
                                        className="w-[120px] h-[80px] object-cover rounded-xl shrink-0"
                                    />
                                    <div>
                                        <h4 className="font-chakrapetch pb-1 text-15 font-semibold leading-tight">{post.title}</h4>
                                        <span className="uppercase text-pera-dark text-13">{post.date}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {categories.length > 0 && (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogBrowser;
