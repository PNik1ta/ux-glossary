import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminController } from './termin.controller';
import { TerminRepository } from './repositories/termin.repository';
import { TerminService } from './termin.service';
import { Termin } from './models/termin.model';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [TerminController],
  providers: [TerminRepository, TerminService],
  exports: [TerminRepository, TerminService],
  imports: [TypeOrmModule.forFeature([Termin]), UserModule],
})
export class TerminModule {}