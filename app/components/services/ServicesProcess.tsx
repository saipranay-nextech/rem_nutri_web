"use client";
import React, { useRef, useEffect, useState } from "react";
import BookConsultationButton from "../BookConsultationButton";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ScrollAnimation from "../ScrollAnimation";
import Link from "next/link";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Created by experts",
    description:
      "Our programme is designed by a team of experts, including internationally trained, multidisciplinary professionals. Our team comprises advanced dietetic practitioners, endocrinologists, specialised physiotherapists, and psychologists, ensuring comprehensive and holistic care.",
  },
  {
    number: "02",
    title: "Evidence-based, sustainable recovery",
    description:
      "Our programme is built on robust research and evidence-based practices, combining the wisdom of Ayurveda with modern medicine. This science-backed approach ensures sustainable recovery and optimal health outcomes.",
  },
  {
    number: "03",
    title: "Tailor-made solutions-",
    description:
      "Our tailor-made solutions include personalised diet plans, continuous health monitoring, and expert counselling, ensuring each individual's unique needs are met for optimal results.",
  },
  {
    number: "04",
    title: "Holistic healing without any fads or crash diets",
    description:
      "Embrace holistic healing without resorting to fads or crash diets. Our programme features expert-led sessions for knowledge transfer, exercise modules and nutrition plans crafted to foster enduring health and well-being.",
  }
];

const ServicesProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);
  const [initialLoad, setInitialLoad] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const lineScaleFactor = useTransform(
    scrollYProgress,
    [0, 1],
    [1, svgHeight / 160]
  );

  // Track scroll progress to reveal sections
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if (!contentRef.current) return;

      const totalHeight = contentRef.current.offsetHeight;
      const currentLineHeight = totalHeight * value;

      // Get positions of all steps
      const stepPositions = stepRefs.current.map((ref) => ref?.offsetTop || 0);

      // Calculate which steps should be visible based on line progress
      const newVisibleSteps = stepPositions.map((position, index) => {
        // First step is always visible initially
        if (index === 0 && value < 0.1) return true;

        // Progressive thresholds - earlier reveal for each subsequent step
        let threshold;
        if (index === 1) threshold = position - 400; // 2nd step
        else if (index === 2) threshold = position - 600; // 3rd step
        else if (index === 3) threshold = position - 800; // 4th step
        else if (index === 4) threshold = position - 1000; // 5th step
        else threshold = position - 300;

        return currentLineHeight >= threshold;
      });

      // Force visibility for sections when we're at certain scroll points
      if (value > 0.3 && !newVisibleSteps[1]) newVisibleSteps[1] = true; // 2nd step
      if (value > 0.5 && !newVisibleSteps[2]) newVisibleSteps[2] = true; // 3rd step
      if (value > 0.7 && !newVisibleSteps[3]) newVisibleSteps[3] = true; // 4th step
      if (value > 0.85 && !newVisibleSteps[4]) newVisibleSteps[4] = true; // 5th step

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
    <section className="bg-[var(--background-color-dark)] text-[var(--text-color-plain)] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start ">
            <ScrollAnimation>
              <h2 className="text-5xl mb-8 font-['Libre_Baskerville',serif]">
                {" "}
                <span className="text-[var(--text-color-light)]">WHY CHOOSE  </span>US
              </h2>
              <p className="text-lg mb-8">
                We focus on personalized care and evidence-based techniques,
                guiding you towards a healthier life.
              </p>
              <div>
                <BookConsultationButton
                  className="inline-block bg-[var(--background-color-light)] hover:opacity-50 font-bold text-[var(--text-color-dark)] py-3 px-6 rounded-md transition-colors"
                >
                  Book an appointment
                </BookConsultationButton>
              </div>
              <ScrollAnimation delay={0.6}>
                <div className="relative mt-12">
                  {/* Shadow Effects */}
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-[#8FC2AA] rounded-2xl"></div>

                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden relative z-10">
                    <img
                      src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Patient receiving physiotherapy treatment"
                      className="w-full md:h-175 h-80 object-cover"
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
                <div className="absolute left-0 top-0 w-[2px] h-full bg-[#0F4C3A]"></div>

                <div className="absolute left-0 top-0 h-full overflow-visible">
                  <motion.div
                    className="absolute left-0 top-0 w-[2px] bg-[var(--background-color-light)] origin-top shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                    style={{
                      height: initialLoad ? "250px" : "200px",
                      scaleY: lineScaleFactor,
                      transformOrigin: "top",
                      transition: "all 0.1s ease-out",
                    }}
                  ></motion.div>
                </div>
              </div>

              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex items-start sm:pl-16 pl-12"
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                >
                  <div className="absolute left-0 -translate-x-1/2 bg-[var(--background-color-dark)] py-4 z-10 font-['Libre_Baskerville',serif]">
                    <motion.div
                      className="relative text-7xl font-bold italic"
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
                        Precision diagnosis, personalized care.
                      </div>
                      <h3 className="text-4xl text-[var(--text-color-plain)] font-bold mb-4 font-['Libre_Baskerville',serif]">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-[var(--text-color-plain)] max-w-2xl">
                        {step.description}
                      </p>
                      {index === 3 && (
                        <div className="mt-8">
                          <Link href="/health-assessment">
                            <button className="inline-flex items-center gap-2 bg-[var(--background-color-light)] hover:bg-opacity-90 text-[var(--text-color-dark)] font-semibold py-3 px-6 rounded-md transition-all duration-300">
                              FIND THE RIGHT PROGRAM
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="py-0 md:py-16"></div>
    </section>
  );
};

export default ServicesProcess;
