import football1 from "../../assets/footb1.jpg";
import basketball1 from "../../assets/basketb1.jpg";
import running1 from "../../assets/running2.jpg";
import training1 from "../../assets/training1.jpg";

const products = [
  {
    id: 9,
    name: "Football Pro Cleats",
    image: [football1],
    description: "Designed for traction on the field.",
    detaildesc:
      "Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.",
    stocks: 7,
    category: "Football",
    categorypage: "Sports",
    price: 2349.99,
    gender: ["women", "Men"],
    color: "Black",
    sizes: ["42", "43"],
    offer: '70-off',
  },
  {
    id: 10,
    name: "Basketball Jump High",
    image: [basketball1],
    description: "High-top shoes for perfect ankle support.",
    detaildesc:
      "Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.",
    stocks: 9,
    category: "Basketball",
    categorypage: "Sports",
    price: 2999.99,
    gender: ["women", "Men"],
    color: "White",
    sizes: ["43", "44"],
   
  },
  {
    id: 11,
    name: "Running Pro Max",
    image: [running1],
    description: "Lightweight and breathable for long runs.",
    detaildesc:
      "Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.",
    stocks: 16,
    category: "Running",
    categorypage: "Sports",
    price: 1899.99,
    gender: ["women", "Men"],
    color: "Gray",
    sizes: ["41", "42"],
  },
  {
    id: 12,
    name: "Training Flex Fit",
    image: [training1],
    description: "All-purpose training shoes with flexible grip.",
    detaildesc:
      "Nunc vehicula quam semper odio varius tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue.",
    stocks: 3,
    category: "Training",
    categorypage: "Sports",
    gender: ["women", "Men"],
    price: 2099.99,
    color: "White",
    sizes: ["40", "41", "42"],
    offer: '30-off',
  },
];

export default products;
