"use client"








import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const Customright = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    
    className="w-120 h-60 absolute left-auto -right-40 text-[#8FC2AB] top-[45%] fill-current -rotate-90 opacity-30"

  >
    <path d="M 289.837 132.633 L 346.008 100.194 L 336.064 82.966 L 278.661 116.116 C 276.455 113.366 274.133 110.711 271.7 108.16 L 319.054 60.793 L 304.991 46.726 L 256.831 94.898 C 254.142 92.865 251.37 90.943 248.523 89.137 L 282.823 29.713 L 265.599 19.766 L 230.903 79.878 C 227.898 78.599 224.844 77.442 221.746 76.409 L 239.785 9.07 L 220.575 3.922 L 202.423 71.68 C 199.256 71.174 196.07 70.792 192.872 70.536 L 192.872 0.274 L 172.984 0.274 L 172.984 70.536 C 169.786 70.792 166.6 71.174 163.432 71.68 L 145.281 3.922 L 126.071 9.07 L 144.109 76.409 C 141.012 77.442 137.957 78.599 134.953 79.878 L 100.256 19.766 L 83.032 29.713 L 117.333 89.137 C 114.486 90.943 111.714 92.865 109.025 94.898 L 60.865 46.726 L 46.802 60.793 L 94.156 108.16 C 91.723 110.711 89.4 113.366 87.194 116.116 L 29.792 82.966 L 19.848 100.194 L 76.019 132.633 C 74.191 135.873 72.513 139.195 70.988 142.588 L 9.155 126.015 L 4.008 145.231 L 64.328 161.397 C 63.322 165.203 62.501 169.055 61.868 172.94 L 0.36 172.94 L 0.36 192.834 L 365.495 192.834 L 365.495 172.94 L 303.988 172.94 C 303.355 169.055 302.534 165.203 301.529 161.397 L 361.848 145.231 L 356.701 126.015 L 294.868 142.588 C 293.343 139.195 291.664 135.873 289.837 132.633 Z"></path>
  </svg>
);


const Custommsg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-7 h-7 text-white fill-current"
  >
    <path d="M 224 48 H 32 a 8 8 0 0 0 -8 8 V 192 a 16 16 0 0 0 16 16 H 216 a 16 16 0 0 0 16 -16 V 56 A 8 8 0 0 0 224 48 Z m -96 85.15 L 52.57 64 H 203.43 Z M 98.71 128 L 40 181.81 V 74.19 Z m 11.84 10.85 l 12 11.05 a 8 8 0 0 0 10.82 0 l 12 -11.05 l 58 53.15 H 52.57 Z M 157.29 128 L 216 74.18 V 181.82 Z"></path>
  </svg>
);


const Custinsta = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[var(--text-color-dark)] fill-current"
  >
    <path d="M 128 80 a 48 48 0 1 0 48 48 A 48.05 48.05 0 0 0 128 80 Z m 0 80 a 32 32 0 1 1 32 -32 A 32 32 0 0 1 128 160 Z M 176 24 H 80 A 56.06 56.06 0 0 0 24 80 v 96 a 56.06 56.06 0 0 0 56 56 h 96 a 56.06 56.06 0 0 0 56 -56 V 80 A 56.06 56.06 0 0 0 176 24 Z m 40 152 a 40 40 0 0 1 -40 40 H 80 a 40 40 0 0 1 -40 -40 V 80 A 40 40 0 0 1 80 40 h 96 a 40 40 0 0 1 40 40 Z M 192 76 a 12 12 0 1 1 -12 -12 A 12 12 0 0 1 192 76 Z"></path>
  </svg>
);

const Custfacebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[var(--text-color-dark)] fill-current"
  >
    <path d="M 128 24 A 104 104 0 1 0 232 128 A 104.11 104.11 0 0 0 128 24 Z m 8 191.63 V 152 h 24 a 8 8 0 0 0 0 -16 H 136 V 112 a 16 16 0 0 1 16 -16 h 16 a 8 8 0 0 0 0 -16 H 152 a 32 32 0 0 0 -32 32 v 24 H 96 a 8 8 0 0 0 0 16 h 24 v 63.63 a 88 88 0 1 1 16 0 Z"></path>
  </svg>

);

