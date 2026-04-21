import React, { useEffect } from 'react'
import API from "../api/api"
export default function Home() {
useEffect(function(){
async function fetechCategory() {
  try{
    const res = await API.get("category/all");
    console.log(res.data);

  }catch(error){
    console.log(error)
  }
  
}
fetechCategory()
},[]) 
  return (
    <div>
      welcome to home 
    </div>
  )
}
