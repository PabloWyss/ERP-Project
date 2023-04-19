import ItemModel from "../Items/Item/ItemModel";

const CreateItemModel = () => {

    return (
        <div className="flex flex-col h-screen w-full justify-center w-full ">
            <div className="flex h-screen w-full pt-10 justify-center">
                <div className="flex w-11/12 justify-center bg-backgroundGrey px-4">
                    <div className="text-xl">
                        {`Create new item model`}
                    </div>
                    <div className="items-center flex gap-4 justify-items-center">
                    </div>
                </div>
            </div>
            <div className="flex h-screen w-full justify-center">
                <div className="flex flex-col h-screen w-11/12 pt-10 pb-10 gap-4">
                    <ItemModel fromCreate={true}/>
                </div>
            </div>
        </div>

    )
}
export default CreateItemModel