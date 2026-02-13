
import { useState } from 'react';
import { deleteProduct, fetchProducts, updateProduct } from '../store/products.slice';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';


type ProductCardProps = {
    code: string;
    name: string;
    price: number;
};

export default function ProductCard({ code, name, price }: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedPrice, setEditedPrice] = useState(price);



    const enableEditing = async () => {
        setIsEditing(true);
    }

    const disableEditing = async () => {
        setIsEditing(false);
    }

    const remove = async () => {
        await dispatch(deleteProduct(code));
        await dispatch(fetchProducts());
    }

    const update = async () => {
        await dispatch(updateProduct({ code, name:editedName, price:editedPrice }));
        await dispatch(fetchProducts());
        setIsEditing(false);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.target.value);
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPrice(Number(e.target.value));
    }

    return (
        <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow text-black">
            {isEditing ? (
                <><div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-black">
                            Name:
                        </p>
                        <input className="text-xl font-semibold border rounded-sm" defaultValue={editedName} onChange={handleNameChange} />
                    </div>

                    <p className="text-sm text-gray-500">
                        Code: {code}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-green-600">
                            R$
                        </p>
                        <input className="text-xl font-semibold border rounded-sm" defaultValue={`${editedPrice}`} onChange={handlePriceChange} />
                    </div>
                </>
            ) : (<>
                <h1 className="text-xl font-semibold">
                    {name}
                </h1>

                <p className="text-sm text-gray-500">
                    Code: {code}
                </p>

                <p className="text-lg font-bold text-green-600">
                    R$ {price}
                </p>
            </>)}
            {isEditing ? (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button onClick={disableEditing} className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                        cancel
                    </button>

                    <button onClick={update} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        save
                    </button>

                    <button onClick={remove} className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Remove
                    </button>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <button onClick={enableEditing} className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Edit
                    </button>

                    <button onClick={remove} className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                        Remove
                    </button>
                </div>
            )}
        </div>

    );
}
