import { ObjectId } from 'bson';
import RestaurantData from './restaurant-interfaces';

// create and update dto's
export class CreateRestaurantDTO implements RestaurantData {
  name: string;
  description: string;
  city: string;
  address: string;
  reviews: ObjectId[] | null;
  user: ObjectId | null;
}

export class UpdateRestaurantDTO implements RestaurantData {
  name: string;
  description: string;
  city: string;
  address: string;
}
