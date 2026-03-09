import CitySearch from "./CitySearch";

function HeroSection({ setSelectedCity }) {
  return (
    <section className="relative w-full h-[240px] md:h-[320px] lg:h-[380px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="Weather Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Center Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">

        <div className="w-full max-w-lg md:max-w-2xl">

          <CitySearch setSelectedCity={setSelectedCity} />

        </div>

      </div>

    </section>
  );
}

export default HeroSection;