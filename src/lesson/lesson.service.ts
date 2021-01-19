import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsInput } from './assign-students.input';

@Injectable()
export class LessonService {
  /**
   *
   * @param repository
   */
  constructor(
    @InjectRepository(Lesson)
    private repository: Repository<Lesson>,
  ) {}

  /**
   *
   */
  async fetchAll(): Promise<Lesson[]> {
    return this.repository.find();
  }

  /**
   *
   * @param id
   */
  async fetchById(id: string): Promise<Lesson> {
    return this.repository.findOne({ id });
  }

  /**
   *
   * @param name
   * @param startDate
   * @param endDate
   * @param students
   */
  async create({
    name,
    startDate,
    endDate,
    students,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = this.repository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return this.repository.save(lesson);
  }

  /**
   *
   * @param lessonId
   * @param studentIdArray
   */
  async assignStudents({
    lessonId,
    studentIdArray,
  }: AssignStudentsInput): Promise<Lesson> {
    const lesson = await this.fetchById(lessonId);

    lesson.students = [...lesson.students, ...studentIdArray];

    return this.repository.save(lesson);
  }
}
