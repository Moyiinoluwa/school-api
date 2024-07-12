import { MessageEntity } from "src/Entity/message.entity";
import { Repository } from "typeorm";
export declare class MessageRepository extends Repository<MessageEntity> {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
}
