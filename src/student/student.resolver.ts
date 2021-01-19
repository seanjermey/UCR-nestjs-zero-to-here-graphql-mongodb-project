import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  /**
   *
   * @param id
   */
  @Query(returns => [StudentType])
  students() {
    return this.studentService.fetchAll();
  }

  /**
   *
   * @param id
   */
  @Query(returns => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.fetchById(id);
  }

  /**
   *
   * @param studentInput
   */
  @Mutation(returns => StudentType)
  createStudent(@Args('student') studentInput: CreateStudentInput) {
    return this.studentService.create(studentInput);
  }
}
