import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReviewData } from './review-interfaces';
import { ObjectId } from 'bson';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review implements ReviewData {
  @Prop() title: string;

  @Prop() comment: string;

  @Prop() rating: number;

  @Prop({ ref: 'Users', type: mongoose.Types.ObjectId }) user: ObjectId | null;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
