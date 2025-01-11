import { Column } from 'typeorm';

export class Fullname {
  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'middle_name', length: 100, nullable: true })
  middleName: string;

  @Column({ name: 'last_name', length: 100, nullable: true })
  lastName: string;
}
