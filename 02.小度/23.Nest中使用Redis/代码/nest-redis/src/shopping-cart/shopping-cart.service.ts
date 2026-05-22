import { Inject, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { RedisClientType } from 'redis';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @InjectRepository(ShoppingCart)
  private shoppingCartRepository: Repository<ShoppingCart>;

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    // 保存到mysql数据库
    await this.shoppingCartRepository.save(createShoppingCartDto);

    // 保存到redis
    await this.redisClient.set(
      `cart:${createShoppingCartDto.userId}`,
      JSON.stringify(createShoppingCartDto),
    );

    return {
      message: '添加购物车成功',
      success: true,
    };
  }

  async findOne(id: number) {
    // 先从缓存中获取数据，没有再到mysql中查询获取
    const data = await this.redisClient.get(`cart:${id}`);
    const cartEntity = data ? JSON.parse(data) : null;

    if (cartEntity) {
      return cartEntity;
    }

    return this.shoppingCartRepository.findOne({
      where: {
        userId: id,
      },
    });
  }

  // 前端传送过来的数据应该是{userId, cartData}
  async update(updateShoppingCartDto: UpdateShoppingCartDto) {
    const {
      userId,
      cartData: { count = 1 },
    } = updateShoppingCartDto;

    // 先根据userId查询数据
    const cartEntity = await this.findOne(userId);

    const cart = cartEntity ? cartEntity.cartData : {};

    const quality = (cart.count || 0) + count;

    // 更新数据
    cart.count = quality;

    // 更新mysql数据
    await this.shoppingCartRepository.update({ userId }, cartEntity);
    // 更新redis数据
    await this.redisClient.set(`cart:${userId}`, JSON.stringify(cartEntity), {
      EX: 30,
    });

    return {
      message: '更新购物车成功',
      success: true,
    };
  }
}
