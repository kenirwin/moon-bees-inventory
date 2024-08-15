interface Props {
    productId: string;
    productName: string;
    quantity: string;
    toOrFrom: "to" | "from";
    adjustmentQty: number; 
}

const TransferItem = ({productName, quantity, toOrFrom, adjustmentQty = 0, productId}: Props) => { 
    console.log('quantity', typeof quantity, quantity)
    console.log('adj', typeof adjustmentQty, adjustmentQty)
    const q = parseInt(quantity)
    return <div className="card">
        <h2 className="capitalize">{toOrFrom}:</h2>
        <h3>{productName}</h3>
        <p>Quantity: {quantity}</p>
        <p>New Qty after transfer: {toOrFrom == "to" ? q + adjustmentQty : q - adjustmentQty} </p>
        <input type="hidden" data-productid={productId} data-transferdirection={toOrFrom} data-newvalue={toOrFrom == "to" ? q + adjustmentQty : q - adjustmentQty}></input>
    </div>
}

export default TransferItem;