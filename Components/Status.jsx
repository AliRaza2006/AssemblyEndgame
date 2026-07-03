import { getFarewellText } from "../utils/Farewell"
import { languages } from "../utils/languages"
export function Status({won,over,lastIncorrectStatus,languageIndex})
{
    if(won||over)
    {
        return(
            <div className="statusSection" style={{backgroundColor:won?"#10A95B":over?"#BA2A2A":null}}>
                <h2>{won?"You Win!":over?"Game over!":null}</h2>
                <p>{won?"Well done! 🎉":over?"You lose! Better start learning Assembly 😭":null}</p>
            </div>
        )
    }
    else if(lastIncorrectStatus)
    {
        return(
            <div className="statusSection incorrectSelection">
                <p>{getFarewellText(languages[languageIndex].name)}</p>
            </div>
        )
    }
    else
        return <div className="statusSection"></div>
}