import Entity from "../entity";
import Constructable from '../interface/constructableinterface'
import Request from "../http/request/request";

export default abstract class EntityFactory
{
    public static instantiate(func: any, data: any)
    {
        let instance = new func();

        if(instance instanceof Entity)
        {
        }
        else if(instance instanceof Request)
        {
            instance = data;
        }
        else
        {
            instance = func(data);
        }

        return instance;
    }
}