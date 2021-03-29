import CookiesInterface from "../interface/cookiesinterface";

export default abstract class Cookie
{
    public static parseCookies(cookies?: string)
    {
        let list: CookiesInterface = {};

        if(cookies !== undefined)
        {
            for(const cookie of cookies?.split(';'))
            {
                const parts = cookie.split('=');
                const part = parts.shift();
                if(part !== undefined)
                {
                    list[part.trim()] = decodeURI(parts.join('='));
                }
            }
        }

        return list;
    }
}