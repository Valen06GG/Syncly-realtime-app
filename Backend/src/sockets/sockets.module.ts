import { Module } from '@nestjs/common';
import { TasksGateway } from './tasks.gateway';
import { TasksModule } from 'src/tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TasksModule, JwtModule],
    providers: [TasksGateway],
})
export class SocketsModule {}
