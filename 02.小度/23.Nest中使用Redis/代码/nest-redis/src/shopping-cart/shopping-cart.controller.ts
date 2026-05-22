import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.shoppingCartService.findOne(+userId);
  }

  @Patch()
  update(@Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(updateShoppingCartDto);
  }
}
