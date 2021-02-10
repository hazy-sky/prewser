import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Question } from ".";

@ObjectType()
@Entity({ name: 'answers' })
class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  answer!: string;

  @Column()
  text: string;

  @Column()
  question_id: number;

  @ManyToOne(() => Question, question => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Answer;