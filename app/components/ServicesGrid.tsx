"use client"




import React from "react";

import { useRouter } from 'next/navigation';

import ScrollAnimation from "./ScrollAnimation"

import { Button } from "../components/ui/button";
import Link from "next/link";




// Custom Home Icon using Tailwind CSS
const RemDia = () => (

  
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.15 15.18L9.72999 13.77L11.15 12.35L12.56 13.77L13.97 12.35L12.56 10.94L13.97 9.53L15.39 10.94L16.8 9.53L13.97 6.7L6.89999 13.77L9.72999 16.6L11.15 15.18ZM3.07999 19L6.19999 15.89L4.07999 13.77L13.97 3.87L16.1 6L17.5 4.58L16.1 3.16L17.5 1.75L21.75 6L20.34 7.4L18.92 6L17.5 7.4L19.63 9.53L9.72999 19.42L7.60999 17.3L3.07999 21.84V19Z" fill="black"/>
  </svg>

);

const Rembliss = () => (
  <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.49999 11.5V14.75C6.49886 14.8488 6.51748 14.9468 6.55477 15.0383C6.59207 15.1299 6.64727 15.213 6.71714 15.2829C6.78701 15.3527 6.87014 15.4079 6.96164 15.4452C7.05315 15.4825 7.15118 15.5011 7.24999 15.5C7.34879 15.5011 7.44683 15.4825 7.53833 15.4452C7.62984 15.4079 7.71297 15.3527 7.78284 15.2829C7.85271 15.213 7.90791 15.1299 7.9452 15.0383C7.98249 14.9468 8.00112 14.8488 7.99999 14.75" stroke="black" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M7.99999 11.5V14.75C7.99886 14.8488 8.01748 14.9468 8.05477 15.0383C8.09207 15.1299 8.14727 15.213 8.21714 15.2829C8.28701 15.3527 8.37014 15.4079 8.46164 15.4452C8.55315 15.4825 8.65118 15.5011 8.74999 15.5C8.84879 15.5011 8.94683 15.4825 9.03833 15.4452C9.12984 15.4079 9.21297 15.3527 9.28284 15.2829C9.35271 15.213 9.40791 15.1299 9.4452 15.0383C9.48249 14.9468 9.50112 14.8488 9.49999 14.75V11.5M5.71874 8.5625C5.69171 8.65756 5.64596 8.74625 5.58417 8.82338C5.52238 8.9005 5.44579 8.96449 5.35892 9.0116C5.27205 9.05871 5.17663 9.08797 5.07829 9.09768C4.97994 9.10739 4.88065 9.09734 4.78624 9.06812C4.69119 9.0411 4.6025 8.99535 4.52539 8.93355C4.44827 8.87176 4.3843 8.79517 4.33722 8.70828C4.29014 8.6214 4.2609 8.52598 4.25124 8.42764C4.24157 8.3293 4.25166 8.23001 4.28093 8.13563L5.06218 5.50188C5.14832 5.21234 5.32571 4.95838 5.56791 4.77784C5.81011 4.5973 6.10416 4.49985 6.40624 4.5H9.59374C9.89585 4.49996 10.1899 4.59753 10.432 4.77818C10.6742 4.95884 10.8515 5.2129 10.9375 5.5025L11.7187 8.13625C11.748 8.23064 11.7581 8.32992 11.7484 8.42826C11.7388 8.52661 11.7095 8.62203 11.6624 8.70891C11.6154 8.79579 11.5514 8.87238 11.4743 8.93418C11.3972 8.99597 11.3085 9.04173 11.2134 9.06875C11.1191 9.09766 11.0199 9.10746 10.9218 9.09757C10.8236 9.08768 10.7284 9.05831 10.6417 9.01116C10.5551 8.96401 10.4787 8.90005 10.4171 8.82301C10.3554 8.74597 10.3098 8.6574 10.2828 8.5625" stroke="black" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M8 3C8.69036 3 9.25 2.44036 9.25 1.75C9.25 1.05964 8.69036 0.5 8 0.5C7.30964 0.5 6.75 1.05964 6.75 1.75C6.75 2.44036 7.30964 3 8 3Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M6.5 6L5 11H11L9.5 6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

);

