import { ImageListItem } from '@mui/material'
import { Link } from '@mui/material'
import { Avatar } from '@mui/material'
import { ImageListItemBar } from '@mui/material'
import { ImageList } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const Photo = ({
    urls:{regular},
    alt_description,
    likes,
    user:{
        name,
        portfolio_url,
        profile_image:{medium}
    },
}) =>{
    // const {focus,setFocus} = useState(false)
    return (
        <ImageList sx={{width:500,height:250}}>
            <ImageListItem >
                <img
                    src={`${regular}?w=248&fit=crop&auto=format`}
                    style={{width:250,height:150}}
                    srcSet={`${regular}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={alt_description}
                    loading="lazy"
                    // onMouseEnter={setFocus(true)}
                    // onMouseLeave={setFocus(false)}
                />
                <ImageListItemBar
            title={name}
            // sx={{display:!focus?"none":"block"}}
            subtitle={likes}
            actionIcon={
                <Link href={portfolio_url} underline="none">
                <Avatar alt="" src={medium}/>
                </Link>
            }
          />
            </ImageListItem>
        </ImageList>
    )
}
export default Photo;