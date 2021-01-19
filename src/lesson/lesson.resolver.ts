import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './create-lesson.input';
import { AssignStudentsInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  /**
   *
   * @param id
   */
  @Query(returns => [LessonType])
  lessons() {
    return this.lessonService.fetchAll();
  }

  /**
   *
   * @param id
   */
  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.fetchById(id);
  }

  /**
   *
   * @param lessonInput
   */
  @Mutation(returns => LessonType)
  createLesson(@Args('lesson') lessonInput: CreateLessonInput) {
    return this.lessonService.create(lessonInput);
  }

  /**
   *
   * @param lessonId
   * @param studentIdArray
   */
  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsInput') assignStudentsInput: AssignStudentsInput,
  ) {
    return this.lessonService.assignStudents(assignStudentsInput);
  }

  /**
   *
   * @param lesson
   */
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.fetchByIds(lesson.students);
  }
}
