
export default function CatalogAddForm () {
return (<form id="add-catalog-item">
    <input type="text" name="name" placeholder="Item Name"></input>
    <input type="text" name="abbrev" placeholder="Item Abbrev"></input>
    <input type="text" name="varAbbrev" placeholder="Variation Abbrev"></input>
    <input type="text" name="varName" placeholder="Variation Name"></input>
    <input type="text" name="varPrice" placeholder="Price"></input>
    <input type="submit" />
</form>)
}