const Remmeta = () => (
  <svg width="30" height="30" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 10H16.199C15.369 10 14.954 10 14.61 10.195C14.266 10.389 14.053 10.745 13.626 11.456L13.596 11.508C13.198 12.171 12.999 12.502 12.71 12.497C12.421 12.492 12.234 12.153 11.861 11.475L10.174 8.408C9.827 7.776 9.654 7.46 9.376 7.445C9.099 7.43 8.892 7.725 8.479 8.315L8.196 8.72C7.756 9.347 7.537 9.66 7.212 9.83C6.886 10 6.503 10 5.738 10H5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11 3.5L10.45 4.01C10.5202 4.08573 10.6053 4.14614 10.6999 4.18746C10.7946 4.22877 10.8967 4.2501 11 4.2501C11.1033 4.2501 11.2054 4.22877 11.3001 4.18746C11.3947 4.14614 11.4798 4.08573 11.55 4.01L11 3.5ZM8.436 16.79C6.986 15.607 5.293 14.058 3.969 12.361C2.63 10.646 1.75 8.883 1.75 7.261H0.25C0.25 9.387 1.38 11.481 2.786 13.284C4.207 15.104 5.996 16.736 7.488 17.953L8.436 16.79ZM1.75 7.261C1.75 4.531 3.008 2.705 4.6 2.042C6.173 1.388 8.353 1.755 10.45 4.01L11.55 2.988C9.147 0.407 6.327 -0.301 4.024 0.657001C1.742 1.607 0.25 4.08 0.25 7.261H1.75ZM14.512 17.953C16.005 16.736 17.792 15.104 19.214 13.282C20.621 11.479 21.75 9.386 21.75 7.26H20.25C20.25 8.882 19.37 10.645 18.031 12.36C16.707 14.057 15.014 15.607 13.564 16.79L14.512 17.953ZM21.75 7.26C21.75 4.08 20.258 1.606 17.976 0.657001C15.673 -0.301 12.853 0.407001 10.451 2.987L11.549 4.01C13.647 1.755 15.827 1.388 17.399 2.042C18.992 2.704 20.25 4.53 20.25 7.26H21.75ZM7.488 17.953C8.758 18.989 9.64 19.75 11 19.75V18.25C10.278 18.25 9.829 17.925 8.436 16.79L7.488 17.953ZM13.564 16.789C12.171 17.926 11.722 18.25 11 18.25V19.75C12.359 19.75 13.241 18.989 14.512 17.953L13.564 16.789Z" fill="black"/>
  </svg>
);

