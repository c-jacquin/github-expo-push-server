import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() public id: ObjectID;

  @Column({ unique: true })
  public login: string;

  @Column({ unique: true })
  public pushToken: string;

  @Column({ default: true })
  public pushEnabled: boolean;

  @Column({ default: true })
  public pushCommit: boolean;

  @Column({ default: true })
  public pushIssue: boolean;

  @Column({ default: true })
  public pushPr: boolean;
}
