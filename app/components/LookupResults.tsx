import React from 'react'
import styles from './LookupResults.module.css'
import { CatalogObject } from '../lib/myTypes'

// type catalogObject = {
//   type: String,
//   id: String,
//   name: String,
//   varType: String,
//   varId: String
// }

interface Props {
  items: CatalogObject[],
  setSelectedItem: Function,
  setStartingQty: Function
}

const LookupResults = ({items, setSelectedItem, setStartingQty}: Props) => {
  const handleSelection =  (item) => {
    setSelectedItem(item); 
    console.log('selected',item.name);

    fetch(`/api/inventory/${item.varId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data');
        }
        return response.json();
      })
      .then((inventory) => {
        console.log('starting quantity:', inventory.quantity)
        setStartingQty(inventory.quantity)
      })
  }
  
  return (
    <>
    {items.map((item, index) => {
      // This version works but can't be expanded easily; replace with another function
      // return <div className={styles.item} onClick={() => {setSelectedItem(item); console.log('selected',item.name);} }>{item.name}</div>
      return <div key={index} className={styles.item} onClick={() => {handleSelection(item); } }>{item.name}</div>
    })}
    </>

  )
}

export default LookupResults