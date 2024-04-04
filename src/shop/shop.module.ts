import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { PostsService } from "../posts/posts.service";
import { ShopService } from "./shop.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { Post } from "../posts/posts.model";
import { FilesModule } from "../files/files.module";
import { Shop } from "./shop.model";
import { UserShop } from "./user_items.model";
import { UsersModule } from "../users/users.module";
import { UserInfo } from "../users/user_info.model";

@Module({
  controllers: [ShopController],
  providers: [ShopService],
  imports: [
    SequelizeModule.forFeature([UserShop, Shop, UserInfo, User]),
    FilesModule,
    UsersModule
  ],
  exports:[
    ShopService
  ]
})
export class ShopModule {}
