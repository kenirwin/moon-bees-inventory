export type CatalogObject = {
    type?: String,
    id?: String,
    name?: String,
    varType?: String,
    varId?: String
  }

export type TransferObject = {
    fromCatalogId?: String | undefined,
    newFromQty?: String | undefined,
    toCatalogId?: String | undefined,
    newToQty?: String | undefined
}