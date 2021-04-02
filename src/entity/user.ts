import {Entity as E, ObjectID, ObjectIdColumn, Column} from "typeorm";
import Entity from "../core/entity";

@E()
export default class User extends Entity {
    
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
}