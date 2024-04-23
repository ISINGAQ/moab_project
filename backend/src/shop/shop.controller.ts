import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { CreateEventDto } from "../events/dto/events.dto";
import { RolesService } from "../roles/roles.service";
import { ShopService } from "./shop.service";
import { CreateShopDto } from "./dto/create-shop.dto";

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {
  }

  @Post("/createShop")
  @UseInterceptors(FileInterceptor('image'))
  createEvent(@Body() dto:CreateShopDto,
              @UploadedFile() image){
    return this.shopService.create(dto,image);
  }

  @Get("/getAllShop")
  getAllShop(){
    return this.shopService.getAllShops();
  }

  @Post("/purchase")
  purchace(@Query('userId') userId: number, @Query('shopId') shopId: number){
    return this.shopService.purchase(userId, shopId);
  }


}
