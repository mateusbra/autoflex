
import { useEffect, useState } from 'react';
import { api } from '../api/client';


type ProductCardProps = {
    code: string;
    name: string;
    price: number;
    remove: (code: string) => void;
};

export default function ProductCard({ code, name, price, remove }: ProductCardProps) {
    return (
        <div className="w-full max-w-sm bg-white p-4 rounded-xl shadow text-black">
            <h1 className="text-xl font-semibold">
                {name}
            </h1>

            <p className="text-sm text-gray-500">
                Code: {code}
            </p>

            <p className="text-lg font-bold text-green-600">
                R$ {price}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Edit
                </button>

                <button onClick={() => remove(code)} className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>

    );
}
