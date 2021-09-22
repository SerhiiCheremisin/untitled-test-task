import React from 'react';
import {Link} from "react-router-dom";
import "../styles/card.css"

const Card = ({...props}):JSX.Element => {
    const {shopList, quantityFilter,nameFilter} = props


    const deleteHandler = (id:number) => {
      let result = window.confirm("Are you sure");
       if (result) {
            const url :string = 'http://localhost:5000/products';
            fetch(`${url}/${id}`, {
                method: "DELETE"
            })
        }
    }

   const cardList = shopList.map((el:any,id:number):JSX.Element => {
       return(
           <div key={el.id} className="card">
         <div className="card__photo">
             <img src={el.imageURL} alt={`photo of ${el.name}`}/>
         </div>
          <div className="card-name">
              {el.name.toUpperCase()}
          </div>
        <div className="card__desc">
            {el.description}
        </div>
         <div className="card__count">
             Quantity is: {el.quantity}
         </div>
          <div className="card__buttons">
                <button onClick={() => deleteHandler(id)}>Delete Card</button>
                <button><Link to={`/product/${el.name.toLowerCase()}`}> To the page</Link></button>
          </div>
           </div>
       )
   })

    function byField(field:any) {
        return (a:any, b:any) => a[field] > b[field] ? 1 : -1;
    }

if (nameFilter) {
    return (
        <>
            {cardList.sort(byField('name'))}
        </>
    );
}
//I have no idea why this filter isn't working
    if (quantityFilter) {
        return (
            <>
                {cardList.sort((a:any, b:any) => {
                    return a.quantity - b.quantity
                })}
            </>
        );
    }

    return (
        <>
            {cardList}
        </>
    );


};

export default Card;
