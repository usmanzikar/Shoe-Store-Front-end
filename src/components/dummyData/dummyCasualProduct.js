import daily1 from '../../assets/dailyw1.jpg';
import slipon1 from '../../assets/sliper1.jpg';
import slipon2 from '../../assets/sliper2.jpg';

const products = [
  {
    id: 1,
    name: 'Daily Comfy Walkers',
    image: daily1,
    description: 'Great for everyday city walks.',
    category: 'Daily Wear',
    price: 1399.99,
    gender: [' women ',' Men '],
    color: 'Gray',
    sizes: ['40', '41'],
  },
  {
    id: 2,
    name: 'Soft Slip-ons',
    image: slipon1,
    description: 'Simple and easy to wear.',
    category: 'Slip-ons',
    price: 999.99,
    gender: [' women ',' Men '],
    color: 'White',
    sizes: ['40', '41'],
  },
  {
    id: 3,
    name: 'Soft Slip-ons',
    image: slipon2,
    description: 'Simple and easy to wear.',
    category: 'Slip-ons',
    price: 999.99,
    gender: [' women ',' Men '],
    color: 'Blue',
    sizes: ['39', '42'],
  },
];

export default products;
