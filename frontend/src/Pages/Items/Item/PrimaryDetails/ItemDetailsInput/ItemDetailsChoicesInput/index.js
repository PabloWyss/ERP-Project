const ItemDetailsChoicesInput = ({choices}) => {
    return (
            choices?.map((choice) => (
              <option value={choice}>{choice}</option>
            ))
    )
}

export default ItemDetailsChoicesInput