import { blue } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import {styled} from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Photo from "./Photo";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from "@mui/material";
import { Button } from '@mui/material';
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { FilledInput } from "@mui/material";
import { style } from "@mui/system";
import { InputBase } from "@mui/material";


const clientID = `?client_id=${"0za8tBtDEgFkTqoKPZfEgLt63Hh6hGLMtGBnET-yUgM"}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading,setLoading] = useState(false);
  const [photos,setPhotos] = useState([])
  const[page,setPage] = useState(1)
  const [query,setQuery] = useState("")
  const [focus,setFocus] = useState(false)
  const mounted = useRef(false);
  const input =useRef(null);
  const [newImages,setNewImages] = useState(false)
  const fetchImages = async () =>{
    setLoading(true);
    let url;
    const urlPage = `&page = ${page}`;
    const urlQuery = `&query=${query}`;
    if(query){
      url=`${searchUrl}${clientID}${urlPage}${urlQuery}`
    }else{
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try{
      const res = await fetch(url)
      const data = await res.json();
      console.log(data)
      setPhotos((oldPhotos)=>{
        if(query && page === 1){
          return data.results;
        }else if(query){
          return [...oldPhotos,...data.results]
        }else{
          return[...oldPhotos,...data];
        }
      });
      setNewImages(false)
      setLoading(false)
    }catch(error){
      setNewImages(false);
      setLoading(false)
    }
  }

useEffect(()=>{
  fetchImages();
},[page]);

useEffect(()=>{
  if(!mounted.current){
    mounted.current = true;
    return;
  }
  if(!newImages)return;
  if(loading)return;
  setPage((oldPage)=>oldPage+1)
},[newImages]);

//try using useFetch

const event = () =>{
  if(window.innerHeight +window.scrollY >=document.body.scrollHeight-2)
  setNewImages(true)
}

useEffect(()=>{
  window.addEventListener('scroll',event);
  return ()=> window.removeEventListener('scroll',event);
},[]);


  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!query)return;
    if(page === 1){
      fetchImages();
    }
    setPage(1);
  } 

  const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      backgroundColor: red[500],
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: blue[500],
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  }));

  return (
   <Root>
     <Container>
       <Box autocomplete="off">
       <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '55ch' }}>
         <InputLabel>Search</InputLabel>
          <Input
          // how to aviod multiple rerenders and the usage of keys
            autoFocus={!focus?"true":"false"}
            onClick={()=>{setFocus(focus)}}
            style={{textDecoration:"none"}}
            // inputRef={input}
        value={query}
            onChange={(e) =>setQuery(e.target.value)}
            
            endAdornment={<InputAdornment position="end">
              <Button onClick={handleSubmit}>
                <SearchIcon />
              </Button>
            </InputAdornment>}
          />
        </FormControl>
        </Box>

        <Grid container spacing={{xs:8,md:3 ,sm:10}}  columns={{ xs: 4, sm: 8, md: 8 }} >
        {photos.map((image,index)=>{
          return(
            <Grid item xs={2} sm={4} md={2} key={index}>
            <Photo key={index} {...image}/>
            </Grid>)
        })}
        </Grid>
       {loading && <Typography variant="h2">Loading...</Typography>}
     </Container>
      </Root>
  );
}

export default App;