const Remfit = () => (
  <svg width="30" height="30" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 5C14.2083 5 14.4036 5.03906 14.5859 5.11719C14.7682 5.19531 14.9271 5.30208 15.0625 5.4375C15.1979 5.57292 15.3047 5.73177 15.3828 5.91406C15.4609 6.09635 15.5 6.29167 15.5 6.5C15.5 6.70833 15.4609 6.90365 15.3828 7.08594C15.3047 7.26823 15.1979 7.42708 15.0625 7.5625C14.9271 7.69792 14.7682 7.80469 14.5859 7.88281C14.4036 7.96094 14.2083 8 14 8H11.5C11.3646 8 11.2474 7.95052 11.1484 7.85156L10 6.71094L9.20312 7.5L10.8516 9.14844C10.9505 9.2474 11 9.36458 11 9.5V12.5C11 12.7083 10.9609 12.9036 10.8828 13.0859C10.8047 13.2682 10.6979 13.4271 10.5625 13.5625C10.4271 13.6979 10.2682 13.8047 10.0859 13.8828C9.90365 13.9609 9.70833 14 9.5 14C9.29167 14 9.09635 13.9609 8.91406 13.8828C8.73177 13.8047 8.57292 13.6979 8.4375 13.5625C8.30208 13.4271 8.19531 13.2682 8.11719 13.0859C8.03906 12.9036 8 12.7083 8 12.5V10.7109L7 9.71094L5.85156 10.8516C5.7526 10.9505 5.63542 11 5.5 11H2C1.79167 11 1.59635 10.9609 1.41406 10.8828C1.23177 10.8047 1.07292 10.6979 0.9375 10.5625C0.802083 10.4271 0.695312 10.2682 0.617188 10.0859C0.539062 9.90365 0.5 9.70833 0.5 9.5C0.5 9.29167 0.539062 9.09635 0.617188 8.91406C0.695312 8.73177 0.802083 8.57292 0.9375 8.4375C1.07292 8.30208 1.23177 8.19531 1.41406 8.11719C1.59635 8.03906 1.79167 8 2 8H4.28906L4.91406 7.38281C4.63802 7.26302 4.41667 7.07812 4.25 6.82812C4.08333 6.57812 4 6.30208 4 6V3C4 2.85938 4.02604 2.72917 4.07812 2.60938C4.13021 2.48958 4.20052 2.38542 4.28906 2.29688C4.3776 2.20833 4.48438 2.13542 4.60938 2.07812C4.73438 2.02083 4.86458 1.99479 5 2H9C9 1.72396 9.05208 1.46615 9.15625 1.22656C9.26042 0.986979 9.40365 0.773438 9.58594 0.585938C9.76823 0.398438 9.97917 0.255208 10.2188 0.15625C10.4583 0.0572917 10.7188 0.00520833 11 0C11.276 0 11.5339 0.0520833 11.7734 0.15625C12.013 0.260417 12.2266 0.403646 12.4141 0.585938C12.6016 0.768229 12.7448 0.979167 12.8438 1.21875C12.9427 1.45833 12.9948 1.71875 13 2C13 2.21875 12.9661 2.42708 12.8984 2.625C12.8307 2.82292 12.737 3.00781 12.6172 3.17969C12.4974 3.35156 12.3516 3.4974 12.1797 3.61719C12.0078 3.73698 11.8177 3.83333 11.6094 3.90625L12.7109 5H14ZM11 1C10.8594 1 10.7292 1.02604 10.6094 1.07812C10.4896 1.13021 10.3854 1.20052 10.2969 1.28906C10.2083 1.3776 10.1354 1.48438 10.0781 1.60938C10.0208 1.73438 9.99479 1.86458 10 2C10 2.14062 10.026 2.27083 10.0781 2.39062C10.1302 2.51042 10.2005 2.61458 10.2891 2.70312C10.3776 2.79167 10.4844 2.86458 10.6094 2.92188C10.7344 2.97917 10.8646 3.00521 11 3C11.125 3 11.2474 2.97656 11.3672 2.92969C11.487 2.88281 11.5938 2.8151 11.6875 2.72656C11.7812 2.63802 11.8568 2.53906 11.9141 2.42969C11.9714 2.32031 12 2.19792 12 2.0625C12 1.91667 11.9766 1.77865 11.9297 1.64844C11.8828 1.51823 11.8177 1.40625 11.7344 1.3125C11.651 1.21875 11.5443 1.14323 11.4141 1.08594C11.2839 1.02865 11.1458 1 11 1ZM14 7C14.1354 7 14.2526 6.95052 14.3516 6.85156C14.4505 6.7526 14.5 6.63542 14.5 6.5C14.5 6.33333 14.4531 6.21354 14.3594 6.14062C14.2656 6.06771 14.1458 6.02083 14 6C13.8542 5.97917 13.6901 5.97396 13.5078 5.98438C13.3255 5.99479 13.1484 6.00521 12.9766 6.01562C12.8047 6.02604 12.6458 6.02344 12.5 6.00781C12.3542 5.99219 12.237 5.9401 12.1484 5.85156L9.28906 3H5V6C5 6.13542 5.04948 6.2526 5.14844 6.35156C5.2474 6.45052 5.36458 6.5 5.5 6.5C5.69271 6.5 5.82292 6.4401 5.89062 6.32031C5.95833 6.20052 6 6.04427 6.01562 5.85156C6.03125 5.65885 6.02604 5.45833 6 5.25C5.97396 5.04167 5.96875 4.84115 5.98438 4.64844C6 4.45573 6.03906 4.30208 6.10156 4.1875C6.16406 4.07292 6.29688 4.01042 6.5 4H8C8.13542 4 8.2526 4.04948 8.35156 4.14844C8.45052 4.2474 8.5 4.36458 8.5 4.5C8.5 4.63542 8.45052 4.7526 8.35156 4.85156C8.2526 4.95052 8.13542 5 8 5H7V6.5C7 6.63542 6.95052 6.7526 6.85156 6.85156L4.85156 8.85156C4.7526 8.95052 4.63542 9 4.5 9H2C1.86458 9 1.7474 9.04948 1.64844 9.14844C1.54948 9.2474 1.5 9.36458 1.5 9.5C1.5 9.63542 1.54948 9.7526 1.64844 9.85156C1.7474 9.95052 1.86458 10 2 10H5.28906L6.64844 8.64844C6.7474 8.54948 6.86458 8.5 7 8.5C7.13542 8.5 7.2526 8.54948 7.35156 8.64844L8.85156 10.1484C8.95052 10.2474 9 10.3646 9 10.5V12.5C9 12.6354 9.04948 12.7526 9.14844 12.8516C9.2474 12.9505 9.36458 13 9.5 13C9.63542 13 9.7526 12.9505 9.85156 12.8516C9.95052 12.7526 10 12.6354 10 12.5V9.71094L8.14844 7.85156C8.04948 7.7526 8 7.63542 8 7.5C8 7.36458 8.04948 7.2474 8.14844 7.14844L9.64844 5.64844C9.7474 5.54948 9.86458 5.5 10 5.5C10.1354 5.5 10.2526 5.54948 10.3516 5.64844L11.7109 7H14Z" fill="black"/>
    </svg>

);

