import heroImg from "../assets/business.webp";
import Container from "./Container";
const Hero = () => {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-5 lg:gap-10 items-center">
        {/* Left section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral leading-tight">
            Manage Your Company Assets <br />
            with <span className="text-primary">AssetVerse</span>
          </h1>

          <p className="text-lg text-gray-500">
            A powerful platform to track, monitor, and manage all your company
            assets efficiently. Boost productivity and reduce asset loss with
            real-time updates.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700">
              Get Started
            </button>

            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="Asset Management"
            className="w-full max-w-md shadow-lg rounded-2xl"
          />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
