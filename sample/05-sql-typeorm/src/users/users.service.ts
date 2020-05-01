import {Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './user.entity';
import {UserRepository} from './user.repository';
import {getRepositoryToken} from '@nestjs/typeorm';
import {CONNECTION_NAME} from '../connection';

@Injectable()
export class UsersService {
    constructor(
        // @Inject('xxx_UserRepository')
        @Inject(getRepositoryToken(UserRepository, CONNECTION_NAME))
        private readonly usersRepository: UserRepository,
    ) {
        // this should log 1 for the right repository instance being injected.
        // however, it returns undefined
        console.log(this.usersRepository.test);
    }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

}
