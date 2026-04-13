import { JwtService } from "@nestjs/jwt";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TasksService } from "src/tasks/tasks.service";

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})
export class TasksGateway {
    constructor(
        private tasksService: TasksService,

        private jwtService: JwtService,
    ) {}
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token;

            if (token) {
                client.disconnect();
                return;
            }

            const payload = this.jwtService.verify(token);
            
            client.data.user = payload;

            console.log(`User connected: ${payload.email}`);
        } catch (error) {
            client.disconnect();
        }
    }
    
    @SubscribeMessage("JoinBoard")
    handleJoin(client: Socket, boardId: string) {
        if (!client.data.user) {
            client.disconnect();
            return;
        }

        client.join(boardId);
        console.log(`User joined board ${boardId}`);
    }

    @SubscribeMessage("moveTask")
    async handleMove(
        client: Socket,
        payload: {
            boardId: string;
            taskId: string;
            toColumnId: string;
            newOrder: number;
        },
    )   {
        await this.tasksService.moveTask(payload, client.data.user.userId);

        client.to(payload.boardId).emit('taskMove', payload)
    }
}