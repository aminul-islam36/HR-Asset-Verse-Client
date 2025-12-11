import { Star, Building2, Users, ShieldCheck } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by <span className="text-blue-600">Top Companies</span>
          </h2>
          <p className="text-gray-600 mt-2">
            More than 100+ businesses rely on AssetVerse for asset management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 text-center">
          <div className="p-6 bg-gray-50 rounded-2xl shadow border">
            <Building2 className="w-10 h-10 mx-auto text-secondary" />
            <h3 className="text-3xl font-bold text-gray-900 mt-2">100+</h3>
            <p className="text-gray-600">Companies Served</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow border">
            <Users className="w-10 h-10 mx-auto text-secondary" />
            <h3 className="text-3xl font-bold text-gray-900 mt-2">5,000+</h3>
            <p className="text-gray-600">Active Employees</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow border">
            <ShieldCheck className="w-10 h-10 mx-auto text-secondary" />
            <h3 className="text-3xl font-bold text-gray-900 mt-2">99.9%</h3>
            <p className="text-gray-600">System Uptime</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow border">
            <Star className="w-10 h-10 mx-auto text-secondary" />
            <h3 className="text-3xl font-bold text-gray-900 mt-2">4.9/5</h3>
            <p className="text-gray-600">Customer Rating</p>
          </div>
        </div>

        {/* ----------------Testimonials------------------- */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-gray-50 rounded-2xl shadow border">
            <p className="text-gray-700 italic">
              “AssetVerse completely transformed how we manage company assets.
              It's fast, reliable, and extremely easy to use.”
            </p>
            <h4 className="mt-4 font-semibold text-gray-900">
              — Sarah Johnson, HR Manager
            </h4>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow border">
            <p className="text-gray-700 italic">
              “Tracking assets for 200+ employees used to be a nightmare, but
              AssetVerse made everything automated and stress-free.”
            </p>
            <h4 className="mt-4 font-semibold text-gray-900">
              — Mark Wilson, Operations Head
            </h4>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow border">
            <p className="text-gray-700 italic">
              “Excellent support team! Their Premium plan gave us full control
              and custom branding. Highly recommended!”
            </p>
            <h4 className="mt-4 font-semibold text-gray-900">
              — Daniel Gomez, CEO
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