const Custpintrest = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[var(--text-color-dark)] fill-current"
  >
    <path d="M 216 112 c 0 22.57 -7.9 43.2 -22.23 58.11 C 180.39 184 162.25 192 144 192 c -17.88 0 -29.82 -5.86 -37.43 -12 L 95.79 225.83 A 8 8 0 0 1 88 232 a 8.24 8.24 0 0 1 -1.84 -0.21 a 8 8 0 0 1 -6 -9.62 l 32 -136 a 8 8 0 0 1 15.58 3.66 l -16.9 71.8 C 114 166 123.3 176 144 176 c 27.53 0 56 -23.94 56 -64 A 72 72 0 1 0 65.63 148 a 8 8 0 0 1 -13.85 8 A 88 88 0 1 1 216 112 Z"></path>
  </svg>
);

const Custyoutube = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[var(--text-color-dark)] fill-current"
  >
    <path d="M 164.44 121.34 l -48 -32 A 8 8 0 0 0 104 96 v 64 a 8 8 0 0 0 12.44 6.66 l 48 -32 a 8 8 0 0 0 0 -13.32 Z M 120 145.05 V 111 l 25.58 17 Z M 234.33 69.52 a 24 24 0 0 0 -14.49 -16.4 C 185.56 39.88 131 40 128 40 s -57.56 -0.12 -91.84 13.12 a 24 24 0 0 0 -14.49 16.4 C 19.08 79.5 16 97.74 16 128 s 3.08 48.5 5.67 58.48 a 24 24 0 0 0 14.49 16.41 C 69 215.56 120.4 216 127.34 216 h 1.32 c 6.94 0 58.37 -0.44 91.18 -13.11 a 24 24 0 0 0 14.49 -16.41 c 2.59 -10 5.67 -28.22 5.67 -58.48 S 236.92 79.5 234.33 69.52 Z m -15.49 113 a 8 8 0 0 1 -4.77 5.49 c -31.65 12.22 -85.48 12 -86 12 H 128 c -0.54 0 -54.33 0.2 -86 -12 a 8 8 0 0 1 -4.77 -5.49 C 34.8 173.39 32 156.57 32 128 s 2.8 -45.39 5.16 -54.47 A 8 8 0 0 1 41.93 68 c 30.52 -11.79 81.66 -12 85.85 -12 h 0.27 c 0.54 0 54.38 -0.18 86 12 a 8 8 0 0 1 4.77 5.49 C 221.2 82.61 224 99.43 224 128 S 221.2 173.39 218.84 182.47 Z"></path>
  </svg>
);

const Custtwit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className="w-10 h-10 text-[var(--text-color-dark)] fill-current"
  >
    <path d="M 205.66 194.34 a 8 8 0 0 1 -11.32 11.32 L 128 139.31 L 61.66 205.66 a 8 8 0 0 1 -11.32 -11.32 L 116.69 128 L 50.34 61.66 A 8 8 0 0 1 61.66 50.34 L 128 116.69 l 66.34 -66.35 a 8 8 0 0 1 11.32 11.32 L 139.31 128 Z"></path>
  </svg>
);





