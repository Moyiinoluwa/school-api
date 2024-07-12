import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageEntity } from "src/Entity/message.entity";
import { Repository } from "typeorm";

@Injectable()
    export class MessageRepository extends Repository<MessageEntity> {
        constructor(@InjectRepository(MessageEntity) private readonly messageRepository: MessageRepository) {
            super(messageRepository.target,
                messageRepository.manager,
                messageRepository.queryRunner
            )
        }
    }