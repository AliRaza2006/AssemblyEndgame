export function Alphabet({alphhabet,unguessedLettersCondition})
{
    return(
        <span style={{backgroundColor:unguessedLettersCondition?"#EC5D49":"#323232"}} className="alphabet">{alphhabet}</span>
    )
}