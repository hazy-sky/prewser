import { Survey, User } from '.';
import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  Unique,
  ManyToOne,
} from "typeorm";

@ObjectType()
@Entity({ name: 'survey_shared_users' })
@Unique(['survey_id', 'email'])
class SurveySharedUser extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  survey_id!: number;

  @OneToOne(() => Survey, survey => survey.sharedUsers)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column()
  uid: string;

  @Column()
  email: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User, user => user.surveyShares)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default SurveySharedUser;