import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {UserRepository} from './user.repository';
import {CONNECTION_NAME} from '../connection';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, User], CONNECTION_NAME)],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
