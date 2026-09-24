import Image from "next/image";
 import GetInTouch from "../components/GetInTouch";
 import Link from "next/link";
 import { safeFetch } from "../../sanity/lib/client";
 import ScrollAnimation from "../components/ScrollAnimation";
 import NavbarWrapper from "../components/NavbarWrapper";
 export default async function Blog() {
  const blogPosts = await safeFetch<any[]>(`
    *[_type == "post"] | order(publishedAt desc){
      title,
      "slug": slug.current,
      "image": mainImageUrl,
      "description": titleLine,
      publishedAt
    }
  `, {}, []);

  return (
    <>
      <NavbarWrapper />

      {/* Hero Section */}
      <div className="bg-[var(--background-color-dark)] py-40 md:py-50 text-left md:text-center relative px-6 md:px-0">
        <ScrollAnimation>
          <h1 className="text-[40px] md:text-[56px] font-['Libre_Baskerville',serif] text-[var(--text-color-plain)] leading-tight">
            Physio pulse to unleash the <br />
            <span className="text-[var(--text-color-light)]">power of movement</span>
          </h1>
        </ScrollAnimation>
      </div>

      {/* Blog Posts Grid */}
      <div className="relative -mt-30 sm:-mt-32 md:-mt-40 max-w-7xl mx-auto grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-2 px-4 sm:px-6 lg:px-10 mb-16 sm:mb-20 md:mb-40">
        <div className="md:col-span-2 mb-0 md:mb-4">
          <div className="w-full h-0.5 bg-transparent"></div>
        </div>

        {blogPosts.map((post: any, index: number) => (
          <ScrollAnimation key={index} delay={index * 0.2}>
            <Link href={`/blog/${post.slug}`} passHref>
              <div className="bg-[var(--background-color-plain3)] rounded-2xl overflow-hidden w-full max-w-[600px] lg:max-w-none mx-auto h-auto cursor-pointer flex flex-col shadow-md hover:shadow-xl transition-all duration-300">
                <div className="h-[280px] md:h-[320px] lg:h-[380px] overflow-hidden flex-shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 hover:rotate-3 hover:scale-110"
                    width={1200}
                    height={700}
                    priority
                  />
                </div>
                <div className="p-5 md:p-6 lg:p-8 flex-grow overflow-visible">
                  <h3 className="text-[var(--text-color-dark)] font-['Libre_Baskerville',serif] text-xl md:text-2xl lg:text-2xl leading-tight font-semibold break-words">
                    {post.title}
                  </h3>
                  <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-sm md:text-base lg:text-base mt-3 lg:mt-4 break-words">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 lg:mt-6">
                    <span className="text-[var(--text-color-dark)]/70 text-xs md:text-sm">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-blue-500 font-medium text-sm md:text-base inline-flex items-center group transition-all duration-300 py-1 px-2 rounded-md hover:bg-[var(--accent-color)]/10 hover:underline cursor-pointer">
                      Read More
                      <svg
                        className="w-4 h-4 ml-1 transition-all duration-300 ease-in-out transform group-hover:translate-x-1.5 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollAnimation>
        ))}
      </div>

      <GetInTouch />
    </>
  );
}
