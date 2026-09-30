import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

const TherapeuticExcellence = () => {
  return (
    <div className="w-full pt-5 pb-2 md:pt-10 md:pb-5 bg-[var(--background-color-plain2)] bg-cover bg-center bg-no-repeat relative">

      <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col items-center text-center relative">
        {/* Positioned SVG */}
        <div className="relative md:absolute top-2 left-2 md:top-[8%] md:left-[10%] hidden sm:block lg:block md:hidden">
          <svg
            viewBox="0 0 59 59"
            className="w-24 h-24 scale-75 md:w-32 md:h-32 md:scale-100 rotate-180"
          >
            <path
              d="M 44.177 0 L 0.147 0 L 0.147 44.25 L 14.823 59 L 14.823 14.75 L 58.853 14.75 Z M 58.853 48.695 L 58.853 29.5 L 39.754 29.5 Z M 29.5 59 L 48.351 59 L 29.5 40.055 Z"
              fill="rgb(166, 198, 178)"
            />
          </svg>
        </div>


        <ScrollAnimation>

          <h2 className="text-[var(--text-color-dark)] text-[26px] md:text-[40px]   max-w-2xl mb-[5%] mt-[4%] md:mt-[10%]  font-['Libre_Baskerville',serif]">
          Say good-bye to health conditions that hold you back!  
          </h2>
          </ScrollAnimation>
          
     

        


        {/* <ScrollAnimation delay={0.2}>
          <p className="text-[#024027] text-lg sm:text-[20px]  font-['DM_Sans', 'sans-serif'] max-w-4xl mx-auto mb-12 leading-relaxed">
          Take the first step towards a healthier and happier you. Our free <span className="hidden md:block"></span>  consultation allows you to discuss your health goals with our program <span className="hidden md:block"></span>  advisors and learn more about how RemDi can help you achieve them. 
            
            
          </p>
        </ScrollAnimation> */}



        {/* <ScrollAnimation delay={0.2}>
          <p className="text-[#024027] text-lg sm:text-[20px]  font-['DM_Sans', 'sans-serif'] max-w-4xl mx-auto mb-12 leading-relaxed">
            At RemDi, we offer a diverse range of services meticulously designed
            to
            <span className="hidden md:block"></span> cater to your unique
            needs. Whether you're recovering from an injury,{" "}
            <span className="hidden md:block"></span> seeking relief from pain,
            or aiming to optimize your physical well-being,{" "}
            
            
          </p>
        </ScrollAnimation> */}


        {/* <ScrollAnimation>



        <Link href="/health-assessment">
          <Button className="bg-[var(--background-color-light)]  hover:opacity-80 font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)]  !font-bold rounded-md px-6 py-6 cursor-pointer">
          FIND THE RIGHT PROGRAMME
          </Button>
        </Link>

        </ScrollAnimation> */}

      
      </div>
    </div>
  );
};

export default TherapeuticExcellence;
