import * as ORM from "typeorm";
import Entity from "../core/entity";

@ORM.Entity()
export default class User extends Entity {
    
    @ORM.ObjectIdColumn()
    id: ORM.ObjectID;
    
    @ORM.Column()
    firstName: string;
    
    @ORM.Column()
    lastName: string;
    
}