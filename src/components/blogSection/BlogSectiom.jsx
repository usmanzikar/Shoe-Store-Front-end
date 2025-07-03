import React from 'react';
import blogImg1 from '../../assets/casual.jpg';
import blogImg2 from '../../assets/lp1.jpg';
import blogImg3 from '../../assets/sneakers.jpg';



const blogs = [
  {
    title: 'Stay in Style',
    description: 'Discover how to pair your sneakers with anything from streetwear to smart casuals.',
    image: blogImg1,
    reversed: false,
  },
  {
    title: 'Elegance in Every Step',
    description: 'Learn about how formal shoes are evolving in modern fashion.',
    image: blogImg2,
    reversed: true,
  },
  {
    title: 'Walk in your style',
    description: 'Learn about how formal shoes are evolving in modern fashion.',
    image: blogImg3,
    reversed: false,
  },
];

export default function BlogSection() {
  return (
    <section id='blog' className="bg-white py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Latest from Our Blog</h2>
      <div className="space-y-16">
        {blogs.map((blog, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row ${blog.reversed ? 'md:flex-row-reverse' : ''} items-center gap-10`}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-1/2 h-[300px] object-cover rounded-lg shadow-lg"
            />
            <div className="md:w-1/2 text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{blog.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
