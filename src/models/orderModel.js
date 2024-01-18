import categoriesAddonsModel from '@/models/categoriesAddonsModel';
import productModel from '@/models/productModel';
import contactDataModel from '@/models/contactDataModel';

const orderModel = {
  product: false,
  contactData: contactDataModel,
  addons: [],
  categoriesAddons: categoriesAddonsModel,
};

export default orderModel;
