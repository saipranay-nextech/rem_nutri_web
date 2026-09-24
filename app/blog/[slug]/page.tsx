import { safeFetch } from '../../../sanity/lib/client'
import { PortableText } from '@portabletext/react'

import Image from "next/image";
import NavbarWrapper from "../../components/NavbarWrapper";

import Footer from "../../components/Footer";

import Link from "next/link";

const Customdate = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[rgb(94, 94, 94)] fill-current"
  >
    <path d="M 208 32 H 184 V 24 a 8 8 0 0 0 -16 0 v 8 H 88 V 24 a 8 8 0 0 0 -16 0 v 8 H 48 A 16 16 0 0 0 32 48 V 208 a 16 16 0 0 0 16 16 H 208 a 16 16 0 0 0 16 -16 V 48 A 16 16 0 0 0 208 32 Z M 72 48 v 8 a 8 8 0 0 0 16 0 V 48 h 80 v 8 a 8 8 0 0 0 16 0 V 48 h 24 V 80 H 48 V 48 Z M 208 208 H 48 V 96 H 208 V 208 Z m -96 -88 v 64 a 8 8 0 0 1 -16 0 V 132.94 l -4.42 2.22 a 8 8 0 0 1 -7.16 -14.32 l 16 -8 A 8 8 0 0 1 112 120 Z m 59.16 30.45 L 152 176 h 16 a 8 8 0 0 1 0 16 H 136 a 8 8 0 0 1 -6.4 -12.8 l 28.78 -38.37 A 8 8 0 1 0 145.07 132 a 8 8 0 1 1 -13.85 -8 A 24 24 0 0 1 176 136 A 23.76 23.76 0 0 1 171.16 150.45 Z"></path>
  </svg>
);

const Customauth = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10  text-[rgb(94, 94, 94)]  fill-current"
  >
    <path d="M 230.92 212 c -15.23 -26.33 -38.7 -45.21 -66.09 -54.16 a 72 72 0 1 0 -73.66 0 C 63.78 166.78 40.31 185.66 25.08 212 a 8 8 0 1 0 13.85 8 c 18.84 -32.56 52.14 -52 89.07 -52 s 70.23 19.44 89.07 52 a 8 8 0 1 0 13.85 -8 Z M 72 96 a 56 56 0 1 1 56 56 A 56.06 56.06 0 0 1 72 96 Z"></path>
  </svg>
);

const Customtime = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10  text-[rgb(94, 94, 94)]  fill-current"
  >
    <path d="M 128 40 a 96 96 0 1 0 96 96 A 96.11 96.11 0 0 0 128 40 Z m 0 176 a 80 80 0 1 1 80 -80 A 80.09 80.09 0 0 1 128 216 Z M 173.66 90.34 a 8 8 0 0 1 0 11.32 l -40 40 a 8 8 0 0 1 -11.32 -11.32 l 40 -40 A 8 8 0 0 1 173.66 90.34 Z M 96 16 a 8 8 0 0 1 8 -8 h 48 a 8 8 0 0 1 0 16 H 104 A 8 8 0 0 1 96 16 Z"></path>
  </svg>
);

type BlogPostProps = {
  params: { slug: string };
};

export default async function BlogPost({ params, }: { params: Promise<{ slug: string }>; }) {

  const { slug } = await params;

  const post = await safeFetch<any>(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      titleLine,
      mainImageUrl,
      secondImageUrl,
      publishedAt,
      "authorName": author->name,
      readTime,
      body
    }
  `, { slug }, null)

  const relatedPosts = await safeFetch<any[]>(`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0..1]{
    title,
    "slug": slug.current,
    "image": mainImageUrl,
    "description": titleLine
  }
