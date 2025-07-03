import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headset } from 'lucide-react';
import policy1 from '../../assets/lp.jpg';
import policy2 from '../../assets/lp1.jpg';
import policy3 from '../../assets/fp.jpg';
import policy4 from '../../assets/ln1.jpg';
import policy5 from '../../assets/ln2.jpg';
import policy6 from '../../assets/ln3.jpg';

export default function OrderPolicySection() {
  const policies = [
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: 'Free Delivery',
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-orange-500" />,
      title: 'Easy Return Policy',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      title: 'Secure Payment',
    },
    {
      icon: <Headset className="w-8 h-8 text-orange-500" />,
      title: '24/7 Customer Service',
    },
  ];

  const images = [policy1, policy2, policy3, policy4, policy5, policy6];

  return (
    <section className="bg-white py-16 px-6 text-center" id='about'>
      {/* <h2 className="text-3xl font-bold text-gray-900 mb-10">🛒 Our Order Policies</h2> */}

      {/* Policy Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-orange-100 rounded-lg p-6 flex flex-col items-center shadow-md"
          >
            {policy.icon}
            <p className="mt-2 font-semibold text-gray-800">{policy.title}</p>
          </div>
        ))}
      </div>

     {/* Images in One Line (No Scrollbar) */}
<div className="w-full overflow-hidden">
  <div className="flex justify-center gap-6 flex-wrap md:flex-nowrap">
    {images.map((img, index) => (
      <div
        key={index}
        className="w-[180px] h-[180px] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
      >
        <img
          src={img}
          alt={`policy-${index}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
