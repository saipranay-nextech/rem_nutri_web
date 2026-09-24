"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BookConsultationButton from "../../components/BookConsultationButton";
import ScrollAnimation from "../../components/ScrollAnimation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
const DecorativeCircle = () => (
  <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-[10px] md:border-[15px] border-[#A6C6B2] flex items-center justify-center">
    <div className="w-3/4 h-3/4 rounded-full flex items-center justify-center border-[10px] md:border-[15px] border-[#F4C6A5]"></div>
  </div>
);

const DecorativeStar = () => (
  <svg width="120" height="120" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12">
    <path d="M 70.957 49.812 C 94.5 50.563 111.783 53.045 111.783 55.991 C 111.783 58.937 94.5 61.419 70.957 62.169 C 87.074 79.347 97.54 93.323 95.457 95.406 C 93.373 97.489 79.397 87.023 62.219 70.906 C 61.47 94.449 58.987 111.733 56.041 111.733 C 53.095 111.733 50.613 94.449 49.863 70.906 C 32.685 87.023 18.709 97.489 16.626 95.406 C 14.542 93.323 25.009 79.347 41.126 62.169 C 17.583 61.419 0.299 58.937 0.299 55.991 C 0.299 53.045 17.583 50.563 41.126 49.812 C 25.009 32.635 14.543 18.659 16.626 16.575 C 18.709 14.492 32.685 24.958 49.863 41.075 C 50.613 17.532 53.095 0.249 56.041 0.249 C 58.987 0.249 61.47 17.532 62.219 41.075 C 79.397 24.958 93.373 14.492 95.457 16.575 C 97.54 18.659 87.074 32.635 70.957 49.812 Z" fill="#A6C6B2"/>
  </svg>
);

const programSteps = [
  {
    number: "01",
    title: "Personalised Consultations",
    subtitle: "One-on-one expert guidance",
    description: "Regular personalised, one-to-one consultations with a specialist dietitian ensure you receive focused attention and expert guidance throughout your weight loss journey.",
  },
  {
    number: "02",
    title: "Education Modules",
    subtitle: "Building knowledge for sustainable results",
    description: "Access comprehensive online education modules on healthy eating, balanced diet, and goal setting to help you develop lifelong healthy habits that go beyond just calorie counting.",
  },
  {
    number: "03",
    title: "Meal Solutions",
    subtitle: "Delicious and nutritious options",
    description: "Enjoy delicious and balanced meals loaded with nutrients, curated by specialist dietitians and experienced chefs, conveniently delivered to your doorstep. Alternatively, receive recipes that you can prepare yourself.",
  },
  {
    number: "04",
    title: "Expert Support",
    subtitle: "Motivation to reach your goals",
    description: "Receive ongoing support from our team of experts to help you stay motivated to achieve your goals, whether you are aiming for intense weight loss or simply staying fit.",
  },
];

const RemFitPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([true, false, false, false]);
  const [initialLoad, setInitialLoad] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const lineScaleFactor = useTransform(
    scrollYProgress,
    [0, 1],
    [1, svgHeight / 160]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (!contentRef.current) return;

      const totalHeight = contentRef.current.offsetHeight;
      const currentLineHeight = totalHeight * value;

      const stepPositions = stepRefs.current.map((ref) => ref?.offsetTop || 0);

      const newVisibleSteps = stepPositions.map((position, index) => {
        if (index === 0 && value < 0.1) return true;

        let threshold;
        if (index === 1) threshold = position - 400;
        else if (index === 2) threshold = position - 600;
        else if (index === 3) threshold = position - 800;
        else threshold = position - 300;

        return currentLineHeight >= threshold;
      });

      if (value > 0.3 && !newVisibleSteps[1]) newVisibleSteps[1] = true;
      if (value > 0.5 && !newVisibleSteps[2]) newVisibleSteps[2] = true;
      if (value > 0.7 && !newVisibleSteps[3]) newVisibleSteps[3] = true;

      setVisibleSteps(newVisibleSteps);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialLoad]);

  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      {/* Hero Section */}
      <div className="relative min-h-screen bg-[var(--background-color-dark)] pt-28 md:pt-20" ref={heroRef}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('/images/rem_nutri_hero_Section.webp')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background-color-dark)]/95 via-[var(--background-color-dark)]/90 to-[var(--background-color-dark)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-80px)]">
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 relative z-10 pt-4 md:pt-0"
              style={{ opacity, y }}
            >
              <ScrollAnimation>
                <div className="flex flex-col items-start">
                  {/* Program Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-3 bg-[var(--text-color-light)]/10 rounded-full px-4 py-2.5 mb-6 md:mb-8"
                  >
                    <span className="text-[var(--text-color-light)] text-sm md:text-base">Weight Loss Education Program</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[48px] lg:text-[64px] font-['Libre_Baskerville',serif] text-[var(--text-color-plain)] leading-tight mb-6"
                  >
                    Rem<span className="text-[var(--text-color-light)]">Fit</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl lg:text-2xl text-[var(--text-color-plain)]/80 font-['DM_Sans', 'sans-serif'] leading-relaxed mb-8 max-w-2xl"
                  >
                    Learn healthy habits and achieve your weight loss goals with our sustainable program, going beyond just calorie counting!
                  </motion.p>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-2 gap-6 mb-12"
                  >
                    {[
                      { number: "100%", label: "Personalized" },
                      { number: "24/7", label: "Expert Support" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-[var(--text-color-light)] text-3xl font-bold mb-1">{stat.number}</div>
                        <div className="text-[var(--text-color-plain)]/60 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-row gap-3 w-full"
                  >
                    <a
                      href="/health-assessment"
                      className="flex-1 text-center items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-[var(--text-color-light)] text-black font-semibold rounded-xl hover:opacity-90 transition-all duration-300 text-base sm:text-base"
                    >
                      Start Your Journey
                    </a>
                    <BookConsultationButton
                      className="flex-1 text-center items-center justify-center px-4 sm:px-6 py-3 sm:py-4 border border-[var(--text-color-plain)]/20 text-[var(--text-color-plain)] font-semibold rounded-xl hover:bg-[var(--text-color-plain)]/10 transition-all duration-300 text-base sm:text-base"
                    />
                  </motion.div>
                </div>
              </ScrollAnimation>
            </motion.div>

            {/* Right Content - Image */}
            <motion.div 
              className="lg:col-span-5 relative z-10"
              style={{ scale }}
            >
              <ScrollAnimation delay={0.2}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative"
                >
                  {/* Main Image */}
                  <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/rem_nutri_hero_Section.webp"
                      alt="RemFit Program"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color-dark)] to-transparent"></div>
                  </div>

                  {/* Floating Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -left-8 bottom-32 bg-[var(--background-color-dark)]/80 backdrop-blur-sm rounded-xl p-4 border border-[var(--text-color-plain)]/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[var(--text-color-light)]/10 flex items-center justify-center">
                        <span className="text-2xl">⭐</span>
                      </div>
                      <div>
                        <div className="text-[var(--text-color-plain)] font-semibold">Proven Results</div>
                        <div className="text-[var(--text-color-plain)]/70 text-sm">Join our success stories</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollAnimation>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="text-[var(--text-color-plain)]/60 text-sm">Scroll to explore</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-[var(--text-color-plain)]/20 rounded-full flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-[var(--text-color-light)] rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-[var(--background-color-plain)] py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-['Libre_Baskerville',serif] text-[var(--text-color-dark)] mb-4">
                About Weight Management
              </h2>
              <div className="w-16 h-[2px] bg-[var(--text-color-light)] mx-auto"></div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Understanding Weight Management */}
            <ScrollAnimation>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[var(--text-color-dark)]/10 h-auto min-h-fit lg:h-[320px] flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-[var(--text-color-light)]/5 hover:border-[var(--text-color-light)]/20 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[var(--text-color-light)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--text-color-dark)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[24px] font-['Libre_Baskerville',serif] text-[var(--text-color-dark)]">
                    Understanding Weight Management
                  </h3>
                </div>
                <p className="text-[var(--text-color-dark)]/80 text-lg leading-relaxed font-['DM_Sans', 'sans-serif'] flex-grow pr-2">
                  Weight management is about more than just dieting or exercise. It requires a holistic approach that includes healthy eating habits, physical activity, and behavioral changes that can be maintained over time for sustainable results.
                </p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-2 text-[var(--text-color-dark)]/60 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Beyond calorie counting to sustainable lifestyle changes</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* The RemFit Solution */}
            <ScrollAnimation delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-[var(--text-color-dark)]/10 h-auto min-h-fit lg:h-[320px] flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-[var(--text-color-light)]/5 hover:border-[var(--text-color-light)]/20 hover:transform hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[var(--text-color-light)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--text-color-dark)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-[24px] font-['Libre_Baskerville',serif] text-[var(--text-color-dark)]">
                    The RemFit Solution
                  </h3>
                </div>
                <p className="text-[var(--text-color-dark)]/80 text-lg leading-relaxed font-['DM_Sans', 'sans-serif'] flex-grow pr-2">
                  Our program combines personalized nutrition, education, and ongoing support to help you achieve your weight loss goals. We focus on teaching healthy habits that can be maintained for life, whether you're aiming for significant weight loss or simply staying fit.
                </p>

                

                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-2 text-[var(--text-color-dark)]/60 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Personalized approach for sustainable results</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* Program Features Section */}
      <section className="bg-[var(--background-color-dark)] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <ScrollAnimation>
                <h2 className="text-5xl mb-8 font-['Libre_Baskerville',serif]">
                  <span className="text-[var(--text-color-light)]">Program Features</span> 
                  <span className="text-[var(--text-color-plain)] force-white-text">for
                  your journey to wellness.</span>
                </h2>
                <p className="text-lg mb-8 text-[var(--text-color-plain)]/80 force-white-text">
                  Our comprehensive program combines expert guidance, education, and practical solutions
                  to help you achieve lasting health improvements and weight loss goals.
                </p>
                <div>
                  <a
                    href="/health-assessment"
                    className="inline-block bg-[var(--text-color-light)] text-black font-medium py-3 px-6 rounded-xl transition-colors hover:opacity-90"
                  >
                    Start Your Journey
                  </a>
                </div>
                <ScrollAnimation delay={0.6}>
                  <div className="relative mt-12">
                    <div className="absolute -bottom-3 -right-3 w-full h-full bg-[var(--text-color-light)]/20 rounded-2xl"></div>
                    <div className="rounded-2xl overflow-hidden relative z-10">
                      <Image
                        src="https://images.unsplash.com/photo-1500468756762-a401b6f17b46?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="RemFit Program Features"
                        width={500}
                        height={300}
                        className="w-full h-[300px] md:h-[650px] object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </ScrollAnimation>
              </ScrollAnimation>
            </div>

            <motion.div
              className="lg:col-span-7 relative overflow-hidden sm:pl-20 pl-10"
              ref={containerRef}
            >
              <div className="space-y-48 relative" ref={contentRef}>
                <div className="absolute left-0 top-0 h-full z-0">
                  <div className="absolute left-0 top-0 w-[2px] h-full bg-[var(--text-color-plain)]/20"></div>
                  <div className="absolute left-0 top-0 h-full overflow-visible">
                    <motion.div
                      className="absolute left-0 top-0 w-[2px] bg-[var(--text-color-light)] origin-top"
                      style={{
                        height: initialLoad ? "250px" : "200px",
                        scaleY: lineScaleFactor,
                        transformOrigin: "top",
                        transition: "all 0.1s ease-out",
                      }}
                    ></motion.div>
                  </div>
                </div>

                {programSteps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex items-start sm:pl-16 pl-12"
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                  >
                    <div className="absolute left-0 -translate-x-1/2 bg-[var(--background-color-dark)] py-4 z-10">
                      <motion.div
                        className="relative text-7xl font-bold italic font-['Libre_Baskerville',serif]"
                        animate={{
                          color: visibleSteps[index] ? "#ffffff" : "#ffffff70",
                        }}
                      >
                        {step.number}
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{
                        opacity: visibleSteps[index] ? 1 : 0,
                        y: visibleSteps[index] ? 0 : 50,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                    >
                      <div className="pt-4 pl-5">
                        <div className="mb-2 text-[var(--text-color-light)] text-sm">
                          {step.subtitle}
                        </div>
                        <h3 className="text-4xl text-[var(--text-color-plain)] force-white-text font-bold mb-4 font-['Libre_Baskerville',serif]">
                          {step.title}
                        </h3>
                        <p className="text-[var(--text-color-plain)]/80 force-white-text max-w-2xl text-lg">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="bg-[var(--background-color-plain2)] py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollAnimation>
            <div className="relative bg-[var(--background-color-dark)] rounded-2xl p-10 md:p-16 text-center overflow-hidden">
              {/* Subtle Gradient Border */}
              <div className="absolute inset-0 border border-[var(--text-color-light)]/10 rounded-2xl"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-[40px] sm:text-[48px] font-['Libre_Baskerville',serif] text-[var(--text-color-plain)] force-white-text mb-6"
                >
                  Transform Your Health <span className="text-[var(--text-color-light)]">Today</span>
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[var(--text-color-plain)]/70 force-white-text text-lg mb-8"
                >
                  Take the first step towards a healthier future with our expert guidance.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex justify-center items-center w-full max-w-md mx-auto"
                >
                  <BookConsultationButton
                    hoverScale={1.02}
                    className="text-center py-3 sm:py-4 px-8 bg-[var(--text-color-light)] text-black font-semibold rounded-xl hover:opacity-90 transition-all duration-300 text-base sm:text-base min-w-[200px]"
                  />
                </motion.div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default RemFitPage;
