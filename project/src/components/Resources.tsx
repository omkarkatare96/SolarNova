import React from 'react';
import { ExternalLink, Clock, BookOpen } from 'lucide-react';

const blogs = [
  {
    title: "Maharashtra Solar – Unleashing the Power of Renewable Energy",
    description: "An in-depth exploration of Maharashtra's solar energy initiatives, available incentives, and the growing job market in the renewable energy sector.",
    link: "https://maharashtrasolar.com/blog/unleashing-renewable-power",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
    readTime: "8 min",
    source: "Maharashtra Solar"
  },
  {
    title: "Solar System Price and Subsidy in Maharashtra (2025)",
    description: "Comprehensive analysis of current solar panel pricing trends and available subsidy schemes for residential and commercial installations.",
    link: "https://amplussolar.com/blog/maharashtra-solar-prices-2025",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1000",
    readTime: "10 min",
    source: "Amplus Solar"
  },
  {
    title: "Overview of Rooftop Solar in Mumbai",
    description: "Detailed insights into Mumbai's rooftop solar potential, success stories, and future adoption trends in urban areas.",
    link: "https://periurja.com/blog/mumbai-rooftop-solar-overview",
    image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?auto=format&fit=crop&q=80&w=1000",
    readTime: "12 min",
    source: "PeriUrja"
  },
  {
    title: "Government Subsidies for Solar Panels in Maharashtra",
    description: "Complete guide to state and central government subsidies, financial incentives, and application procedures for solar installations.",
    link: "https://solarsubsidy.maharashtra.gov.in/guide",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1000",
    readTime: "15 min",
    source: "Maharashtra Energy Department"
  },
  {
    title: "Unlocking Solar Energy Systems for Homes in Maharashtra",
    description: "A comprehensive guide for homeowners covering everything from system selection to installation and maintenance procedures.",
    link: "https://solarguide.maharashtra.com/home-installation",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&q=80&w=1000",
    readTime: "20 min",
    source: "Maharashtra Solar Guide"
  }
];

export default function Resources() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Insights on Solar Adoption</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blog.readTime}
                  </span>
                  <span className="text-sm text-yellow-600">{blog.source}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{blog.description}</p>
                
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-medium"
                >
                  Read More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-start space-x-4">
            <BookOpen className="h-8 w-8 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-600">
                Our resource center is regularly updated with the latest information about solar energy adoption,
                technology advancements, and policy updates in Maharashtra. Bookmark this page to stay informed
                about the solar energy landscape.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}