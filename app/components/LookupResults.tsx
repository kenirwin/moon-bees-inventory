import React from 'react';
import styles from './LookupResults.module.css';
import { CatalogObject } from '../lib/myTypes';

// type catalogObject = {
//   type: String,
//   id: String,
//   name: String,
//   varType: String,
//   varId: String
// }

interface Props {
  items: CatalogObject[];
  setSelectedItem: Function;
  setStartingQty: Function;
  setResultsVisibility: Function;
  show: Boolean;
}

const LookupResults = ({
  items,
  setSelectedItem,
  setStartingQty,
  setResultsVisibility,
  show,
}: Props) => {
  const handleAction = (item) => (event) => {
    // Check if the event is a click or if the Enter key was pressed
    if (event.type === 'click' || event.key === 'Enter') {
      setSelectedItem(item);
      setResultsVisibility(false);
      console.log('selected', item.name);

      fetch(`/api/inventory/${item.varId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch inventory data');
          }
          return response.json();
        })
        .then((inventory) => {
          console.log('starting quantity:', inventory.quantity);
          setStartingQty(inventory.quantity);
        });
    }
  };

  if (typeof items == 'string') {
    // I don't know why, but this correctly detects an empty items array were length == 0 did not
    return <></>;
  } else {
    return (
      <>
        {show &&
          items?.map((item, index) => {
            // This version works but can't be expanded easily; replace with another function
            // return <div className={styles.item} onClick={() => {setSelectedItem(item); console.log('selected',item.name);} }>{item.name}</div>
            return (
              <div
                key={index}
                tabIndex={0}
                role={'button'}
                className={styles.item}
                onKeyDown={handleAction(item)}
                onClick={handleAction(item)}
              >
                {item.name}
              </div>
            );
          })}
      </>
    );
  }
};

export default LookupResults;
