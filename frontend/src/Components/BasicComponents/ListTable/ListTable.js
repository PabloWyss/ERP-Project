function ListTable() {

const fakeData = [
    {
        name: "Espadrilla Formentera Yellow",
        supplier: "Manifactura Castellana",
        quantity: 47,
    },
    {
        name: "Poncho Multicolor",
        supplier: "Manifactura Mexicana",
        quantity: 12,
    },
]

    return <div>
        {fakeData.map((item) => {
            return <></>
        })}
    </div>
}

export default ListTable;