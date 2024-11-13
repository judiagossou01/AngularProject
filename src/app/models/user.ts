import { v4 as uuidv4 } from 'uuid';

export class User {
    id!: number;
    uuid!: string;
    firstname: string;
    lastname: string;
    email!: string;
    password: string;

    constructor(
        id: number,
        firstname: string,
        lastname: string,
        email: string,
        password: string,
    ) {
        this.id = id;
        this.uuid = uuidv4();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

