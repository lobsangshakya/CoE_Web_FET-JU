
import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import Button from './common/Button';
import { mockCOEs } from '../data/mockData';

const generateBanners = () => {
  const coeBanners = mockCOEs.map(coe => ({
    type: 'text' as const,
    bgUrl: `https://picsum.photos/seed/${coe.id}/1920/1080`,
    title: `Center of Excellence – ${coe.longName}`,
    subtitle: coe.tagline,
    coeId: coe.id,
    cta: {
        text: 'Visit COE',
        link: `/coe/${coe.id}`
    }
  }));

  return [
    {
      type: 'logo' as const,
      bgUrl: 'https://i.postimg.cc/9zH91CXP/download.jpg',
      logoUrl: 'https://i.postimg.cc/2jFprTv2/image-removebg-preview-1.png',
      title: 'Center of Excellence',
      subtitle: 'A Hub for Innovation, Research, and Community Engagement.',
      cta: {
          text: 'Explore All COEs',
          link: '/coe'
      }
    },
    ...coeBanners
  ];
};

const banners = generateBanners();

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = useCallback(() => {
        setCurrentIndex(current => (current === 0 ? banners.length - 1 : current - 1));
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex(current => (current === banners.length - 1 ? 0 : current + 1));
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <section className="relative h-[85vh] w-full overflow-hidden">
            {/* Banner slides */}
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0'
                    }`}
                    aria-hidden={index !== currentIndex}
                >
                    {/* Background image with Ken Burns effect */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-linear"
                        style={{
                            backgroundImage: `url('${banner.bgUrl}')`,
                            transform: index === currentIndex ? 'scale(1.15)' : 'scale(1)',
                        }}
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-brand-dark-blue/70" />

                    {/* Banner content */}
                    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4 sm:p-8">
                        <div className="bg-black/30 backdrop-blur-md p-6 sm:p-10 rounded-xl border border-white/20 max-w-4xl animate-fade-in">
                            {banner.type === 'logo' ? (
                                <img
                                    src={banner.logoUrl}
                                    alt="Center of Excellence Logo"
                                    className="w-full h-auto max-w-lg mx-auto"
                                />
                            ) : null}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg mt-4">{banner.title}</h1>
                            {banner.subtitle && <p className="mt-4 text-lg sm:text-xl text-gray-300">{banner.subtitle}</p>}
                            
                            {banner.cta && (
                                <div className="mt-8">
                                    <NavLink to={banner.cta.link}>
                                         <Button variant="primary" className="text-lg px-8 py-3">
                                            {banner.cta.text}
                                        </Button>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 z-30 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 z-30 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-accent focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
            
            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex space-x-3">
                {banners.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            currentIndex === slideIndex ? 'bg-orange-accent scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;