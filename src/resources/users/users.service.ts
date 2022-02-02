import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async create(userDto: UserDto) {
    if (userDto.id) delete userDto.id;
    const createdUser = this.usersRepository.create(userDto);

    return (await this.usersRepository.save(createdUser)).toResponse();
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string) {
    const user = await this.usersRepository.findOne(userId);

    if (user) return user.toResponse();

    throw new NotFoundException(`User with id = ${userId} was not found`);
  }

  async update(userId: string, userDto: UserDto) {
    if (userDto.id) delete userDto.id;
    const updatedUser = await this.usersRepository.findOne(userId);

    if (updatedUser) {
      Object.assign(updatedUser, userDto);
      return await this.usersRepository.save(updatedUser);
    }

    throw new NotFoundException(`User with id = ${userId} was not found`);
  }

  async delete(userId: string) {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${userId} was not found`);
    }
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository.findOne({ login });

    if (user) return user;
  }
}
