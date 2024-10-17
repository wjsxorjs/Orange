import { TableCell, TableRow } from '@mui/material';
import React from 'react'

export default function PostImg(props) {
    const postimg = props.postimg;
    const handleOpen = props.handleOpen;
    console.log(postimg);

    return (
        <TableRow>
            <TableCell className="td postimg" >
            {postimg.map((pivo,index)=>{
                return(
                    <img key={index} src={`${pivo.imgurl}`} onClick={()=>handleOpen(`${pivo.imgurl}`)}/>
            )})}
            </TableCell>
        </TableRow>
    )
}