const RemBalance = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20ZM16 11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11ZM16 7H8C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9H16C16.2652 9 16.5196 8.89464 16.7071 8.70711C16.8946 8.51957 17 8.26522 17 8C17 7.73478 16.8946 7.48043 16.7071 7.29289C16.5196 7.10536 16.2652 7 16 7ZM16 15H8C7.73478 15 7.48043 15.1054 7.29289 15.2929C7.10536 15.4804 7 15.7348 7 16C7 16.2652 7.10536 16.5196 7.29289 16.7071C7.48043 16.8946 7.73478 17 8 17H16C16.2652 17 16.5196 16.8946 16.7071 16.7071C16.8946 16.5196 17 16.2652 17 16C17 15.7348 16.8946 15.4804 16.7071 15.2929C16.5196 15.1054 16.2652 15 16 15Z" fill="black"/>
  </svg>
);

const RemProtein = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.76 3.76C13.07 3.45 13.07 2.95 12.76 2.64C12.45 2.33 11.95 2.33 11.64 2.64L7.85 6.43L6.44 5.02C6.13 4.71 5.63 4.71 5.32 5.02C5.01 5.33 5.01 5.83 5.32 6.14L7.44 8.26C7.59 8.41 7.8 8.5 8 8.5C8.2 8.5 8.41 8.41 8.56 8.26L12.76 3.76ZM14.05 8.5H22C22.5523 8.5 23 8.94772 23 9.5C23 10.0523 22.5523 10.5 22 10.5H14.05C13.4977 10.5 13.05 10.0523 13.05 9.5C13.05 8.94772 13.4977 8.5 14.05 8.5ZM2 9.5C2 8.94772 2.44772 8.5 3 8.5H8C8.55228 8.5 9 8.94772 9 9.5C9 10.0523 8.55228 10.5 8 10.5H3C2.44772 10.5 2 10.0523 2 9.5ZM12.76 11.76C13.07 11.45 13.07 10.95 12.76 10.64C12.45 10.33 11.95 10.33 11.64 10.64L7.85 14.43L6.44 13.02C6.13 12.71 5.63 12.71 5.32 13.02C5.01 13.33 5.01 13.83 5.32 14.14L7.44 16.26C7.59 16.41 7.8 16.5 8 16.5C8.2 16.5 8.41 16.41 8.56 16.26L12.76 11.76ZM14.05 16.5H22C22.5523 16.5 23 16.9477 23 17.5C23 18.0523 22.5523 18.5 22 18.5H14.05C13.4977 18.5 13.05 18.0523 13.05 17.5C13.05 16.9477 13.4977 16.5 14.05 16.5ZM2 17.5C2 16.9477 2.44772 16.5 3 16.5H8C8.55228 16.5 9 16.9477 9 17.5C9 18.0523 8.55228 18.5 8 18.5H3C2.44772 18.5 2 18.0523 2 17.5Z" fill="black"/>
    </svg>
);

