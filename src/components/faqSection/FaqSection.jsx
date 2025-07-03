import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqImg from '../../assets/bp.jpg'; // Replace with your image

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order using the tracking link sent to your email after purchase.",
  },
  {
    question: "What is your return policy?",
    answer: "Returns are accepted within 14 days of delivery in original condition.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally with standard and express options.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally with standard and express options.",
  },
   {
    question: "What is your return policy?",
    answer: "Returns are accepted within 14 days of delivery in original condition.",
  },

];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-gray-50" id='faq'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* LEFT - FAQ */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 bg-white rounded-md shadow-md flex overflow-hidden">
              
              {/* Left strip color */}
              <div className="w-2 bg-orange-500" />

              {/* FAQ Content */}
              <div className="flex-1 p-4">
                <button
                  onClick={() => toggle(index)}
                  className="flex justify-between items-center w-full text-left font-semibold text-gray-800"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? 'rotate-180 text-orange-500' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Round Image */}
        <div className="flex justify-center">
          <div className="w-[400px] h-[600px] rounded-full overflow-hidden shadow-xl border-4 border-orange-500">
            <img
              src={faqImg}
              alt="FAQ Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
