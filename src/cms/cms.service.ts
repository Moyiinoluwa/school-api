import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from 'src/student/student.repository';
import { TeacherRepository } from 'src/teacher/teacher.repository';
import { AssignmentRepository, MessageRepository } from './cms.repository';
import { MessageEntity } from 'src/Entity/message.entity';
import { UploadService } from 'src/Helpers/upload.service';
import { SendEmailTeacher, SendMailToStudent, StudentScoreDto } from './cms.dto';
import { AssignmentEntity } from 'src/Entity/assignment.entity';
import { StudentEntity } from 'src/Entity/student.entity';
import { TeacherEntity } from 'src/Entity/teacher.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { Mailer } from 'src/Mailer/mailer.service';


@Injectable()
export class CmsService {
    constructor(@InjectRepository(StudentRepository) private readonly studentRepository: StudentRepository,
        @InjectRepository(TeacherRepository) private readonly teacherRepository: TeacherRepository,
        @InjectRepository(MessageRepository) private readonly messageRepository: MessageRepository,
        @InjectRepository(AssignmentRepository) private readonly assignmentRepository: AssignmentRepository,
        @InjectRepository(AdminRepository) private readonly adminRepository: AdminRepository,
        private uploadService: UploadService,
        private mailer: Mailer
    ) { }

    //STUDENT

