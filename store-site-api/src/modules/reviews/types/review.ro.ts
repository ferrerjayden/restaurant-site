import { ObjectId } from 'bson';
import { ReviewData } from './review-interfaces';

export interface ReviewRO extends ReviewData {
  _id: ObjectId;
  title: string;
  comment: string;
  rating: number;
  user: ObjectId | string;
}
