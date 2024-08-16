interface Props {
  quantity?: number;
  max?: number;
  onChangeNumber: React.ChangeEventHandler<HTMLInputElement>;
}

const TransferAmount = ({ quantity, max, onChangeNumber }: Props) => {
  let input;
  if (max) {
    input = (
      <input
        type="number"
        min="1"
        name="transferQty"
        id="transferQty"
        step="any"
        max={max}
        onChange={onChangeNumber}
      />
    );
  } else {
    input = (
      <input
        type="number"
        min="1"
        name="transferQty"
        id="transferQty"
        step="any"
        onChange={onChangeNumber}
      />
    );
  }
  return (
    <>
      <div className="col-md-3">
        <label htmlFor="transferQty">Quantity to Transfer</label>
        <br />
        {input}
      </div>
    </>
  );
};

export default TransferAmount;
