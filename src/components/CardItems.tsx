import React, {useEffect, useState} from 'react';
import Card from "./__Card";
import "../styles/card.css"
import AddProduct from "./__AddProduct";


const CardItems = ():JSX.Element => {

  const [quantityFilter, setQuantityFilter] = useState<boolean>(false)
  const [nameFilter, setNameFilter] = useState<boolean>(false)
  const [adderIsOpen, setAdderIsOpen] = useState<boolean>(false)
  const [shopList, setShopList] = useState<any>([])
  const [commentList, setCommentList] = useState<any>([])


    useEffect(() => {
        const url :string = 'http://localhost:5000/products';
        const urlArr :string = "http://localhost:5000/comments";

        //I am fetching database in the next function
        const request = async () => {
            let req = await fetch(url);
            let response = await req.json()
            return response;
        }
        //database data came into a react state
        request().then( data => setShopList(data))
        const request2 = async () =>{
            let req = await fetch(urlArr);
            let response = await req.json()
            return response;
        }
        request2().then(data => setCommentList(data))
    },[])



    const filterHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
   if (e.target.value === "Name"){
       setQuantityFilter(false);
       setNameFilter(true);
   }
   if (e.target.value === "Quantity"){
       setQuantityFilter(true);
       setNameFilter(false);
   }
}

    return (
        <div className="card-items-wrapper">
          <div className="card-items-wrapper__sort-block">
              <select onChange={ e => filterHandler(e)}  name="card-sort" id="card-sort">
                  <option defaultValue='default' hidden selected={true} disabled>Sort by:</option>
                  <option value="Name">Name</option>
                  <option value="Quantity">Quantity</option>
              </select>
              <button onClick={() => setAdderIsOpen(true)}>New Product</button>
          </div>
          <div className="card-items-wrapper__cards">
          <Card
              quantityFilter = {quantityFilter}
              nameFilter = {nameFilter}
              shopList = {shopList}
              commentList = {commentList}
          />
          </div>
            <AddProduct
                commentList = {commentList}
                adderIsOpen = {adderIsOpen}
                setAdderIsOpen = {setAdderIsOpen}
                shopList = {shopList}
            >
            </AddProduct>
        </div>
    );
};

export default CardItems;
