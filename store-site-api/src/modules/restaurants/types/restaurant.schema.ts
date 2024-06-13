import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import RestaurantData from './restaurant-interfaces';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Review } from '../../reviews/types/reviews.schema';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant implements RestaurantData {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  // should reference reviews model
  @Prop({
    ref: Review.name,
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
  })
  reviews: ObjectId[] | null;

  // should reference user model
  @Prop({ ref: 'Users', type: mongoose.Schema.Types.ObjectId, default: null })
  user: ObjectId | null;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
