import style from "./list.module.css"
const List=({res,tablei,listi,handler})=>{
    console.log(res.listdata,'////////////////////////////////////////////////////')
    return(
<>
<li className={style.list} onClick={() => handler(tablei,listi)}>{res.listdata}</li>

</>
    )
}
export default List;