import React, {FormEvent, MouseEventHandler, useState} from 'react';
import ReactDom from 'react-dom';
import "../styles/addProduct.css"

const AddProduct = ({...props}) => {
    const {adderIsOpen,setAdderIsOpen,shopList,commentList}  = props
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [longDesc, setLongDesc] = useState<string>('')
    const [color, setColor] = useState<string>('')
    const [weight, setWeight] = useState<string>("")
    const [width, setWidth] = useState<string>("")
    const [height, setHeight] = useState<string>("")


const submitHandler = (e:any) => {
    e.preventDefault();
    if (!name || !quantity || !desc || !longDesc || !color || !weight || !width || !height) {
        alert("You have forgotten to fill all inputs")
        return
    }

    const addNewProduct: object = {
        "id": shopList.length,
        "name": name,
        "quantity": quantity,
        "comments": commentList,
        "description": desc,
        "weight": weight,
        "imageURL": "/images/parcel.jpg",
        "longDesc": longDesc,
        "color": color,
        "size": {
            "width": width,
            "height": height
        }
    }
  let url:string = "http://localhost:5000/products"
    let dataFetch = fetch(url,{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(addNewProduct)
    })
    setName('');
    setQuantity('');
    setHeight('');
    setWeight('');
    setColor('');
    setLongDesc('');
    setDesc('');
    setWidth('');
}
    if (!adderIsOpen) return null

    return ReactDom.createPortal(
      <>
        <div className="form-wrapper">
            <form action="#" id='add-form'>
                <label htmlFor="#">Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text"/>
                <label htmlFor="#">Quantity</label>
                <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="text"/>
                <label htmlFor="#">Short description</label>
                <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text"/>
                <label htmlFor="#"> Long description</label>
                <input onChange={(e) => setLongDesc(e.target.value)} value={longDesc} type="text"/>
                <label htmlFor="#">Weight</label>
                <input onChange={(e) => setWeight(e.target.value)} value={weight} type="text"/>
                <label htmlFor="#">Color</label>
                <input onChange={(e) => setColor(e.target.value)} value={color} type="text"/>
                <label htmlFor="#">Width</label>
                <input onChange={(e) => setWidth(e.target.value)} value={width} type="text"/>
                <label htmlFor="#">Height</label>
                <input onChange={(e) => setHeight(e.target.value)} value={height} type="text"/>
                <button onClick={e => submitHandler(e)} type="submit">Add</button>
                <button onClick={() => setAdderIsOpen(false)}>Cancel</button>
            </form>
        </div>
          </>, document.getElementById("portal")!
    )
};

export default AddProduct;
