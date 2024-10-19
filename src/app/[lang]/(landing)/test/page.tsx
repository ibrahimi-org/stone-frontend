"use client";
import { useEffect, useRef } from "react";

const CustomScrollPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentSectionIndex = 0;

    const sections = Array.from(container.children) as HTMLElement[];

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSectionIndex = sections.indexOf(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    sections.forEach((section) => observer.observe(section));

    // Handle scroll to next/previous section
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scroll down to next section
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: "smooth" });
      } else if (event.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up to previous section
        sections[currentSectionIndex - 1].scrollIntoView({ behavior: "smooth" });
      }
    };

    // Add scroll listener
    container.addEventListener("wheel", handleScroll);

    return () => {
      // Cleanup observer and scroll event listener
      container.removeEventListener("wheel", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide">
      <section className="h-screen snap-start flex items-center justify-center bg-red-500">
        <div className="grid grid-cols-2 gap-8 w-full px-10">
          <div className="left-column opacity-0 transform -translate-x-10">
            <h1 className="text-4xl text-white">Left Content 1</h1>
            <p className="text-white mt-4">This is some text on the left side.</p>
          </div>
          <div className="right-column opacity-0 transform translate-x-10">
            <h1 className="text-4xl text-white">Right Content 1</h1>
            <p className="text-white mt-4">This is some text on the right side.</p>
          </div>
        </div>
      </section>
      <section className="h-screen snap-start flex items-center justify-center bg-green-500">
        <div className="grid grid-cols-2 gap-8 w-full px-10">
          <div className="left-column opacity-0 transform -translate-x-10">
            <h1 className="text-4xl text-white">Left Content 2</h1>
            <p className="text-white mt-4">Another text on the left.</p>
          </div>
          <div className="right-column opacity-0 transform translate-x-10">
            <h1 className="text-4xl text-white">Right Content 2</h1>
            <p className="text-white mt-4">Another text on the right.</p>
          </div>
        </div>
      </section>
      {/* Add more sections here */}
    </div>
  );
};

export default CustomScrollPage;
