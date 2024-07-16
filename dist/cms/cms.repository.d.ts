import { AssignmentEntity } from "src/Entity/assignment.entity";
import { MessageEntity } from "src/Entity/message.entity";
import { Repository } from "typeorm";
export declare class MessageRepository extends Repository<MessageEntity> {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
}
export declare class AssignmentRepository extends Repository<AssignmentEntity> {
    private readonly assignmentRepository;
    constructor(assignmentRepository: AssignmentRepository);
}
