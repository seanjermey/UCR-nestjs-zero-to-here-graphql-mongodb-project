import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Student)
    private repository: Repository<Student>,
  ) {}

  /**
   *
   */
  fetchAll(): Promise<Student[]> {
    return this.repository.find();
  }

  /**
   *
   * @param id
   */
  fetchById(id: string): Promise<Student> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param idArray
   */
  fetchByIds(idArray: string[]): Promise<Student[]> {
    return this.repository.find({
      where: {
        id: {
          $in: idArray,
        },
      },
    });
  }

  /**
   *
   * @param firstName
   * @param lastName
   */
  create({ firstName, lastName }: CreateStudentInput): Promise<Student> {
    const student = this.repository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.repository.save(student);
  }
}
