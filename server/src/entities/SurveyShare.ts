import { Survey } from '.';
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
} from "typeorm";

@ObjectType()
@Entity({ name: 'survey_shares' })
class SurveyShare extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  survey_id!: number;

  @OneToOne(() => Survey, survey => survey.shareDetails)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @Column()
  uid: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

export default SurveyShare;