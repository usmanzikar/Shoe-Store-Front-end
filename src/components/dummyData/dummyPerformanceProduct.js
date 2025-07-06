import football1 from '../../assets/footb1.jpg';
import basketball1 from '../../assets/basketb1.jpg';
import running1 from '../../assets/running2.jpg';
import training1 from '../../assets/training1.jpg';

const products = [
 {
    id: 1,
    name: 'Football Pro Cleats',
    image: football1,
    description: 'Designed for traction on the field.',
    category: 'Football',
    price: 2349.99,
    gender: ['women','Men'],
    color: 'Black',
    sizes: ['42', '43'],
  },
  {
    id: 2,
    name: 'Basketball Jump High',
    image: basketball1,
    description: 'High-top shoes for perfect ankle support.',
    category: 'Basketball',
    price: 2999.99,
    gender: ['women','Men'],
    color: 'White',
    sizes: ['43', '44'],
  },
  {
    id: 3,
    name: 'Running Pro Max',
    image: running1,
    description: 'Lightweight and breathable for long runs.',
    category: 'Running',
    price: 1899.99,
    gender: ['women','Men'],
    color: 'Gray',
    sizes: ['41', '42'],
  },
  {
    id: 4,
    name: 'Training Flex Fit',
    image: training1,
    description: 'All-purpose training shoes with flexible grip.',
    category: 'Training',
    gender: ['women','Men'],
    price: 2099.99,
    color: 'White',
    sizes: ['40', '41', '42'],
  },
];

export default products;
