import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from 'src/student/student.repository';
import { StudentViewScoreDto } from './cms.dto';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { MessageRepository } from './cms.repository';
import { MessageEntity } from 'src/Entity/message.entity';

@Injectable()
export class CmsService {
    constructor(@InjectRepository(StudentRepository) private readonly studentRepository: StudentRepository,
                @InjectRepository(TeacherRepository) private readonly teacherRepository: TeacherRepository,
                @InjectRepository(MessageRepository) private readonly messageRepository: MessageRepository
) {} 


    //upload student profile picture 
    async uploadProfilePicture(id: string, filename: string, ): Promise<{ message: string}> {
        //find student by id
        const student = await this.studentRepository.findOne({ where: { id }})
        if(!student) {
            throw new HttpException('student not found', HttpStatus.NOT_FOUND)
        }

        //update student profile
        student.profilePicture = filename;

        //save to database
        await this.studentRepository.save(student);

        return { message: 'Profile picture uploaded'}
    }

    //view student score
    async viewStudentScore(id: string, subject: string ): Promise<number> {
        //verify student by id
        const student = await this.studentRepository.findOne({ where: { id }})
        if(!student) {
            throw new HttpException('student cannot view score', HttpStatus.NOT_FOUND)
        }

        //update score on student proifile
        const score = student.score[subject]
        if(score === undefined ) {
            throw new HttpException(`Score for ${subject} not set`, HttpStatus.NOT_FOUND)
        }

        return score;
    }

    //student can see the list of teachers and message them
    async messageTeacher(id: string ): Promise<{ message: string }> {
        //verify student by id
        const student = await this.studentRepository.findOne({ where: { id }})
        if(!student) {
            throw new HttpException('student cannot text teacher', HttpStatus.NOT_FOUND)
        }
        
    //verify teacher by id
    const teacher = await this.teacherRepository.findOne({ where: { id }})
    if(!teacher) {
        throw new HttpException('teacher not permitted to text student', HttpStatus.NOT_FOUND)
    }
    //student create a message and save to database
    const text = new MessageEntity()
    
        return
    }

    //student can message each other
    //student can download the assignment file
    //student upload answers to assignment
    //
}
