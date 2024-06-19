import { FilterQuery, Model } from "mongoose";
import { User, UserDocument } from "./types/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import UserData from "./types/user-interfaces";
import CreateUserDTO from "./types/user.dto";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    // check the type on UserData
    async findByFilter(filter: FilterQuery<UserData>) {
        return this.userModel.findOne(filter).lean().exec();
    }

    async create(createUserDto: CreateUserDTO) {
        return this.userModel.create(createUserDto);
    }

}