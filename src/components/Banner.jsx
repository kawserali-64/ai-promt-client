"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Button, Link } from "@heroui/react";
import { Sparkles, ArrowRight, Terminal, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const bannerSlides = [
  {
    image: "/banner1.png",
    badge: "AI Prompt Generator",
    title: "Generate Perfect Prompts Instantly",
    description: "Struggling with what to ask? Let our advanced AI craft the perfect, highly detailed prompt for your needs with just a few keywords.",
  },
  {
    image: "/banner2.jpg",
    badge: "Smart Prompt Optimizer",
    title: "Transform Good Prompts into Great Ones",
    description: "Paste your raw ideas or basic prompts, and watch our AI refine, expand, and structure them for maximum precision and effectiveness.",
  },
  {
    image: "/banner3.jpg",
    badge: "Intelligent AI Assistant",
    title: "Seamless Conversations with AI Chatbot",
    description: "Engage in real-time with our smart assistant. Brainstorm ideas, get instant answers, and interact naturally to supercharge your workflow.",
  },
];

export default function HeroBannerSlider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // হাইট বাড়ানো হয়েছে (h-[500px] sm:h-[600px] lg:h-[650px])
  if (!isMounted) {
    return <div className="w-full h-[500px] sm:h-[600px] lg:h-[650px] bg-white dark:bg-zinc-950 animate-pulse" />;
  }

  const primaryColor = "#7C3AED"; 
  const accentColor = "#C4B5FD";  

  return (
    <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[650px] overflow-hidden group shadow-[0_15px_35px_rgba(124,58,237,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-b border-purple-100 dark:border-zinc-900 bg-gradient-to-br from-purple-50/60 via-white to-purple-50/30 dark:bg-zinc-950">
      
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-2/5 bg-purple-200/40 dark:bg-[#7C3AED]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        className="w-full h-full"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            
            {/* ব্যাকগ্রাউন্ড ইমেজ এবং থিম অনুযায়ী গ্রেডিয়েন্ট ওভারলে */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/85 sm:w-3/4 w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/30 dark:from-zinc-950 dark:via-transparent dark:to-zinc-950/40" />
            </div>

            {/* কন্টেন্ট লেআউট */}
            <div className="absolute inset-0 flex items-center z-10">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl sm:max-w-2xl space-y-4">
                  
                  {/* ব্যাজ */}
                  <div 
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-purple-900 dark:text-white backdrop-blur-md border border-purple-200 dark:border-white/15 shadow-sm"
                    style={{ backgroundColor: 'rgba(124, 58, 237, 0.08)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-700 dark:text-[#C4B5FD]" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* টাইটেল */}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                    {slide.title.split(" ").map((word, i) => (
                      i === 1 || i === 2 ? (
                        <span key={i} className="text-purple-700 dark:text-[#C4B5FD] drop-shadow-sm"> {word}</span>
                      ) : (
                        ` ${word}`
                      )
                    ))}
                  </h1>

                  {/* ডেসক্রিপশন */}
                  <p className="text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-300 max-w-lg font-normal leading-relaxed">
                    {slide.description}
                  </p>

                  {/* বাটন */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link href="/all-promt">
                      <Button 
                        size="md"
                        className="font-semibold text-white px-6 py-5 rounded-xl shadow-[0_10px_20px_rgba(124,58,237,0.25)] dark:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_25px_rgba(124,58,237,0.4)] dark:hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-all hover:scale-105 active:scale-95"
                        style={{ backgroundColor: primaryColor }}
                        endContent={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore Prompts
                      </Button>
                    </Link>

                    <Link href="/ai-tools">
                      <Button 
                        size="md"
                        variant="bordered"
                        className="font-semibold text-zinc-800 dark:text-white border-purple-300 dark:border-white/20 hover:bg-purple-100/50 dark:hover:bg-white/10 hover:border-purple-400 dark:hover:border-white/40 px-6 py-5 rounded-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
                      >
                        <Terminal className="w-4 h-4 mr-1 text-purple-700 dark:text-[#C4B5FD]" />
                        Try AI Tools
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* নেভিগেশন অ্যারো বাটন (বাম) */}
      <button 
        className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-black/50 text-zinc-800 dark:text-white backdrop-blur-md border border-purple-200 dark:border-white/15 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* নেভিগেশন অ্যারো বাটন (ডান) */}
      <button 
        className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/80 dark:bg-black/50 text-zinc-800 dark:text-white backdrop-blur-md border border-purple-200 dark:border-white/15 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* পেজিনেশন ডট */}
      <div className="custom-swiper-pagination absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2 pointer-events-auto" />

      {/* কাস্টম ডট ও থিম ভিত্তিকভ একটিভ স্টেট স্টাইল */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          background: rgba(124, 58, 237, 0.3);
          width: 8px;
          height: 8px;
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .dark .custom-swiper-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #7C3AED !important;
          width: 24px;
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
        }
        .dark .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #C4B5FD !important;
          box-shadow: 0 0 10px rgba(196, 181, 253, 0.8);
        }
      `}</style>
    </section>
  );
}