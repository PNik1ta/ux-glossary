import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteController } from './user-favorites.controller';
import { UserFavoriteRepository } from './repositories/user-favorite.repository';
import { UserFavoriteService } from './user-favorites.service';
import { UserFavorite } from './models/user-favorite.model';

@Module({
  controllers: [UserFavoriteController],
  providers: [UserFavoriteRepository, UserFavoriteService],
  exports: [UserFavoriteRepository, UserFavoriteService],
  imports: [TypeOrmModule.forFeature([UserFavorite])],
})
export class UserFavoriteModule {}