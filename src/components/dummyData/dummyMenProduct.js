import boot1 from '../../assets/bp.jpg';
import sneaker1 from '../../assets/boots2p.jpg';
import loafer1 from '../../assets/lp.jpg';
import sandal1 from '../../assets/fp.jpg';

const products = [
  {
    id: 1,
    name: 'Men’s Brown Boots',
    image: boot1,
    description: 'Durable boots for outdoor wear.',
    category: 'Boots',
    price: 779.99,
    gender: 'Men',
    color: 'Brown',
    sizes: ['40', '41'],
  },
  {
    id: 2,
    name: 'Casual Sneakers',
    image: sneaker1,
    description: 'Perfect for daily walking and comfort.',
    category: 'Sneakers',
    gender: 'Men',
    price: 1159.99,
    color: 'White',
    sizes: ['41', '42'],

  },
  {
    id: 3,
    name: 'Formal Black Loafers',
    image: loafer1,
    description: 'Slip-on style for formal wear.',
    category: 'Loafers',
    price: 1689.99,
    gender: 'Men',
    color: 'Black',
    sizes: ['43', '44'],

  },
  {
    id: 4,
    name: 'Men’s Leather Sandals',
    image: sandal1,
    description: 'Open design for summer wear.',
    category: 'Sandals',
    price: 4539.99,
    gender: 'Men',
    color: 'Tan',
    sizes: ['44'],

  },
];

export default products;
