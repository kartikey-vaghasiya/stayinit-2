// Import necessary modules and components
import React from "react"
import { Link, useRevalidator } from "react-router-dom"
import { getFirstImage } from "../utils/utilityFunctions"

export default function LikedCard({ flatOrHostel, name, type, locality, city }) {

    const revalidator = useRevalidator();

    async function unlike() {

        const requestOption = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")} `
            },
        }

        const response = await fetch(`http://localhost:5000/api/v1/likes/${type}/${flatOrHostel._id}`, requestOption)
        const jsonResponse = await response.json()

        if (jsonResponse.success === true) {
            // if the property is unliked then remove it from the liked property state
            revalidator.revalidate();
        }
    }

    return (
        <div className="w-[15rem] flex flex-col gap-10 p-6 items-center rounded-[1rem] shadow-md">
            {/* Image of liked property */}
            <div className="">
                <img src={getFirstImage(flatOrHostel)} className="w-full rounded-[1rem]" alt="property_image" />
            </div>
            {/* */}
            <div className="flex flex-col gap-10 justify-between">
                {/* Name & City */}
                <div>
                    <h5 className="text-2xl text-bold">{name}</h5>
                    <p className="text-lg">{locality}, {city}</p>
                </div>
                {/* Link to... Hostel.jsx / Flat.jsx  */}
                {/* Unlike Option */}
                <div className="flex flex-row gap-4">
                    <Link to={`/${type}s/${flatOrHostel.uniqueName}`} className="bg-colorG rounded-[1rem] text-[#FFFBF2] text-center px-4 py-4">Details</Link>
                    <button onClick={unlike} className="bg-colorG rounded-[1rem] text-[#FFFBF2] text-center px-4 py-4 "> Remove </button>
                </div>
            </div>
        </div>
    )
}