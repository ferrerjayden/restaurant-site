import { ObjectId } from 'bson';

// create and update dto's
export class CreateRestaurantDTO {
  name: string;
  description: string;
  city: string;
  address: string;
  user: ObjectId | null;
}

export class UpdateRestaurantDTO {
  name: string;
  description: string;
  city: string;
  address: string;
}
