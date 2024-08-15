'use client'
import {useState} from 'react'

interface Props { 
  setResults: Function,
}
const LookupField = ({setResults}: Props) => {
  const [lookupValue, setLookupValue] = useState('');
    
  const handleLookupChange = async (value) => {
      setLookupValue(value);
      let res = await fetch(`/api/catalog/search?q=${value}`);
      let json = await res.json();
      setResults(json)
      console.log('Lookup Results:', json);
  }

  return (
    <div className="lookup-form">
        <input type="text" value={lookupValue} onChange={(e => handleLookupChange(e.target.value))}></input>
    </div>
  )
}

export default LookupField