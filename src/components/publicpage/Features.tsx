import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
    <div className="text-4xl mb-6 bg-gray-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-[#00B37E]/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 text-[#00694B]">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const featureData = [
    { icon: "📊", title: "Track Expenses", description: "Easily record and categorize all your expenses in seconds. Get real-time insights." },
    { icon: "💵", title: "Monitor Income", description: "Keep track of all income sources and see exactly how much money is coming in." },
    { icon: "📸", title: "Upload Receipts", description: "Snap photos of receipts and let our AI extract and categorize transaction details." },
    { icon: "📈", title: "Generate Reports", description: "Create detailed financial reports and visualizations to plan your financial future." }
  ];

  return (
    <section id="features" className="py-24 bg-[#F7F8FC]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#00694B]">Everything You Need to Manage Money</h2>
          <p className="text-gray-500 text-lg">Powerful features designed to simplify your financial life</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;