import { Typography, Box } from "@mui/material";
import List from "../list/List";

const Table = ({ handler, list, item }) => {
   

    return (
        <>
            <Box sx={{ display: {xs:"block",sm:"flex",md:"flex"}, justifyContent: "space-evenly",width:"100%" ,}}>


                {list.map((list,tableindex) => (
                    <>
                    
                      <div key={tableindex} style={{display:"flex",flexDirection:"column",}}>
                      <Typography sx={{fontSize:"30px",fontWeight:"100"}} >{list.title}</Typography><br />
                        {list.list.map((item,listindex)=>(
                            <>

                            <List sx={{}} res={item} key={listindex} listi={listindex} tablei={tableindex} handler={handler} />

                            </>
                        ))} 
                      </div>
                                        
                    </>
                ))}

            </Box>
        </>
    )
}
export default Table;