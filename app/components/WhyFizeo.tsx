"use client"



import React from "react";
import { Heart, Target, Leaf, User } from "lucide-react";
import { Button } from "../components/ui/button";
import ScrollAnimation from "./ScrollAnimation";
import Link from "next/link";

const FeatureCard = ({
  icon,
  title,
  description,
  isExpanded,
  onToggle,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: (index: number) => void;
  index: number;
}) => {
  // Get first 100 characters for preview
  const previewText = description.slice(0, 100) + "...";

  return (
    <div className="bg-[var(--background-color-plain)] w-full max-w-[575px] min-h-fit sm:min-h-[220px] border border-[#ebe5da] p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-between overflow-visible sm:overflow-hidden">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-color-dark)] text-[22px] flex-shrink-0">{icon}</span>
          <h3 className="text-[var(--text-color-dark)] text-[18px] sm:text-[20px] md:text-[22px] font-bold font-['Libre_Baskerville'] break-words">
            {title}
          </h3>
        </div>
        <div className="mt-4">
          {/* Mobile view with expand/collapse */}
          <div className="sm:hidden">
            <p className={`text-[var(--text-color-dark)] text-[14px] sm:text-[15px] font-light leading-relaxed transition-all duration-300 ${isExpanded ? 'line-clamp-none pb-2' : 'line-clamp-2'} break-words`}>
              {isExpanded ? description : previewText}
            </p>
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => onToggle(index)}
                className="group relative flex items-center gap-2 text-[var(--text-color-dark)] hover:text-[var(--text-color-dark)] 
                         transition-all duration-300 hover:-translate-y-1"
              >
                {/* Content wrapper - with single animation container */}
                <div className="relative z-10 flex items-center gap-2 animate-[bounce_2s_ease-in-out_infinite]">
                  <span className="text-[15px] font-medium tracking-wide relative inline-block">
                    {isExpanded ? 'Show less' : 'Read more'}
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--text-color-dark)]/50 
                                  md:hidden"></span>
                  </span>
                  <svg 
                    className={`w-5 h-5 transform transition-all duration-500 ${isExpanded ? 'rotate-180' : ''} 
                             group-hover:translate-x-1 inline-block`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* No hover background effect */}
              </button>
            </div>
          </div>
          
          {/* Desktop view */}
          <p className="hidden sm:block text-[var(--text-color-dark)] text-[15px] md:text-[16px] font-light leading-relaxed text-center break-words">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Topdecorative = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="fill-[#8FC2AA] w-full h-full md:w-30 md:h-30"
  >
    <path d="M 48.292 12.972 L 35.025 0.157 L 21.758 12.972 L 0.186 25.348 L 10.29 45.126 L 13.433 65.918 L 35.025 63.539 L 56.617 65.918 L 59.76 45.126 L 69.864 25.348 Z"></path>
  </svg>
);

