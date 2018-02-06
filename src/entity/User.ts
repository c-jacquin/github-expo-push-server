import {
  Entity,
  Column,
  PrimaryColumn,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn() id: ObjectID

  @Column({ unique: true })
  login: string

  @Column({ unique: true })
  pushToken: string

  @Column({ default: true })
  pushEnabled: boolean

  @Column({ default: true })
  pushCommit: boolean

  @Column({ default: true })
  pushIssue: boolean

  @Column({ default: true })
  pushPr: boolean
}
