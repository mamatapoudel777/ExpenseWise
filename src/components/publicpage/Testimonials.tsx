import React from "react";

interface TestimonialCardProps {
  stars: number;
  text: string;
  author: string;
  role: string;
  initials: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  stars,
  text,
  author,
  role,
  initials,
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-w-[340px] mx-4 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="text-yellow-400 mb-4 text-xl">
        {"★".repeat(stars)}
        {"☆".repeat(5 - stars)}
      </div>
      <p className="text-gray-600 italic mb-8 leading-relaxed">"{text}"</p>
    </div>

    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00694B] to-[#00B37E] flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div>
        <h4 className="font-bold text-gray-800">{author}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const reviews: TestimonialCardProps[] = [
    {
      stars: 5,
      text: "As a freelancer, tracking expenses was always a hassle. ExpenseWise makes it so easy and the reports help me during tax season.",
      author: "Sarah Kim",
      role: "Freelance Designer",
      initials: "SK",
    },
    {
      stars: 5,
      text: "ExpenseWise has completely transformed how I manage my finances. I've saved over $800 in just three months!",
      author: "Jessica Davis",
      role: "Marketing Manager",
      initials: "JD",
    },
    {
      stars: 5,
      text: "The receipt scanning feature is a game-changer! No more manual entry. The dashboard gives me all the insights I need.",
      author: "Michael Rodriguez",
      role: "Small Business Owner",
      initials: "MR",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      {/* Animation CSS */}
      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-slide {
            animation: slide 25s linear infinite;
          }

          .animate-slide:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00694B] mb-4">
          Trusted by Thousands
        </h2>
        <p className="text-gray-500">
          See what our users say about ExpenseWise
        </p>
      </div>

      {/* Slider */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-slide">
          {[...reviews, ...reviews].map((rev, idx) => (
            <TestimonialCard key={idx} {...rev} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
