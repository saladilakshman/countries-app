import axios from "axios";
import Loader from "../loader";
import {FaSearch,FaArrowUp,FaSun,FaMoon} from "react-icons/fa";
import React,{useState,useEffect}from "react";
import {NavLink} from "react-router-dom";
import '../App.css';
function AllCountries() {
  const regions=['Africa','Americas','Asia','Europe','Oceania'];
  const[loading,setLoading]=useState(true);
  const[responseData,setResponseData]=useState([]);
  const[dummyData,setDummyData]=useState([]);
  const[visible,setVisible]=useState(false);
  const[mode,setMode]=useState(false);
  useEffect(()=>{
    //fetching  all countries API data
  axios.get('https://restcountries.com/v3.1/all')
    .then(response=>{
      setLoading(false)
      setResponseData(response.data)
      setDummyData(response.data)

    }).catch(err=>console.log(err))
    //To remove the first element from select tag when user selecting values
    const reg=document.getElementById('country');
    reg.children[0].style.display="none";
  },[])
  window.onscroll=()=>{
    if(document.documentElement.scrollTop>0){
      return setVisible(true)
           }
           else if(document.documentElement.scrollTop===0){
             return setVisible(prevState=>!prevState)
           }
  }
  
  //filtering the countries based on user selection
  const regionSelection=()=>{
    const reg=document.getElementById('country');
    const filteredData=dummyData.filter((item)=>item.region===reg.value);
    setResponseData(filteredData);
  }
  //filtering the country based on search input
  const searchingCountry=()=>{
const search=document.querySelector('.search-input');
/**if user clicked the search icon without entering the value need to display an alert box */
if(search.value===""){
  window.alert('please enter your value')
}
else{
  const enteredText=search.value.split("");
  const firstLetter=enteredText[0].toUpperCase();
  enteredText[0]=firstLetter;
  const refinedText=enteredText.join("");
  const individualCountry=dummyData.filter((count)=>count.name.common===refinedText);
  setResponseData(individualCountry)
}
  }
  //Implementing dark mode and light mode switch
  const modeChange=()=>{
    const datacard=document.querySelectorAll('.card');
    setMode(prevState=>!prevState)
if(!mode){
document.body.style.backgroundColor="#011502";
document.body.style.color="white";
for(const dtc of datacard){
 dtc.style.border="2px solid white";     
}
}
else{
  document.body.style.backgroundColor="white";
  document.body.style.color="black";
}
  }
  return (
    
    <div className="App">
      <header className="App-header">
<h3 style={{fontWeight:'700'}}>Where in the world?</h3>
<div onClick={modeChange}style={{cursor:'pointer'}}>{mode?<p style={{display:'flex',gap:'0.2rem'}}><FaSun/>Light mode</p>:<p style={{display:'flex',gap:'0.2rem'}}><FaMoon/>Dark Mode</p>}</div>
      </header>
      {visible &&<div className="scroll-box"onClick={()=>{
        window.scrollTo({top:0,behavior:'smooth'})
      }}><FaArrowUp id="arrow"/></div>}
      <main>
        <div className="search-box">
          <div style={{position:'relative'}}>
            <FaSearch style={{zIndex:1,position:'absolute',margin:'0.5rem'}} onClick={searchingCountry}/>
          <input type="search"placeholder="search for a country..."className="search-input"spellCheck/>
          </div>
<select id="country"name="country"onChange={regionSelection}>
<option value="select region">Filter by region</option>
 {regions.map((region,index)=>{
  return (
  <option key={index} value={region}>{region}</option>
  )
 })}
</select>
        </div>
<div style={{marginBlockStart:'8rem',padding:'1rem'}}>
        {loading?<div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center'}}><Loader/></div>:
        <div style={{display:'flex',justifyContent:'center',alinItems:'center'}}>
        <div className="countries">
          {responseData.map((data,index)=>{
            const{name,capital,region,population,flags}=data;
            /**converting the population number to more readable form */
            const formatedPopulationNumber=new Intl.NumberFormat('en-IN').format(population);
            return<div key={index}className="card">
              <img src={flags.png}alt=""loading="lazy"className="country-flag"/>
              <div style={{display:'inline',
            marginLeft:''}}>
              <h4 style={{textAlign:'center'}}>{name.official}</h4>
              <p>Common Name: {name.common}</p>
              <p>Population: {formatedPopulationNumber}</p>
              <p>Region: {region}</p>
              <p>Capital: {capital}</p>
              </div>
              <NavLink to={`/${name.common}`}style={{textDecoration:'none'}}><button style={{
                display:'block',
                margin:'auto',
                marginBlockStart:'3rem',
                cursor:'pointer',
                width:'5rem',
                border:'none',
                backgroundColor:'#EB5E55',
                padding:'0.5rem',
                borderRadius:'0.2rem',
                color:'white'
              }}>View more</button></NavLink>
            </div>
          })}
          </div>
          </div>}
      </div>
      </main>
    </div>
    
  );
}

export default AllCountries;
