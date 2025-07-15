import React from 'react';
import blogImg1 from '../../assets/casual.jpg';
import blogImg2 from '../../assets/lp1.jpg';
import blogImg3 from '../../assets/sneakers.jpg';

const blogs = [
  {
    title: 'Stay in Style',
    description: 'Discover how to pair your sneakers with anything from streetwear to smart casuals. Trends in 2025 are all about comfort and color coordination.',
    image: blogImg1,
    reversed: false,
  },
  {
    title: 'Elegance in Every Step',
    description: 'Formal shoes are now designed with elegance and comfort in mind. Step confidently into any occasion with the right pair.',
    image: blogImg2,
    reversed: true,
  },
  {
    title: 'Walk in Your Style',
    description: 'Explore the versatility of modern sneakers and casual shoes with bright tones and futuristic designs.',
    image: blogImg3,
    reversed: false,
  },
];

export default function BlogSection() {
  return (
    <section className="bg-white py-24 px-4 md:px-12">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Latest from Our Blog</h2>

      <div className="space-y-24">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row ${
              blog.reversed ? 'md:flex-row-reverse' : ''
            } items-center gap-10 group`}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2 h-auto flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden shadow-xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Blog Content */}
            <div className="w-full md:w-1/2 px-2 md:px-6 text-center md:text-left animate-fadeIn">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">{blog.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
