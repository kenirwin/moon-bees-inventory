export type BootstrapAlertColors = 'info' | 'success' | 'warning' | 'danger'

export type Message = { 
    color: BootstrapAlertColors,
    children: React.ReactNode,
    dismissible?: Boolean,
    onClose?: MouseEventHandler<HTMLButtonElement>
}

export type CatalogObject = {
    type?: String | undefined,
    id?: String | undefined,
    name?: String | undefined,
    varType?: String | undefined,
    varId?: String | undefined
  }

export type TransferObject = {
    fromCatalogId?: String | undefined,
    newFromQty?: String | undefined,
    toCatalogId?: String | undefined,
    newToQty?: String | undefined
}