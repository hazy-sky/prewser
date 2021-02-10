import { QuestionTypes } from "../enums";
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Question } from ".";

@ObjectType()
@Entity({ name: 'question_types' })
class QuestionType extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: QuestionTypes;

  @Column()
  schema: string;

  @Column()
  validations: string;

  @OneToMany(() => Question, question => question.type)
  questions: Question[];
}

export default QuestionType;