const Customwellness = () => (
  <div style={{ display: "contents" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-6 h-6 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M 201.54 54.46 A 104 104 0 0 0 54.46 201.54 A 104 104 0 0 0 201.54 54.46 Z M 96 210 V 152 h 64 v 58 a 88.33 88.33 0 0 1 -64 0 Z m 48 -74 H 112 V 100.94 l 32 -16 Z m 46.22 54.22 A 88.09 88.09 0 0 1 176 201.77 V 152 a 16 16 0 0 0 -16 -16 V 72 a 8 8 0 0 0 -11.58 -7.16 l -48 24 A 8 8 0 0 0 96 96 v 40 a 16 16 0 0 0 -16 16 v 49.77 a 88 88 0 1 1 110.22 -11.55 Z"></path>
      </g>
    </svg>
  </div>
);

const Customworkplace = () => (
  <div style={{ display: "contents" }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="w-6 h-6 text-[#043A22] fill-current"
    >
      <g color="rgb(28, 51, 50)">
        <path d="M 112 152 a 8 8 0 0 0 -8 8 v 28.69 L 75.72 160.4 A 39.71 39.71 0 0 1 64 132.12 V 95 a 32 32 0 1 0 -16 0 v 37.13 a 55.67 55.67 0 0 0 16.4 39.6 L 92.69 200 H 64 a 8 8 0 0 0 0 16 h 48 a 8 8 0 0 0 8 -8 V 160 A 8 8 0 0 0 112 152 Z M 40 64 A 16 16 0 1 1 56 80 A 16 16 0 0 1 40 64 Z m 168 97 V 123.88 a 55.67 55.67 0 0 0 -16.4 -39.6 L 163.31 56 H 192 a 8 8 0 0 0 0 -16 H 144 a 8 8 0 0 0 -8 8 V 96 a 8 8 0 0 0 16 0 V 67.31 L 180.28 95.6 A 39.71 39.71 0 0 1 192 123.88 V 161 a 32 32 0 1 0 16 0 Z m -8 47 a 16 16 0 1 1 16 -16 A 16 16 0 0 1 200 208 Z"></path>
      </g>
    </svg>
  </div>
);

const ServiceCard = ({ icon, title, description, onClick }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  onClick: () => void; 
}) => {
  // Get the background image based on the title
  const getBackgroundImage = (title: string) => {
    switch(title) {
      case "RemDia":
        return "https://images.unsplash.com/photo-1628619876503-2db74e724757?q=80&w=3010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Rem Bliss":
        return "https://images.unsplash.com/photo-1728562870259-8136fa21cc72?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGluZGlhbiUyMGZlbWFsZSUyMGdyb3VwfGVufDB8fDB8fHww";
      case "Rem Meta":
        return "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Rem Fit":
        return "https://images.unsplash.com/photo-1659352789776-5aa7027b4bc8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Rem Balance":
        return "https://images.unsplash.com/photo-1742281258189-3b933879867a?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "Rem Protein":
        return "https://plus.unsplash.com/premium_photo-1673581152308-591c1645be02?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      default:
        return "https://images.unsplash.com/photo-1628619876503-2db74e724757?q=80&w=3010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
  };

  // Clone and modify the icon with proper typing
  const modifiedIcon = React.isValidElement(icon) 
    ? React.cloneElement(icon as React.ReactElement<{ width?: number; height?: number }>, {
        width: 32,
        height: 32
      })
    : icon;

  return (
    <div
      className="relative w-full h-full flex flex-col md:flex-row
                 border border-[#EBE5DA] bg-[var(--background-color-plain)] rounded-[20px] overflow-hidden 
                 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out group md:h-[350px]"
    >
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--text-color-dark)]/20 rounded-tl-[20px] z-20" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[var(--text-color-dark)]/20 rounded-tr-[20px] z-20" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[var(--text-color-dark)]/20 rounded-bl-[20px] z-20" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--text-color-dark)]/20 rounded-br-[20px] z-20" />

      {/* Background Image Container - Returning to original height but ensuring proper display */}
      <div className="relative w-full md:w-1/2 h-[180px] sm:h-[180px] md:h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
        <img 
          src={getBackgroundImage(title)}
          alt={title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ objectPosition: 'center' }}
        />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] mix-blend-overlay" />
      </div>

      {/* Content Container - Returning to original height and padding */}
      <div className="relative w-full md:w-1/2 p-4 sm:p-4 md:p-8 lg:p-10 flex flex-col gap-3 md:gap-5 lg:gap-6">
        {/* Icon and Title */}
        <div className="flex items-center gap-3 md:gap-4 text-[var(--text-color-dark)]">
          <div className="transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            {modifiedIcon}
    </div>
          <h3 className="text-[22px] sm:text-[22px] md:text-[24px] lg:text-[27px] text-[var(--text-color-dark)] font-['Libre_Baskerville',serif] relative min-h-[45px] flex items-center whitespace-normal">
            {title}
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--text-color-dark)] group-hover:w-full transition-all duration-500"></span>
          </h3>
        </div>
        
        {/* Main content - Returning to original spacing */}
        <p className="text-[var(--text-color-dark)] font-['DM_Sans', 'sans-serif'] text-[16px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-relaxed mb-4 md:mb-6 lg:mb-8 relative">
          {description}
          <span className="absolute -bottom-2 md:-bottom-3 left-0 w-12 md:w-14 lg:w-16 h-[1px] bg-[var(--text-color-dark)]/20"></span>
        </p>

        {/* Explore more link - with bouncing animation */}
        <div className="mt-auto flex justify-center md:justify-start">
          <div 
            onClick={onClick}
            className="group relative flex items-center gap-2 text-[var(--text-color-dark)]/80 hover:text-[var(--text-color-dark)] 
                     transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Content wrapper with animation */}
            <div className="relative z-10 flex items-center gap-2 animate-[bounce_2s_ease-in-out_infinite]">
              <span className="text-[15px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-medium tracking-wide relative inline-block font-['DM_Sans', 'sans-serif']">
                Explore more
                {/* Underline for both mobile and desktop */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--text-color-dark)]/50"></span>
              </span>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover animation effects */}
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
           style={{
             boxShadow: "0 0 40px rgba(235, 229, 218, 0.3) inset",
           }}>
      </div>
      
      {/* Subtle gradient border on hover */}
      <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{
             background: "linear-gradient(45deg, rgba(235, 229, 218, 0.1), rgba(235, 229, 218, 0.3))",
           }}>
      </div>
    </div>
  );
};

