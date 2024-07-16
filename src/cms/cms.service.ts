import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AssignmentRepository, MessageRepository } from './cms.repository';
import { MessageEntity } from 'src/Entity/message.entity';
import { UploadService } from 'src/Helpers/upload.service';
import { UpdateStudentDto } from 'src/student/student.dto';
import { StudentScoreDto } from './cms.dto';


@Injectable()
export class CmsService {
    constructor(@InjectRepository(StudentRepository) private readonly studentRepository: StudentRepository,
        @InjectRepository(TeacherRepository) private readonly teacherRepository: TeacherRepository,
        @InjectRepository(MessageRepository) private readonly messageRepository: MessageRepository,
        @InjectRepository(AssignmentRepository) private readonly assignmentRepository: AssignmentRepository,
        private uploadService: UploadService
    ) { }


    //Upload student profile picture 
    async uploadProfilePicture(id: string, file: Express.Multer.File): Promise<{ message: string }> {
        // Find student by ID
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
        }

        // Upload the file using the UploadService
        const filename = await this.uploadService.uploadFile(file);

        // Update student profile
        student.profilePicture = filename;

        // Save to database
        await this.studentRepository.save(student);

        return { message: 'Profile picture uploaded' };
    }

    //view student score
    async viewStudentScore(id: string, subject: string): Promise<number> {
        //verify student by id
        const student = await this.studentRepository.findOne({ where: { id } })
        if (!student) {
            throw new HttpException('student cannot view score', HttpStatus.NOT_FOUND)
        }

        //update score on student proifile
        const score = student.score[subject]
        if (score === undefined) {
            throw new HttpException(`Score for ${subject} not set`, HttpStatus.NOT_FOUND)
        }

        return score;
    }

    //Student can see the list of teachers and message them
    async messageTeacher(sender_id: string, reciever_id: string, message: string): Promise<{ message: string }> {
        //verify student by id
        const student = await this.studentRepository.findOne({ where: { id: sender_id } })
        if (!student) {
            throw new HttpException('student cannot text teacher', HttpStatus.NOT_FOUND)
        }

        //verify teacher by id
        const teacher = await this.teacherRepository.findOne({ where: { id: reciever_id } })
        if (!teacher) {
            throw new HttpException('teacher not permitted to text student', HttpStatus.NOT_FOUND)
        }
        //student create a message and save to database
        const text = new MessageEntity()
        text.sender_id = student.username;
        text.reciever_id = teacher.username;
        text.date = new Date();
        text.message = message;

        await this.messageRepository.save(text);

        return { message: 'Message sent to teacher' }
    }

    //Student can message each other
    async studentToStudent(sender_id: string, reciever_id: string, message: string): Promise<{ message: string }> {

        //verify sender authentication
        const student = await this.studentRepository.findOne({ where: { id: sender_id } })
        if (!student) {
            throw new HttpException('student cannot send message', HttpStatus.NOT_FOUND)
        }

        //verify reciever auth
        const aStudent = await this.studentRepository.findOne({ where: { id: reciever_id } })
        if (!aStudent) {
            throw new HttpException('student cannot recieve message', HttpStatus.NOT_FOUND)
        }

        //save message to database
        const gist = new MessageEntity()
        gist.reciever_id = aStudent.username;
        gist.sender_id = student.username;
        gist.date = new Date();
        gist.message = message;

        await this.messageRepository.save(gist)

        return { message: 'Message sent to the other student' }
    }



    //Student upload answers to assignment
    async uploadAnswer(id: string, file: Express.Multer.File): Promise<{ message: string }> {

        //verify student id
        const student = await this.studentRepository.findOne({ where: { id } })
        if (!student) {
            throw new BadRequestException('Student cannot upload assignment')
        }

        const filename = await this.uploadService.uploadFile(file)
        //upload the answer
        student.answer = filename;

        //save to database
        await this.studentRepository.save(student)

        return { message: 'Answer uploaded successfully' }
    }

    //student can download the assignment file
    //logout

    //Teacher upload profile picture
    async uploadTeacherPicture(id: string, file: Express.Multer.File): Promise<{ message: string }> {
        //verify by id
        const teacher = await this.teacherRepository.findOne({ where: { id } })
        if (!teacher) {
            throw new BadRequestException('Teacher cannot upload teacher')
        }

        //upload the picture
        const filename = await this.uploadService.uploadFile(file)

        //update teacher profile
        teacher.profilePicture = filename;

        //save to database
        await this.teacherRepository.save(teacher)

        return { message: 'Profile picture uploaded' }
    }

    //Upload assigment for student
    async uploadAssignment(teacher_id: string, student_id: string, file: Express.Multer.File): Promise<{ message: string }> {

        //check if teacher is registered
        const teacher = await this.teacherRepository.findOne({ where: { id: teacher_id } })
        if (!teacher) {
            throw new BadRequestException('teacher cannot upload assignment')
        }

        //check if student is registered
        const student = await this.studentRepository.findOne({ where: { id: student_id } })
        if (!student) {
            throw new BadRequestException('student cannot download assignment from teacher')
        }

        //upload assignment to student
        const assigment = await this.uploadService.uploadFile(file)

        //student gets the assignment
        student.assignment = assigment;

        //save to student database
        await this.studentRepository.save(student)

        return { message: 'Assignment sent to student' }
    }

    //download answer to student assignmnent

    //teacher upload each student score
    async studentScore(teacher_id: string, student_id: string, assign_id: string, dto: StudentScoreDto): Promise<{ message: string }> {
        //verify teacher by id
        const teacher = await this.teacherRepository.findOne({ where: { id: teacher_id } })
        if (!teacher) {
            throw new BadRequestException('teacher cannot send score')
        }

        //verify student by id
        const student = await this.studentRepository.findOne({ where: { id: student_id } })
        if (!student) {
            throw new BadRequestException('student cannot get score')
        }

        //get the right assignment
        const assigment = await this.assignmentRepository.findOne({ where: { id: assign_id } })
        if (!assigment) {
            throw new BadRequestException('Cannot find assignment')
        }

        //set score for assignment
        student.score = dto.score;

        return { message: 'Student score recorded' }
    }
    //edit student score
    //teacher sends mail to all student
    //teacher receives student message
    //teacher sends student 
    //send message to teacher
}

