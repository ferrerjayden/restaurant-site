import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import UserData from "./user-interfaces";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User implements UserData {
    @Prop() userName: string;

    @Prop() email: string;

    @Prop() password: string;

    @Prop() role: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);