`, { slug }, []);

  if (!post) {
    return <p style={{ color: 'black' }}>Blog post not found!</p>
  }

  return (
    <div>
      <NavbarWrapper />

      <header className="bg-[var(--background-color-dark)] text-[var(--text-color-plain)]  pt-40 md:pt-[13%] pb-[5%] px-[8%] min-h-[100vh] relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <span className="underline font-['DM_Sans', 'sans-serif'] text-[var(--text-color-plain)] text-[16px]">Home</span>
            <span className="mx-2 font-['DM_Sans', 'sans-serif'] text-[var(--text-color-plain)] text-[16px]">{">"}</span>
            <span className="underline font-['DM_Sans', 'sans-serif'] text-[var(--text-color-plain)] text-[16px]">Blog</span>
            <span className="mx-2 font-['DM_Sans', 'sans-serif'] text-[var(--text-color-plain)] text-[16px]">{">"}</span>
            <span className="font-['DM_Sans', 'sans-serif'] text-[var(--text-color-plain)]text-[16px]">
              {post.title}

            </span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-[56px] text-[var(--text-color-plain)] font-['Libre_Baskerville',serif] mt-[5%] leading-tight">
            {post.title}
          </h1>


          {/* Subtitle */}
          <p className="text-base md:text-[20px] text-[var(--text-color-plain)] mt-4 font-['DM_Sans', 'sans-serif'] max-w-2xl">
            {post.titleLine}

          </p>

        </div>

        {/* Image Positioned Over the Header */}
        <div className="relative w-full max-w-[90rem] mx-auto mt-[6rem]">
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-full max-w-[80rem]">
            <Image
              src={post.mainImageUrl}
              alt="Yoga session"
              width={1800} // Increased width
              height={600} // Increased height
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl "
            />
          </div>
          {/* Blog Card Section */}
          <div className="w-[90%] mx-auto rounded-2xl ">
            {/* Meta Information */}
            <div className="p-6 flex flex-col sm:flex-row sm:justify-between text-black text-sm gap-6 sm:gap-0">

              {/* Date */}
              <div className="flex items-center gap-3">
                <Customdate />
                <div className="flex flex-col">
                  <span className="font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Date</span>
                  <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Customauth />
                <div className="flex flex-col">
                  <span className=" font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Author</span>
                  <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">{post.authorName}</span>
                </div>
              </div>

              {/* Read Time */}
              <div className="flex items-center gap-3">
                <Customtime />
                <div className="flex flex-col">
                  <span className=" font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Read time</span>
                  <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">{post.readTime} mins</span>
                </div>
              </div>

            </div>
          </div>
        </div>






      </header>

      <div className="w-full flex flex-col items-center lg:px-32 py-24 pt-[15%] md:pt-[26%] min-h-screen">







        {/* Blog Card Section */}
        <div className="w-[85%] absolute mt-[20%] md:mt-[2%] mx-auto rounded-2xl ">
          {/* Meta Information */}
          <div className="p-6 flex flex-col sm:flex-row sm:justify-between text-black text-sm gap-6 sm:gap-0">

            {/* Date */}
            <div className="flex items-center gap-3">
              <Customdate />
              <div className="flex flex-col">
                <span className="font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Date</span>
                <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <Customauth />
              <div className="flex flex-col">
                <span className=" font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Author</span>
                <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">{post.authorName}</span>
              </div>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-3">
              <Customtime />
              <div className="flex flex-col">
                <span className=" font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">Read time</span>
                <span className="font-semibold font-['DM_Sans', 'sans-serif'] text-[16px] leading-tight">{post.readTime} mins</span>
              </div>
            </div>

          </div>
        </div>


        <div className=" w-[80%] md:w-full h-[1px] bg-gray-500 mt-[75%]  md:mt-[10%]"></div>




        <div className="max-w-4xl w-[75%] md:w-[60%] text-[14px] md:text-[18px] font-['DM_Sans', 'sans-serif'] text-black mt-[10%] md:mt-[8%]">


          {/* Section 1: Rehabilitation and Recovery */}

          <PortableText value={post.body} />


        </div>
        {/* Image Section */}
        <div className="w-[75%] md:w-[60%] max-w-4xl mt-15 md:mt-30">
  <Image
    src={post.secondImageUrl}
    alt="Yoga session"
    width={1200}
    height={400}
    className="w-full h-auto aspect-video object-cover object-top rounded-lg shadow-lg"
  />
</div>



      </div>




      <div className="w-full pb-16 pt-[8%] -mb-5  bg-[var(--background-color-plain2)] bg-cover bg-center bg-no-repeat relative py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          <div className="mb-15">
            <h2 className="text-[#1A1A1A] text-[40px] font-['Libre_Baskerville',serif]">
              View our other posts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {relatedPosts.map((post_: { slug: string; image: string; title: string; description: string }, index: number) => (
              <Link key={index} href={`/blog/${post_.slug}`} passHref>
                <div className="bg-[var(--background-color-plain3)] rounded-2xl overflow-hidden cursor-pointer md:h-[100%] ">
                  <div className="h-90 overflow-hidden rounded-2xl">
                    <img
                      src={post_.image}
                      alt={post_.title}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-300 hover:rotate-3 hover:scale-110"
                    />
                  </div>

                  <div className="p-12">
                    <h3 className="text-[var(--text-color-dark)] font-['Libre_Baskerville',serif] text-[20px] mb-3 leading-tight font-semibold">
                      {post_.title}
                    </h3>
                    <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-[16px] text-base">
                      {post_.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>;





    </div>
  )
}




