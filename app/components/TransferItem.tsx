interface Props {
    productId: string;
    productName: string;
    quantity: number;
    toOrFrom: "to" | "from";
    adjustmentQty: number; 
}

const TransferItem = ({productName, quantity, toOrFrom, adjustmentQty = 0, productId}: Props) => { 
    return <div className="card col-md-4">
        <h2 className="capitalize">{toOrFrom}:</h2>
        <h3>{productName}</h3>
        <p>Quantity: {quantity}</p>
        <p>New Qty after transfer: {toOrFrom == "to" ? quantity + adjustmentQty : quantity - adjustmentQty} </p>
        <input type="hidden" data-productid={productId} data-transferdirection={toOrFrom} data-newvalue={toOrFrom == "to" ? quantity + adjustmentQty : quantity - adjustmentQty}></input>
    </div>
}

export default TransferItem;