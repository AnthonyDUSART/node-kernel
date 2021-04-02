import Entity from "../entity";
import Constructable from '../interface/constructableinterface'
import Request from "../http/request/request";
import { Connection, EntityManager } from "typeorm";

export default abstract class EntityFactory
{
    public static instantiate(request: Request, connection: Connection, func: any, data: any)
    {
        let instance = new func();

        if(instance instanceof Entity)
        {
        }
        else if(instance instanceof Request)
        {
            instance = request;
        }
        else if(instance instanceof EntityManager)
        {
            instance = connection.createEntityManager();
        }
        else
        {
            instance = func(data);
        }

        return instance;
    }
}