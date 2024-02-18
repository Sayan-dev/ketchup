import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { MongoDocument } from './common';
import { GENDER_TYPE } from './enums';

export type ContactNumber = {
  countryCode: string;
  number: string;
};

export type Upload = {
  _id: string;
  path: string;
  key: string;
  mimeType: string;
  name: string;
  size: string;
  uploadedBy?: string;
};

export interface User extends MongoDocument {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: GENDER_TYPE;
  password?: string;
}

export interface IName {
  firstName?: string;
  lastName?: string;
  middleName?: string;
}

export interface INotifications extends MongoDocument {
  title: string;
  message: string;
}

export interface Product extends MongoDocument {
  name?: string;
  image_url?: string;
  like?: boolean;
  price: number;
  ingredients?: Ingredient[];
  suggestions?: string;
}
export interface Ingredient extends MongoDocument {
  name?: string;
}

export interface Order extends Product {
  quantity: number;
}

export interface PreviousOrderItems {
  orderId: string;
  productId: string;
  product: Product;
}
export interface PreviousOrder {
  orderItems: PreviousOrderItems[];
  address: string;
  contact: string;
  total: number;
}
