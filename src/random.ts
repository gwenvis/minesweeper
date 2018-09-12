
const randomjs = require("random-js")();

export class RandomGenerator
{
    public static Range(min:number, max:number):number
    {
        if(min > max) throw new RangeError("min cannot be higher than max");

        //@ts-ignore
        return randomjs.real(min, max, true);
    }

    public static RangeInt(min:number, max:number):number
    {
        if(min > max) throw new RangeError("min cannot be higher than max");

        return Math.round(this.Range(min,max));
    }
}