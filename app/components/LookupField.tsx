'use client'
import {useState} from 'react'

interface Props { 
  setResults: Function
}
const LookupField = ({setResults}: Props) => {
  const [lookupValue, setLookupValue] = useState('');
    
  const handleLookupChange = async (value) => {
      setLookupValue(value);
      let res = await fetch('http://localhost:3000/api/catalog/search?q='+value);
      let json = await res.json();
      setResults(json)
      console.log('Lookup Results:', json);
  }

  return (
    <form className="lookup-form">
        <input type="text" value={lookupValue} onChange={(e => handleLookupChange(e.target.value))}></input>
    </form>
  )
}

export default LookupField