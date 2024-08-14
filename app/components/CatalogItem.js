import Link from 'next/link'
// import articleStyles from '../styles/Article.module.css'

const CatalogItem = ({ item }) => {
  return (
    // <Link href={`/article/${article.id}`}>
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.variations[0].id}</td>
        <td>{item.abbrev}</td>
        <td>{item.variations[0].quantity}</td>
      </tr>
    // </Link>
  )
}

export default CatalogItem