import { ObjectId } from 'bson';
import { ReviewData } from './review-interfaces';

export interface CreateReviewDTO extends ReviewData {
  title: string;
  comment: string;
  rating: number;
  user: ObjectId | null;
}

export interface UpdateReviewDTO extends ReviewData {
  title: string;
  comment: string;
  rating: number;
}
