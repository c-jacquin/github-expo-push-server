import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn() login: string

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
