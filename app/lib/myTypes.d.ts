export type CatalogObject = {
    type?: String,
    id?: String,
    name?: String,
    varType?: String,
    varId?: String
  }

export type TransferObject = {
    fromCatalogId?: String,
    newFromQty?: String,
    toCatalogId?: String,
    newToQty?: String
}