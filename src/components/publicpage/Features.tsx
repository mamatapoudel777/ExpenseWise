import React, { useRef, useEffect, useState } from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#00B37E]/20 to-[#00694B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0"></div>

    <div className="relative z-10 flex flex-col items-start">
      <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl text-[#00694B] group-hover:text-white transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-[#00694B]">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Features: React.FC = () => {
  const featureData = [
    { icon: "📊", title: "Track Expenses", description: "Easily record and categorize all your expenses in seconds. Get real-time insights." },
    { icon: "💵", title: "Monitor Income", description: "Keep track of all income sources and see exactly how much money is coming in." },
    { icon: "📸", title: "Upload Receipts", description: "Snap photos of receipts and let our AI extract and categorize transaction details." },
    { icon: "📈", title: "Generate Reports", description: "Create detailed financial reports and visualizations to plan your financial future." }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 bg-[#F7F8FC]" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#00694B]">Everything You Need to Manage Money</h2>
          <p className="text-gray-500 text-lg">Powerful features designed to simplify your financial life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className={`opacity-0 transform translate-y-8 transition-all duration-700`}
              style={{
                transitionDelay: `${index * 300}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(50px)',
              }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