const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const services = [
    { id: 'rembliss', name: 'RemBliss - PCOS & Menopause Program' },
    { id: 'remprotein', name: 'RemProtein - Protein Optimization Program' },
    { id: 'remfit', name: 'RemFit - Weight Loss Education Program' },
    { id: 'rembalance', name: 'RemBalance - Gut Health Program' },
    { id: 'remmeta', name: 'RemMeta - Metabolic Health Program' },
    { id: 'remdi2', name: 'RemDi2 - Diabetes Management Program' }
  ].reverse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Initial message - Form sent
    setSubmitStatus({
      success: true,
      message: 'Message sent! Processing your request...'
    });
    
    try {
      // Show processing message after a delay
      setTimeout(() => {
        if (isSubmitting) {
          setSubmitStatus({
            success: true,
            message: 'Processing on server... This may take a moment.'
          });
        }
      }, 2000);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Final success message
        setSubmitStatus({
          success: true,
          message: data.message || 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || 'Failed to submit the form. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
  
  
  <div className="w-full bg-[var(--background-color-plain1)] py-16 sm:py-20 md:py-30 md:py-50 ">

    
      <div className="max-w-7xl mx-auto px-4 md:px-8 z=10">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
          {/* Left column with text and contact info */}
          <div className="space-y-12">
            {/* Heading and intro text */}
            <div className="space-y-6 pt-15 md:pt-0">
              <h2 className="text-[26px] md:text-[40px] font-['Libre_Baskerville',serif] text-[var(--text-color-dark)]">Ready to Take Control of Your Health? </h2>
              <p className="text-[20px] font-['DM_Sans', 'sans-serif'] text-[var(--text-color-dark)] leading-relaxed">
              At RemDi, we're here to support you on <span className="hidden md:block"></span> your journey to a healthier you. Contact <span className="hidden md:block"></span>us today to discuss your health goals and learn <span className="hidden md:block"></span>how our programs can help you achieve them. 
              </p>

              
            </div>

            {/* Separator line */}
            <div className=" w-[100%] md:w-115 h-px bg-gray-200"></div>

            {/* Contact information */}
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[var(--background-color-dark)] flex items-center justify-center">
                  <Custommsg />
                </div>
                <div>
                  <h3 className="text-[var(--text-color-dark)] text-[24px] font-['Libre_Baskerville',serif]">Email us</h3>
                  <a href="mailto:info@fizeo.com" className="text-[var(--text-color-dark)] text-[20px] font-['DM_Sans', 'sans-serif']">
                  Support@remdi.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[var(--background-color-dark)] flex items-center justify-center">
                  <Phone className='text-[var(--text-color-plain)]' />
                </div>
                <div>
                  <h3 className="text-[var(--text-color-dark)] text-[24px]  font-['Libre_Baskerville',serif]">Phone us</h3>
                  <span className="text-[var(--text-color-dark)] text-[20px] font-['DM_Sans', 'sans-serif']">00917207646868</span>
                </div>
              </div>

              {/* <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[var(--background-color-dark)] flex items-center justify-center">
                  <MapPin  className='text-[var(--text-color-plain)]'/>
                </div>
                <div>
                  <h3 className="text-[var(--text-color-dark)] text-[24px]  font-['Libre_Baskerville',serif]">Find us</h3>
                  <span className="text-[var(--text-color-dark)] text-[20px] font-['DM_Sans', 'sans-serif']">123 Main Street, Banglore</span>
                </div>
              </div> */}
            </div>

            {/* Social media icons */}
            <div className="flex gap-6 pt-6 text-[var(--text-color-dark)]">
              <a href="#" className="w-10 h-10  flex items-center justify-center">
                <Custinsta />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center ">
                <Custfacebook />
              </a>
              <a href="#" className="w-10 h-10  flex items-center justify-center  ">
                <Custpintrest />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center ">
                <Custyoutube />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center ">
                <Custtwit />
              </a>
            </div>

            {/* <span className="text-[var(--text-color-dark)] text-[30px] font-['DM_Sans', 'sans-serif']">We look forward to hearing from you!</span> */}
          </div>
          


          {/* Right column with form */}
          <div className="border border-[#ebe5da] bg-[var(--background-color-plain)] px-6 sm:px-10 md:px-16 py-8 sm:py-12 md:py-35 rounded-2xl relative mr-2 md:-ml-8">
            <p className="text-[var(--text-color-dark)] text-[18px] md:text-[20px] font-['DM_Sans', 'sans-serif'] mb-6">We look forward to hearing from you!</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)] ">
                    First Name*
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white border border-transparent thin-focus text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)]">
                    Last Name*
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white border-transparent thin-focus text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)]">
                    Email*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-transparent thin-focus text-black"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)]">
                    Service*
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={handleServiceChange}
                    required
                  >
                    <SelectTrigger className="bg-white border border-gray-300 text-black hover:bg-gray-50">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 text-black">
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id} className="hover:bg-gray-100 cursor-pointer text-black">
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="font-['DM_Sans', 'sans-serif'] text-[16px] text-[var(--text-color-dark)]">
                    Message*
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-white border-transparent thin-focus text-black min-h-[100px]"
                  />
                </div>
              </div>

              {submitStatus && (
                <div className={`p-3 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--background-color-light)] text-[var(--text-color-dark)] font-bold py-3 text-base 
                hover:bg-[var(--background-color-dark)] hover:text-white transition-colors duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>

   
  );
};

export default ContactForm;