    //Upload student profile picture 
    async uploadProfilePicture(id: number, file: Express.Multer.File): Promise<{ message: string }> {
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
    async viewStudentScore(id: number, subject: string): Promise<number> {
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
    async messageTeacher(sender_id: number, reciever_id: number, message: string): Promise<{ message: string }> {
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
        text.senderId = student.id
        text.receiverId = teacher.id;
        text.date = new Date();
        text.message = message;

        await this.messageRepository.save(text);

        return { message: 'Message sent to teacher' }
    }

    //Student can message each other
    async studentToStudent(sender_id: number, reciever_id: number, message: string): Promise<{ message: string }> {

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
        gist.receiverId = aStudent.id;
        gist.senderId = student.id;
        gist.date = new Date();
        gist.message = message;

        await this.messageRepository.save(gist)

        return { message: 'Message sent to the other student' }
    }


    //Student upload answers to assignment
    async uploadAnswer(id: number, file: Express.Multer.File): Promise<{ message: string }> {

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

    //TEACHER

    //Teacher upload profile picture
    async uploadTeacherPicture(id: number, file: Express.Multer.File): Promise<{ message: string }> {
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
    async uploadAssignment(teacher_id: number, student_id: number, file: Express.Multer.File): Promise<{ message: string }> {

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
        const assignmentFile = await this.uploadService.uploadFile(file)

        // Create new assignment entity
        const assignment = new AssignmentEntity();
        assignment.studentId = student.id;
        assignment.teacherId = teacher.id;
        assignment.subject = 'Subject Name';
        assignment.assignment = assignmentFile;
        assignment.date = new Date();

        // Save assignment to the database
        await this.assignmentRepository.save(assignment);

        return { message: 'Assignment sent to student' }
        //the assignment filename is not saving to the assignment table
    }

    //download answer to student assignmnent

    //teacher upload each student score
    async studentScore(teacher_id: number, student_id: number, assign_id: number, dto: StudentScoreDto): Promise<{ message: string }> {
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
        assigment.score = dto.score;
        assigment.subject = dto.subject

        //save to assignment database
        await this.assignmentRepository.save(assigment)

        return { message: 'Student score recorded' }
    }
    //edit student score
    async editScore(studentId: number, teacherid: number, assigmentId: number, dto: StudentScoreDto): Promise<{ message: string }> {
        //find the student that 
        const student = await this.studentRepository.findOne({ where: { id: studentId } })
        if (!student) {
            throw new BadRequestException('Cannot edit student score ')
        }

        //the teacher that wants to edit a student score
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherid } })
        if (!teacher) {
            throw new BadRequestException('Teacher cannot edit student score')
        }

        //find the assignment that the teacher wants to edit the student score
        const assign = await this.assignmentRepository.findOne({ where: { id: assigmentId } })
        if (!assign) {
            throw new BadRequestException('cannot locate this assignment')
        }

        //edit score
        student.score = dto.score

        await this.assignmentRepository.save(assign)

        return { message: 'Student score edited' }
    }

    //teacher sends student 
    async messageStudent(teacherId: number, studentId: number, message: string): Promise<{ message: string }> {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } })
        if (!teacher) {
            throw new BadRequestException('teacher cannot message student')
        }

        //student to recieve the message
        const student = await this.studentRepository.findOne({ where: { id: studentId } })
        if (!student) {
            throw new BadRequestException('Student cannot receive message from teacher')
        }

        //create new message
        const msg = new MessageEntity()
        msg.senderId = teacher.id
        msg.receiverId = student.id
        msg.message = message;
        msg.date = new Date();

        //save to table
        await this.messageRepository.save(msg)

        return { message: 'Sent to student' }
    }

    //send message to teacher
    async teacherToTeacher(teacherId: number, teaacherId: number, message: string): Promise<{ message: string }> {
        const teacher = await this.teacherRepository.findOne({ where: { id: teacherId } })
        if (!teacher) {
            throw new BadRequestException('Not teacher')
        }
        //teacher to receive the message
        const teaccher = await this.teacherRepository.findOne({ where: { id: teaacherId } })
        if (!teaccher) {
            throw new BadRequestException('teacher not allowed to recieve message')
        }

        //send the message
        const msgg = new MessageEntity()
        msgg.senderId = teacherId;
        msgg.receiverId = teaacherId;
        msgg.message = message;
        msgg.date = new Date();

        await this.messageRepository.save(msgg);

        return { message: 'message sent to teacher' }
    }

    //ADMIN
    //Get all student
    async getStudent(): Promise<StudentEntity[]> {
        const student = await this.studentRepository.find()
        return student;
    }

    //Get all teachers
    async getTeacher(): Promise<TeacherEntity[]> {
        const teacher = await this.teacherRepository.find()
        return teacher;
    }

    //Delete teacher's account
    async deleteTeacher(id: number): Promise<{ message: string }> {
        const teacher = await this.teacherRepository.findOne({ where: { id } })
        if (!teacher) {
            throw new BadRequestException('admin cannot delete teacher')
        }

        await this.teacherRepository.remove(teacher)

        return { message: 'teacher account deleted' }
    }

    //Delete student account
    async deleteStudent(id: number): Promise<{ message: string }> {
        const student = await this.studentRepository.findOne({ where: { id } })
        if (!student) {
            throw new BadRequestException('Admin cannot delete student')
        }

        await this.studentRepository.remove(student)

        return { message: 'student account deleted' }
    }

    //Send mails to students
    async sendMailToStudent(id: number): Promise<{ message: string }> {
        //check if the admin is registered
        const admin = await this.adminRepository.findOne({ where: { id } })
        if (!admin) {
            throw new BadRequestException('admin cannot send email to student')
        }

        //check if there are registered student
        const students = await this.studentRepository.find()
        if (!students.length) {
            throw new BadRequestException('there are no student')
        }

        // Send mail to all registered students
        const sendMailPromises = students.map(async (student) => {
            await this.mailer.adminToStudent(student.email, student.username );
        });

        await Promise.all(sendMailPromises);

        return { message: 'email sent to student' }
    }


    //Send mail to teachers
    async sendMailToTeachers(id: number ): Promise<{ message: string}> {
        const admin = await this.adminRepository.findOne({ where: {id}})
        if(!admin) {
            throw new BadRequestException('admin cannot send mail to teachers')
        }

        //get all teachers
        const teachers = await this.teacherRepository.find()
        if(!teachers.length) {
            throw new BadRequestException('theres are no registered teachers')
        }

        //send mail 
        const sendMail = teachers.map(async (teacher) => {
            await this.mailer.adminToTeachers(teacher.email, teacher.username)
        });

        await Promise.all(sendMail)

        return { message: 'Mail sent to teachers'}
    }
} 

