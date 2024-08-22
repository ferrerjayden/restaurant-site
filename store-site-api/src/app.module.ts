import { Module, Res } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { MongooseModule } from '@nestjs/mongoose'
import { RestaurantsModule } from './modules/restaurants/restaurants.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    RestaurantsModule,
    ReviewsModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}`),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
