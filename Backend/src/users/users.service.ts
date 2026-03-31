import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,
    ) {}

    async create(email: string, password: string) {
        const user = this.userRepo.create({ email, password });
        return this.userRepo.save(user);
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({ 
            where: { email },
        });
    }

    async findById(id: string) {
        return this.userRepo.findOne({ 
            where: { id },
        });
    }
}
