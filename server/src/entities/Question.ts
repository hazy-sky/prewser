import { Survey, SurveySharedUser, User } from '.';
import { PrivacyTypes } from "../enums";
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
  OneToOne,
  OneToMany,
} from "typeorm";
import SurveyShare from './SurveyShare';
import QuestionType from './QuestionType';
import Answer from './Answer';

@ObjectType()
@Entity({ name: 'questions' })
class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column()
  answer_schema: string;

  @Column()
  is_main: boolean;

  @Column()
  order: number;

  @Column()
  survey_id: number;

  @ManyToOne(() => Survey, survey => survey.questions)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column()
  type_id: number;

  @ManyToOne(() => QuestionType, questionType => questionType.questions)
  @JoinColumn({ name: 'type_id' })
  type: QuestionType;

  @Column()
  privacy_type: PrivacyTypes;

  @Column()
  draft: boolean;

  @OneToOne(() => SurveyShare, shareDetails => shareDetails.survey)
  shareDetails: SurveyShare;

  @OneToOne(() => SurveySharedUser, sharedUser => sharedUser.survey)
  sharedUsers: SurveySharedUser;
  
  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default Question;