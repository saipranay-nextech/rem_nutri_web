import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";
import { safeFetch } from "../../sanity/lib/client";
import BlogCard from "./BlogCard";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const BlogSection = async () => {
  const blogPosts = await safeFetch<BlogPost[]>(`
    *[_type == "post"] | order(publishedAt desc)[0..1]{
      title,
      "slug": slug.current,
      "image": mainImageUrl,
      "description": titleLine,
      publishedAt
    }
  `, {}, []);

  return (
    <div className="w-full pt-16 md:py-16 bg-[var(--background-color-plain)] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute top-[9px] md:-top-0 left-[50%] w-27 h-27 transform -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 79 88" id="svg10114666377" className="w-22 h-22 md:w-30 md:h-26">
          <path
            d="M 33.29 0.098 L 62.459 0.098 L 43.566 25.211 L 78.958 25.211 L 16.231 87.982 L 35.359 45.656 L 0.174 45.656 Z"
            fill="#8FC2AB"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <ScrollAnimation>
          <div className="mb-6 sm:mb-10">
            <h2 className="text-[var(--text-color-dark)] text-[36px] sm:text-[40px] font-['Libre_Baskerville',serif] mb-4">
              Insights and tips from our
              <br />
              health experts
            </h2>
            <Link href="/blog">
              <Button
                variant="default"
                className="bg-[var(--background-color-dark)] font-['DM_Sans','sans-serif'] font-semibold 
                text-xl hover:bg-[var(--background-color-dark)]/80 text-[var(--text-color-plain)] rounded 
                text-[18px] sm:text-[16px] px-8 sm:px-6 py-6 sm:py-5 w-full sm:w-auto"
              >
                View blog
              </Button>
            </Link>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 sm:mt-12 mb-15">
          {blogPosts.map((post, index) => (
            <div key={post.slug} className="h-full">
              <ScrollAnimation delay={index * 0.2}>
                <BlogCard post={post} index={index} />
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
