'use server'

import CatalogList from "../components/CatalogList";
import CatalogAddForm from "../components/CatalogAddForm";


async function getCatalog() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/catalog`, { cache: 'no-store' })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch catalog data')
    }
    
    return res.json() 
  }

  async function getInventory() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/inventory`, { cache: 'no-store' })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch inventory data')
    }
    
    return await res.json() 
  }

  function addCountsToCatalog(catalogItems,inventory) {
    return catalogItems.map(item => {
        const varId = item.variations[0].id; 
        const matches = inventory.filter(inv => inv.catalogObjectId == varId);
        if (matches.length > 0) {
          item.variations[0].quantity = Number(matches[0].quantity);
        } else {
          item.variations[0].quantity = 0;
        }
      })
    }

export default async function Catalog() {
    // const catalog = await fetch('http://localhost:3000/api/catalog');
    const catalogItems = await getCatalog();
    const inventory = await getInventory();
    const catalogWithInventory = addCountsToCatalog(catalogItems,inventory.counts);
    return (<>
    <h1>Product Catalog</h1>
    {/* <CatalogAddForm></CatalogAddForm> */}
    <CatalogList catalogItems={catalogItems} counts={inventory.counts}></CatalogList>
    <h2 className="mt-4">catalogItems - Length: { catalogItems.length } </h2>
    <pre>
    {JSON.stringify(catalogItems,null,2)}
    </pre>
    <h2>inventory.counts</h2>
    <pre>
        {JSON.stringify(inventory.counts, null,2)}
    </pre>
    </>)
}
