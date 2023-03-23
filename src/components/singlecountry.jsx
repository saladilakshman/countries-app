import { useParams,useNavigate} from "react-router-dom";
import MapContainer from "./google-maps";
import {countries} from "country-data";
import '../App.css';
import axios from "axios";
import React,{useEffect,useState} from "react"; 
import Loader from "../loader";
const SingleCountry=()=>{
  const[country,setCountry]=useState([]);
    const {singlecountry}=useParams();
    const[query,setQuery]=useState(singlecountry);
    const[isLoading,setIsLoading]=useState(true);
    const navigate=useNavigate();
  useEffect(()=>{
    /**Fecthing the details of the country based on useParam value */
    axios.get(`https://restcountries.com/v3.1/name/${query}`)
    .then(response=>{
      setCountry(response.data)
      setIsLoading(false)
    })
    .catch(err=>console.log(err.message))
  },[singlecountry,query]);  
return (
    <div>
      <button style={{
        margin:'3rem',
        border:'none',
        boxShadow:'0px 0px 5px rgba(0,0,0,0.5)',
        background:'white',
        color:'black',
        width:'6rem',
        height:'2rem',
        fontFamily:'helvetica',
        cursor:'pointer',
        borderRadius:'0.2rem'
      }}className="back-button"onClick={()=>navigate(-1)}>Back to home</button>
      {isLoading?<div style=
      {{display:'flex',justifyContent:'center',alignItems:'center',marginBlockStart:'8rem'}}
      ><Loader/></div>:<div className="country-details">
        {country.map((el)=>{
          const{flags,name,population,subregion,capital,tld,currencies,languages,borders,latlng,capitalInfo}=el;
          /**converting the population number into more human-readable form */
          const refinedPopulation=new Intl.NumberFormat('en-IN').format(population);
          /**Each country object varies in their properties so getting it only values */
          const native=name.nativeName
const myObj=Object.values(native);
const nativename=myObj[0].official
const currency=Object.values(currencies)[0].name
const language=Object.values(languages)
          return <div className="selected-country">
<img src={flags.png}alt=""loading="lazy"className="selected-country-image"/>
<div className="selected-country-content">
  <h1>{name.official}</h1>
  <div className="selected-country-data">
    <div>
    <p>Common name : <span>{name.common}</span></p>
    <p>nativeName : <span>{nativename}</span></p>
    <p>Population : <span>{refinedPopulation}</span></p>
    <p>Sub-region : <span>{subregion}</span></p>
    <p>Capital    : <span>{capital}</span></p>
    </div>
    <div>
      <p>Top level domain : <span>{tld}</span></p>
      <p>Currency : <span>{currency}</span></p>
      <div className="languages">
      <p>Languages:</p>
      {Array.from(language,(lang)=>{
        return <p><span>{lang}</span></p>
      })}
     </div>
    </div>
  </div>
  <div className="selected-country-borders">
    <h4 className="border-header">Border countries:</h4>
    
    { /**If the country object has borders property we want to display border-countries else none */
    el.hasOwnProperty('borders')?borders.map((btn)=>{
        return <div className="border-buttons"><button style={{
          border:'none',
          minWidth:'7rem',
          cursor:'pointer',
          boxShadow:'0px 0px 5px rgba(0,0,0,0.2)',
          color:'black',
          padding:'0.5rem',
          background:'white',
          borderRadius:'0.2rem',
          fontSize:'1rem'
        }}id="border-button"onClick={(e)=>{
         setQuery(e.target.innerText)
        }}>{countries[btn].name}</button></div>
      }):<h5 className="none">None (This is an Island country)</h5>}
    </div>
</div>
<div className="google-map">
<MapContainer countryCordinates={latlng} capitalCityCordinates={capitalInfo} className="map"/>
</div>
          </div>
        
        })}
      </div>}
    </div>
)
}
export default SingleCountry;