import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssignmentEntity } from "src/Entity/assignment.entity";
import { MessageEntity } from "src/Entity/message.entity";
import {  Repository } from "typeorm";

@Injectable()
    export class MessageRepository extends Repository<MessageEntity> {
        constructor(@InjectRepository(MessageEntity) private readonly messageRepository: MessageRepository) {
            super(messageRepository.target,
                messageRepository.manager,
                messageRepository.queryRunner
            )
        }
    }

    @Injectable()
    export class AssignmentRepository extends Repository<AssignmentEntity> {
        constructor(@InjectRepository(AssignmentEntity) private readonly assignmentRepository: AssignmentRepository) {
            super(assignmentRepository.target,
                assignmentRepository.manager,
                assignmentRepository.queryRunner
            )
        }
    }