import { useRef } from "react";
import { useState } from "react";
import Photo from "./Photo";


const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading,setLoading] = useState(false);
  const [photos,setPhotos] = useState([])
  const[page,setPage] = useState(1)
  const [query,setQuery] = useState("")
  const mounted = useRef(false);
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



  return (
    <div className="">
      <Photo/>
    </div>
  );
}

export default App;
