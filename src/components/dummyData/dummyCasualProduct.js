import daily1 from '../../assets/dailyw1.jpg';
import slipon1 from '../../assets/sliper1.jpg';
import slipon2 from '../../assets/sliper2.jpg';

const products = [
  {
    id: 13,
    name: 'Daily Comfy Walkers',
    image: [daily1],
    description: 'Great for everyday city walks.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Daily Wear',
    price: 1399.99,
    stocks:3,
    gender: ['women','Men'],
    color: 'Gray',
    sizes: ['40', '41'],
  },
  {
    id: 14,
    name: 'Soft Slip-ons',
    image: [slipon1],
    description: 'Simple and easy to wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Slip-ons',
    price: 999.99,
    stocks:5,
    gender: ['women','Men'],
    color: 'White',
    sizes: ['40', '41'],
  },
  {
    id: 15,
    name: 'Soft Slip-ons',
    image: [slipon2],
    description: 'Simple and easy to wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Slip-ons',
    price: 999.99,
    stocks:1,
    gender: ['women','Men'],
    color: 'Blue',
    sizes: ['39', '42'],
  },
];

export default products;
