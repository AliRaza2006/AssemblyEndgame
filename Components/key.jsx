export function Key({name,store,bgColor})
{
    return(
        <button style={{backgroundColor:bgColor}} onClick={store}>{name}</button>
    )
}