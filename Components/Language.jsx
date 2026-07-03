export function Language({name,bgColor,color,isDead})
{
    return(
        <span className={`language ${isDead?"lost":""}`} style={{backgroundColor:bgColor,color:color}}>{name}</span>
    )
}