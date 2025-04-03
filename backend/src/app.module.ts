import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.model';
import { UserModule } from './user/user.module';
import { Tag } from './tag/models/tag,model';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards/at.guard';
import { UserFavoriteModule } from './user-favorites/user-favorites.module';
import { UserFavorite } from './user-favorites/models/user-favorite.model';
import { Termin } from './termin/models/termin.model';
import { TerminModule } from './termin/termin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [
        User,
        Tag,
        UserFavorite,
        Termin
      ],
    }),
    UserModule,
    AuthModule,
    TagModule,
    UserFavoriteModule,
    TerminModule
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}
