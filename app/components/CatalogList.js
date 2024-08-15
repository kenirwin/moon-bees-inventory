import CatalogItem from './CatalogItem';

const CatalogList = ({ catalogItems }) => {
    return (
      <table>
        <thead>
            <tr><th>Name</th><th>ID</th><th>Abbrev</th><th>Quantity</th></tr>
        </thead>
        <tbody>
            {catalogItems.map((item,index) => (
            <CatalogItem key={index} item={item} />
            ))}
        </tbody>
      </table>
    )
  }
  export default CatalogList;

