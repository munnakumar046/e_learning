import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Full section background image */}
      <Image
        src="/heroimg.png"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient overlay for readability on top of image */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navyLight/80 to-blue-600/70" />

      {/* subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 py-16 md:flex-row md:py-20 lg:px-10">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
            Discover Your Next Skill - Browse, Learn, and Grow!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-blue-100 sm:text-base">
            Explore a wide range of courses and upskill your career. Browse
            courses, join communities, and get the best digital and physical
            products, all from right here.
          </p>
          <button className="mt-6 rounded-md  px-6 py-3 text-sm font-semibold text-white bg-blue-500">
            Button CTA
          </button>
        </div>
      </div>
    </section>
  );
}
