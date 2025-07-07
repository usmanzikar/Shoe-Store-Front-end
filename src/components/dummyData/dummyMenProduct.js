import boot1 from '../../assets/bp.jpg';
import sneaker1 from '../../assets/boots2p.jpg';
import sneaker2 from '../../assets/sneakers2.jpg';
import sneaker3 from '../../assets/sneakers.jpg';
import loafer1 from '../../assets/lp.jpg';
import sandal1 from '../../assets/fp.jpg';


const products = [
  {
    id: 1,
    name: 'Men’s Brown Boots',
    image: [boot1,sneaker2,sneaker3],
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    description: 'Durable boots for outdoor wear.',
    category: 'Boots',
    price: 779.99,
    stocks:9,
    gender: 'Men',
    color: 'Brown',
    sizes: ['40', '41'],
  },
  {
    id: 2,
    name: 'Casual Sneakers',
    image: [sneaker1,boot1],
    description: 'Perfect for daily walking and comfort.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Sneakers',
    gender: 'Men',
    stocks:19,
    price: 1159.99,
    color: 'White',
    sizes: ['41', '42'],

  },
  {
    id: 3,
    name: 'Formal Black Loafers',
    image: [loafer1,sneaker2],
    description: 'Slip-on style for formal wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Loafers',
    price: 1689.99,
    gender: 'Men',
    stocks:10,
    color: 'Black',
    sizes: ['43', '44'],

  },
  {
    id: 4,
    name: 'Men’s Leather Sandals',
    image: [sandal1,sneaker3],
    description: 'Open design for summer wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Sandals',
    price: 4539.99,
    gender: 'Men',
    stocks:13,
    color: 'Tan',
    sizes: ['44'],

  },
];

export default products;