const Customcare = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6.60301C13.667 5.33201 17.5 3.74301 21 6.60301V19C17.5 16.14 13.667 17.729 12 19M12 6.60301C10.333 5.33201 6.5 3.74301 3 6.60301V19C6.5 16.14 10.333 17.729 12 19M12 6.60301V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const Customexpertise = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 1C12.3358 3.06658 15.3845 4.14257 18.5 4C18.9536 5.54302 19.0924 7.16147 18.9081 8.75918C18.7239 10.3569 18.2203 11.9013 17.4274 13.3005C16.6345 14.6998 15.5684 15.9254 14.2925 16.9045C13.0165 17.8836 11.5568 18.5962 10 19C8.44323 18.5962 6.9835 17.8836 5.70756 16.9045C4.43163 15.9254 3.36553 14.6998 2.57261 13.3005C1.7797 11.9013 1.27615 10.3569 1.09189 8.75918C0.907634 7.16147 1.04642 5.54302 1.50002 4C4.61555 4.14257 7.66419 3.06658 10 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const Customwellness = () => (
  <svg width="24" height="24" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 7.98785L17.0087 9.96665L12.6558 13.1201L12.6808 18.9788L16 19.0001L15.8137 14.7573C19.2744 12.5929 21.0048 11.0072 21.0048 10.0001C21.0048 8.993 21.0048 6.3361 21.0048 1.02937" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.50005 8.0255L5.0166 10.0001L9.2003 13.208L9.3798 19.064L6.00005 19.0001L6.1015 14.9544C2.7047 13.0005 1.00635 11.5126 1.00635 10.4906C1.00635 9.4687 1.00635 6.64335 1.00635 1.01459" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const Custompatient = () => (
  <svg width="24" height="24" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 6C8.598 4.9285 9.1175 2.4285 11 1C11.686 1.8335 13.265 4 13.5 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.876 19C6.64098 18.2725 -1.15002 13.655 1.55998 1C5.13598 1.818 12.0055 6.5635 10.876 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.124 19C15.359 18.2725 23.15 13.655 20.44 1C16.864 1.818 9.99449 6.5635 11.124 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const Custompositive = () => (
  <svg width="26" height="26" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M18 11.007H2.074V11.008H1C0.734784 11.008 0.48043 11.1134 0.292893 11.3009C0.105357 11.4884 0 11.7428 0 12.008C0 12.2732 0.105357 12.5276 0.292893 12.7151C0.48043 12.9026 0.734784 13.008 1 13.008H2.074C2.07506 14.3334 2.60231 15.6041 3.53988 16.5409C4.47745 17.4778 5.74861 18.004 7.074 18.004H13C14.3254 18.004 15.5966 17.4778 16.5341 16.5409C17.4717 15.6041 17.9989 14.3334 18 13.008H19C19.2652 13.008 19.5196 12.9026 19.7071 12.7151C19.8946 12.5276 20 12.2732 20 12.008C20 11.7428 19.8946 11.4884 19.7071 11.3009C19.5196 11.1134 19.2652 11.008 19 11.008L18 11.007ZM16 13.007H4.074C4.07506 13.802 4.3916 14.564 4.95409 15.1257C5.51659 15.6875 6.27904 16.003 7.074 16.003H13C13.795 16.003 14.5574 15.6875 15.1199 15.1257C15.6824 14.564 15.9989 13.802 16 13.007ZM10.926 1.337L10.502 1.955C10.065 2.593 10.03 3.11 10.096 3.492C10.168 3.9 10.367 4.217 10.5 4.41L10.522 4.441C10.682 4.67 11.009 5.141 11.128 5.811C11.257 6.537 11.128 7.403 10.524 8.397L10.134 9.037L8.854 8.259L9.243 7.618C9.684 6.892 9.708 6.392 9.651 6.072C9.591 5.731 9.424 5.49 9.271 5.268L9.267 5.264C9.097 5.018 8.747 4.484 8.619 3.749C8.486 2.989 8.603 2.073 9.265 1.107L9.689 0.488998L10.926 1.337ZM6.135 2.894L5.711 3.512C5.406 3.957 5.389 4.302 5.432 4.546C5.479 4.817 5.612 5.032 5.709 5.172L5.727 5.197C5.849 5.373 6.118 5.759 6.216 6.307C6.322 6.907 6.212 7.61 5.734 8.397L5.344 9.037L4.062 8.259L4.452 7.618C4.768 7.098 4.773 6.763 4.739 6.568C4.699 6.351 4.594 6.196 4.476 6.026C4.21572 5.66118 4.03763 5.24427 3.954 4.804C3.846 4.18 3.944 3.437 4.474 2.664L4.899 2.045L6.135 2.894ZM15.712 2.894L15.288 3.512C14.983 3.957 14.966 4.302 15.008 4.546C15.0561 4.78212 15.157 5.00431 15.303 5.196C15.426 5.373 15.695 5.759 15.793 6.306C15.899 6.907 15.789 7.61 15.31 8.396L14.92 9.038L13.639 8.258L14.029 7.618C14.344 7.098 14.349 6.763 14.315 6.568C14.276 6.351 14.171 6.196 14.053 6.026C13.7927 5.66118 13.6146 5.24427 13.531 4.804C13.422 4.18 13.521 3.437 14.051 2.664L14.475 2.045L15.712 2.894Z" fill="black"/>
</svg>

);

const Customcommunity = () => (
  <svg width="24" height="24" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 1.5C6.66848 1.5 6.35054 1.6317 6.11612 1.86612C5.8817 2.10054 5.75 2.41848 5.75 2.75C5.75 3.08152 5.8817 3.39946 6.11612 3.63388C6.35054 3.8683 6.66848 4 7 4C7.33152 4 7.64946 3.8683 7.88388 3.63388C8.1183 3.39946 8.25 3.08152 8.25 2.75C8.25 2.41848 8.1183 2.10054 7.88388 1.86612C7.64946 1.6317 7.33152 1.5 7 1.5ZM4.75 2.75C4.75 2.15326 4.98705 1.58097 5.40901 1.15901C5.83097 0.737053 6.40326 0.5 7 0.5C7.59674 0.5 8.16903 0.737053 8.59099 1.15901C9.01295 1.58097 9.25 2.15326 9.25 2.75C9.25 3.34674 9.01295 3.91903 8.59099 4.34099C8.16903 4.76295 7.59674 5 7 5C6.40326 5 5.83097 4.76295 5.40901 4.34099C4.98705 3.91903 4.75 3.34674 4.75 2.75ZM2 3C1.73478 3 1.48043 3.10536 1.29289 3.29289C1.10536 3.48043 1 3.73478 1 4C1 4.26522 1.10536 4.51957 1.29289 4.70711C1.48043 4.89464 1.73478 5 2 5C2.26522 5 2.51957 4.89464 2.70711 4.70711C2.89464 4.51957 3 4.26522 3 4C3 3.73478 2.89464 3.48043 2.70711 3.29289C2.51957 3.10536 2.26522 3 2 3ZM0 4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2C2.53043 2 3.03914 2.21071 3.41421 2.58579C3.78929 2.96086 4 3.46957 4 4C4 4.53043 3.78929 5.03914 3.41421 5.41421C3.03914 5.78929 2.53043 6 2 6C1.46957 6 0.960859 5.78929 0.585786 5.41421C0.210714 5.03914 0 4.53043 0 4ZM11 4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289C12.8946 3.48043 13 3.73478 13 4C13 4.26522 12.8946 4.51957 12.7071 4.70711C12.5196 4.89464 12.2652 5 12 5C11.7348 5 11.4804 4.89464 11.2929 4.70711C11.1054 4.51957 11 4.26522 11 4ZM12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4C10 4.53043 10.2107 5.03914 10.5858 5.41421C10.9609 5.78929 11.4696 6 12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2ZM3.25 7.25C3.25 7.13867 3.25883 7.03017 3.2765 6.9245L0.9265 7.554C0.606331 7.63989 0.333388 7.84943 0.167703 8.13654C0.00201844 8.42365 -0.042838 8.76482 0.043 9.085L0.496 10.775C0.605345 11.1833 0.799748 11.5639 1.06647 11.8919C1.33319 12.2198 1.6662 12.4877 2.04368 12.678C2.42117 12.8682 2.83459 12.9765 3.25687 12.9959C3.67914 13.0152 4.10073 12.945 4.494 12.79C4.22371 12.5474 3.99011 12.2668 3.8005 11.957C3.30049 12.0608 2.77969 11.9695 2.34488 11.7016C1.91008 11.4338 1.59419 11.0098 1.462 10.5165L1.009 8.8265C1.00045 8.79479 0.998236 8.7617 1.00248 8.72913C1.00673 8.69656 1.01735 8.66514 1.03374 8.63668C1.05013 8.60821 1.07197 8.58326 1.09801 8.56324C1.12405 8.54322 1.15378 8.52853 1.1855 8.52L3.25 7.967V7.25ZM9.8285 12.8965C9.71892 12.8673 9.61108 12.8319 9.5055 12.7905C9.77596 12.5479 10.0097 12.2673 10.1995 11.9575C10.6994 12.061 11.22 11.9695 11.6546 11.7015C12.0892 11.4336 12.4049 11.0097 12.537 10.5165L12.9895 8.826C13.0066 8.76202 12.9976 8.69386 12.9645 8.63649C12.9315 8.57912 12.877 8.53722 12.813 8.52L10.75 7.967V7.25C10.75 7.13933 10.7412 7.031 10.7235 6.925L13.072 7.554C13.3922 7.63989 13.6651 7.84943 13.8308 8.13654C13.9965 8.42365 14.0413 8.76482 13.9555 9.085L13.5025 10.775C13.2966 11.5435 12.7939 12.1988 12.1049 12.5966C11.4159 12.9945 10.597 13.1024 9.8285 12.8965ZM5.25 6C4.91848 6 4.60054 6.1317 4.36612 6.36612C4.1317 6.60054 4 6.91848 4 7.25V10C4 10.7956 4.31607 11.5587 4.87868 12.1213C5.44129 12.6839 6.20435 13 7 13C7.79565 13 8.55871 12.6839 9.12132 12.1213C9.68393 11.5587 10 10.7956 10 10V7.25C10 6.91848 9.8683 6.60054 9.63388 6.36612C9.39946 6.1317 9.08152 6 8.75 6H5.25ZM5 7.25C5 7.1837 5.02634 7.12011 5.07322 7.07322C5.12011 7.02634 5.1837 7 5.25 7H8.75C8.8163 7 8.87989 7.02634 8.92678 7.07322C8.97366 7.12011 9 7.1837 9 7.25V10C9 10.5304 8.78929 11.0391 8.41421 11.4142C8.03914 11.7893 7.53043 12 7 12C6.46957 12 5.96086 11.7893 5.58579 11.4142C5.21071 11.0391 5 10.5304 5 10V7.25Z" fill="black"/>
</svg>


);


const WhyFizeo = () => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  
  const features = [
    {
      icon: <Customcare />,
      title: "Empowerment for Long-Term Success",
      description:
        "We enable you to inculcate healthy habits that stick with you for life to aid your recovery by empowering you with knowledge through an 8 to 12 week programme that covers the basic symptoms and solutions to easing your problem.",
    },
    {
      icon: <Customexpertise />,
      title: "Evidence-Based Approach",
      description:
        "Created by professionals with decades of experience in the field of health and wellness, all our programmes are backed by science and approved by doctors and dietitians across the world.",
    },
    {
      icon: <Customwellness />,
      title: "Personalised Support",
      description:
        "Experience personalised care from dietitians and doctors with constant oversight and one-on-one sessions, ensuring that your road to recovery is smooth and seamless!",
    },
    {
      icon: <Custompatient />,
      title: "Holistic Approach",
      description:
        "Embrace a 360 degree approach with tailored diets, exercise plans, educational resources, yoga classes, and supportive groups that encourage holistic healing.",
    },
    {
      icon: <Custompositive />,
      title: "Convenient and Delicious Meal Delievery",
      description:
        "Relish in our meal plans that are designed to help your body heal, manage hormonal balance and improve gut health. Choose between desi and contemporary cuisine, select meal frequencies that suit you for a convenient delivery right to your doorstep. ",
    },
    {
      icon: <Customcommunity />,
      title: "Supportive Community",
      description:
        "Stay on track with a supportive community that scales the mountain of recovery with you- through group sessions, classes and access to messaging forums where you can share your journey with others!",
    }
  ];

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="w-full bg-[#F0ECE4] bg-cover bg-center bg-no-repeat relative ">
        <div className="absolute max-sm:w-[70px] max-sm:h-[70px] w-[100px] left-[42%] md:left-[48%] -top-5 md:-top-12 transition-transform duration-300 rotate-45">

          <Topdecorative />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-5 pb-20 md:py-20 overflow-hidden">
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left content section */}
            <div className="w-full lg:w-1/2 pt-8 md:pt-10 overflow-hidden">
              <ScrollAnimation>
                <h2 className="text-[var(--text-color-dark)] text-3xl font-['Libre_Baskerville',serif] text-[40px] mb-5 md:mb-9">
                  Why RemDi?
                </h2>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <p className="text-[var(--text-color-dark)] text-[20px]  mb-5 md:mb-8 font-['DM_Sans', 'sans-serif']">
                  RemDi focuses on sustainable health transformation by combining expert-led programmes with practical lifestyle changes. It offers personalized care, holistic wellness strategies, and structured meal plans to support recovery <span className="hidden md:block"></span>and long-term well-being.


                </p>
              </ScrollAnimation>

              <ScrollAnimation delay={0.4}>
                <Link href="/about" >
                  <Button className="bg-[var(--background-color-dark)] font-['DM_Sans','sans-serif'] font-semibold 
                           text-[var(--text-color-plain)] rounded-lg px-4 sm:px-8 py-6 sm:py-7 cursor-pointer
                           w-full sm:w-auto max-w-full sm:min-w-[280px] md:min-w-[320px]
                           text-[18px] sm:text-[18px] md:text-[20px]
                           shadow-lg hover:shadow-xl
                           transform hover:-translate-y-1
                           transition-all duration-300
                           border-2 border-[var(--background-color-dark)]
                           
                           relative overflow-hidden
                           group">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      About Us
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-color-dark)] to-[var(--background-color-dark)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </ScrollAnimation>

              <ScrollAnimation delay={0.6}>
                <div className="relative mt-8 md:mt-12">
                  {/* Shadow Effects - Enhanced for visibility on bottom and right */}
                  

                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden relative z-10 ">
                    <img
                      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Patient receiving physiotherapy treatment"
                      className="w-full h-100 md:w-full md:h-240 object-cover"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right features section */}
            <div className="w-full lg:w-1/2 min-h-fit pb-0 md:pb-10 flex flex-col md:mt-10 justify-start gap-y-6 sm:gap-y-8 px-0 overflow-visible">
              {features.map((feature, index) => (
                <ScrollAnimation key={index} delay={0.2 * (index + 1)}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    isExpanded={expandedIndex === index}
                    onToggle={handleToggle}
                    index={index}
                  />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyFizeo;
