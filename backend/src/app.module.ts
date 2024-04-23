import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { EventsModule } from './events/events.module';
import * as path from 'path'
import { AchievementType } from "./achievments/achievement_type.model";
import { AchievementsModule } from "./achievments/achievements.module";
import { Event } from "./events/events.model";
import { Achievements } from "./achievments/achievements.model";
import { UserInfo } from "./users/user_info.model";
import { AchievementGrade } from "./achievments/achievement_grade";
import { ShopService } from './shop/shop.service';
import { ShopModule } from './shop/shop.module';
import { Shop } from "./shop/shop.model";
import { UserShop } from "./shop/user_items.model";
import { TweetsModule } from './tweets/tweets.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
      ConfigModule.forRoot({
         envFilePath: `.env`
      }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname,'static'),
      }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, Event, Achievements, UserInfo, AchievementType, AchievementGrade, Shop, UserShop],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        EventsModule,
        AchievementsModule,
        ShopModule,
        TweetsModule
    ]
})
export class AppModule{}