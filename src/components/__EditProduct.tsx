import React, {FormEvent, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../styles/editProduct.css'
import ReactDom from 'react-dom';


const EditProduct = ({...props}) => {
    const {setIsEditable, isEditable, product,comment} = props;

    let history = useHistory();

    const [itemName, setItemName] = useState<string>('');
    const [itemQuantity, setItemQuantity] = useState<string>('');
    const [itemDesc, setItemDesc] = useState<string>('');
    const [itemWeight, setItemWeight] = useState<string>('');
    const [itemLongDesc, setItemLongDesc] = useState<string>('');
    const [itemColor, setItemColor] = useState<string>('');
    const [itemWidth, setItemWidth] = useState<string>('');
    const [itemHeight, setItemHeight] = useState<string>('');

useEffect(() => {
       if (product){
           setItemName(product.name)
           setItemQuantity(product.quantity)
           setItemDesc(product.description)
           setItemWeight(product.weight)
           setItemLongDesc(product.longDesc)
           setItemColor(product.color)
           setItemWidth(product.size?.width)
           setItemHeight(product.size?.height)
       }
},[])

   const formHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!itemName || !itemQuantity || !itemDesc || !itemWeight || !itemLongDesc || !itemColor || !itemWidth || !itemHeight){
            alert("You should fill all fields")
            return
        }

        const newObject =  {
            "id": product.id,
            "name": itemName,
            "quantity": itemQuantity,
            "comments": comment,
            "description": itemDesc,
            "longDesc": itemWeight,
            "color": itemColor,
            "weight": itemWeight,
            "imageURL": "/images/parcel.jpg",
            "size": {
                "width": itemWidth,
                "height": itemHeight
            }
        }
       const url :string = 'http://localhost:5000/products';
        fetch(`${url}/${product.id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
       setIsEditable(false)
       history.push(`/`)
    }

  if (!isEditable) return null

    return ReactDom.createPortal(
        <div className="edit-wrapper">
            <form onSubmit={(e) => formHandler(e)} action="#" id="delete-form" className="delete-form" name="delete-form">
                <label>Name</label>
                <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text"/>
                <label>Quantity</label>
                <input value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}  type="text"/>
                <label>Description</label>
                <input value={itemDesc} onChange={(e) => setItemDesc(e.target.value)}  type="text"/>
                <label>Full description</label>
                <input value={itemLongDesc} onChange={(e) => setItemLongDesc(e.target.value)}  type="text"/>
                <label>Color</label>
                <input value={itemColor} onChange={(e) => setItemColor(e.target.value)}  type="text"/>
                <label>Width</label>
                <input value={itemWeight} onChange={(e) => setItemWeight(e.target.value)}  type="text"/>
                <label>Height</label>
                <input value={itemHeight} onChange={(e) => setItemHeight(e.target.value)}  type="text"/>
                <label>Weight</label>
                <input value={itemWidth} onChange={(e) => setItemWidth(e.target.value)}  type="text"/>
                <button type="submit">Edit</button>
             <button onClick={() => setIsEditable(false)}>Cancel</button>
            </form>
        </div>,document.getElementById("edit")!
    );
};

export default EditProduct;
