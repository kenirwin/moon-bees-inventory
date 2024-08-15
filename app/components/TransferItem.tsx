interface Props {
    productId: String | undefined;
    productName: String | undefined;
    quantity: string | undefined;
    toOrFrom: "to" | "from" ;
    adjustmentQty: number; 
}

const TransferItem = ({productName, quantity, toOrFrom, adjustmentQty = 0, productId}: Props) => { 
    // console.log('quantity', typeof quantity, quantity)
    // console.log('adj', typeof adjustmentQty, adjustmentQty)
    let q = 0;
    if (quantity) {
     q = parseInt(quantity)
    }
    
    return <div className="card mt-3">
        <h2 className="capitalize">{toOrFrom}:</h2>
        <h3>{productName}</h3>
        <p>Quantity: {quantity}</p>
        <p>New Qty after transfer: {toOrFrom == "to" ? q + adjustmentQty : q - adjustmentQty} </p>
        <input type="hidden" data-productid={productId} data-transferdirection={toOrFrom} data-newvalue={toOrFrom == "to" ? q + adjustmentQty : q - adjustmentQty}></input>
    </div>
}

export default TransferItem;