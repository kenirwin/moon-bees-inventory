import React from 'react'

interface Props {
  items: string[]
}

const LookupResults = ({items}: Props) => {
  let results = '';
  if (items.length > 0) {
    results = JSON.stringify(items)
  }
  
  return (
    <>
    <div>LookupResults</div>
    {results}
    </>

  )
}

export default LookupResults