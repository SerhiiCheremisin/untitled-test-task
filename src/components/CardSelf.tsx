import React, {useState, useEffect} from 'react';
import '../styles/card-item.css';

import {useLocation} from "react-router-dom";
import EditProduct from "./__EditProduct";
import CommentsField from "./__CommentsField";
import CommentItem from "./__CommentItem";



const CardSelf = ():JSX.Element => {
    const [product, setProduct] = useState<any>({});
    const [comment, setComment] = useState<Array<any>>([]);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [commentEdit, setCommentEdit] = useState<boolean>(false)
    const location = useLocation();

    useEffect(() => {
        const url :string = 'http://localhost:5000/products';
        const urlArr :string = "http://localhost:5000/comments";

        const request = async () => {
            let req = await fetch(url);
            let response = await req.json()
            return response;
        }

        request().then(data => {
            data.map((el:any,id:number) => {
                if (`/product/${el.name.toLowerCase()}` === location.pathname){
                    setProduct(el)
                }
            })
        })
        const request2 = async () =>{
            let req = await fetch(urlArr);
            let response = await req.json()
            return response;
        }
        request2().then(data => setComment(data))
    },[])

  if(product){
    return (
        <div className="card-self-wrapper">
            <div className="card">
                <div className="card__photo">
                    <img src={product.imageURL} alt={`This is photo of ${product.name}`}/>
                </div>
                <div className="long-desc">
                    {product.longDesc}
                </div>
                <div className="characters">
                    <span>How many is exist: {product.quantity}</span>
                    <span>Color: {product.color}</span>
                    <span>Height: {product?.size?.height} cm</span>
                    <span>Width: {product?.size?.width} cm</span>
                    <span>Weight: {product.weight} gram</span>
                </div>
                <div className="comments">
               <CommentItem
                   comment = {comment}
                   product = {product}
               />
                 <button onClick={() => setCommentEdit (true)}>Add comment</button>
                </div>
                <button onClick={() => setIsEditable(true)}>Edit</button>
            </div>
            <CommentsField
                comment = {comment}
                commentEdit = {commentEdit}
                setCommentEdit = {setCommentEdit}
                product = {product}
            />
            <EditProduct
                isEditable = {isEditable}
                setIsEditable = {setIsEditable}
                product = {product}
                comment = {comment}
            />
        </div>

    );
}
    return (
        <>
            <h2>Data is downloading</h2>
        </>
    )

};

export default CardSelf;
