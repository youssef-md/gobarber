import {
  ObjectID,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  @Column({ default: false }) // Mongo has no migration, so need to define default value
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