const ServicesGrid = () => {
  const router = useRouter();
  
  const services = [
    {
      icon: <span className="text-3xl md:text-5xl">💉</span>,
      title: "RemDia",
      description: "Type 2 and Pre Diabetes Reversal Programme.",
      path: "/programs/remdia",
    },
    {
      icon: <span className="text-3xl md:text-5xl">🌺</span>,
      title: "Rem Bliss",
      description: "Women's Health Programme tackling PCOS/PCOD and Menopause.",
      path: "/programs/rembliss",
    },
    {
      icon: <span className="text-3xl md:text-5xl">🫀</span>,
      title: "Rem Meta",
      description: "Tackling Metabolic issues such as High Blood Pressure, Cardiac Risk, Fatty Liver and more.",
      path: "/programs/remmeta",
    },
    {
      icon: <span className="text-3xl md:text-5xl">🏃</span>,
      title: "Rem Fit",
      description: "To achieve intense weight loss @4-5kg/month.",
      path: "/programs/remfit",
    },
    {
      icon: <span className="text-3xl md:text-5xl">⚖️</span>,
      title: "Rem Balance",
      description: "Maintain consistent weight through balanced meals and lifestyle.",
      path: "/programs/rembalance",
    },
    {
      icon: <span className="text-3xl md:text-5xl">💪</span>,
      title: "Rem Protein",
      description: "Optimize protein intake for better health, energy, and overall vitality.",
      path: "/programs/remprotein",
    },
  ];
  
  
  

  return (
    <div className="w-full bg-[var(--background-color-plain2)] cursor-pointer bg-cover bg-center bg-no-repeat py-16 pt-3 md:pt-0 md:pb-16 px-3 sm:px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 justify-items-center">
        {services.map((service, index) => (
          <div key={index} className="w-full max-w-[425px] sm:max-w-[425px] md:max-w-[520px] lg:max-w-[620px]">
          <ServiceCard
            icon={service.icon}
            title={service.title}
            description={service.description}
              onClick={() => router.push(service.path)}
          />
          </div>
        ))}
      </div>
  
      <ScrollAnimation>
        <div className="flex justify-center mt-8 sm:mt-9 md:mt-10">
          <Link href="/health-assessment">
            <Button className="bg-[var(--background-color-light)] hover:opacity-80 font-['DM_Sans', 'sans-serif'] 
                          text-[20px] sm:text-[17px] md:text-[18px] text-[var(--text-color-dark)] !font-extrabold rounded-md 
                          px-6 sm:px-8 md:px-10 py-6 sm:py-6 md:py-7
                          cursor-pointer w-full sm:w-auto min-w-[280px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[360px] 
                          shadow-md hover:shadow-lg transition-all duration-300">
            FIND THE RIGHT PROGRAMME
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6 ml-2 transform group-hover:translate-x-2 transition-transform duration-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
          </Button>
        </Link>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default ServicesGrid;