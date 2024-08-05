import CatalogItem from './CatalogItem';

const CatalogList = ({ catalogItems }) => {
    return (
      <table>
        <thead>
            <tr><th>Name</th><th>ID</th><th>Abbrev</th><th>Quantity</th></tr>
        </thead>
        <tbody>
            {catalogItems.map((item) => (
            <CatalogItem item={item} />
            ))}
        </tbody>
      </table>
    )
  }
  export default CatalogList;

