// generic restaurant interface that contains core data fields

import { ObjectId } from 'bson';

// try to avoid coupling to technology (i.e. doesn't contain mongo related fields/types)
export default interface RestaurantData {
  name: string;
  description: string;
  city: string;
  address: string;
  reviews: ObjectId[];
  user: ObjectId;
}
