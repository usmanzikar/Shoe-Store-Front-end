import heel1 from '../../assets/wh.jpg';
import flat1 from '../../assets/wh2.jpg';
import womenBoot1 from '../../assets/wb.jpg';
import womenSneaker1 from '../../assets/ws.jpg';

const womenProducts = [
  {
    id: 5,
    name: 'Elegant Red Heels',
    image: [heel1],
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    description: 'Stylish heels perfect for parties and events.',
    category: 'Heels',
    categorypage: 'Heels',
    gender: 'women',
    price: 2199.99,
    color: 'Red',
    stocks:9,
    sizes: ['36', '37', '38'],
  },
  {
    id: 6,
    name: 'Classic Black Flats',
    image: [flat1],
    description: 'Comfortable and simple flats for daily wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Flats',
    categorypage: 'Flats',
    price: 1399.99,
    gender: 'women',
    color: 'Black',
    stocks:19,
    sizes: ['37', '38', '39'],
  },
  {
    id: 7,
    name: 'Stylish Women’s Boots',
    image: [womenBoot1],
    description: 'Warm and trendy boots for winter style.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Boots',
    categorypage: 'Boots',
    price: 2749.99,
    gender: 'women',
    color: 'Brown',
    stocks:8,
    sizes: ['38', '39', '40'],
  },
  {
    id: 8,
    name: 'Trendy Pink Sneakers',
    image: [womenSneaker1],
    description: 'Lightweight sneakers ideal for casual wear.',
    detaildesc: 'Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.',
    category: 'Sneakers',
    categorypage: 'Sneakers',
    price: 1999.99,
    gender: 'women',
    color: 'Pink',
    stocks:13,
    sizes: ['36', '37', '38'],
  },
];

export default womenProducts;
