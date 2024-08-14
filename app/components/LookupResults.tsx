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
  setSelectedItem: Function
}

const LookupResults = ({items, setSelectedItem}: Props) => {
  // let results = '';
  // if (items.length > 0) {
  //   results = JSON.stringify(items)
  // }
  
  return (
    <>
    {items.map((item, index) => {
      return <div className={styles.item} onClick={setSelectedItem(item)}>{item.name}</div>
    })}
    </>

  )
}

export default LookupResults