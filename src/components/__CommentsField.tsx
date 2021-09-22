import React, {FormEvent, useState} from 'react';
import ReactDom from 'react-dom';
import '../styles/comment.css';

const CommentsField = ({...props}) => {
    const {comment, commentEdit, setCommentEdit, product} = props

    const [commentItem, setCommentItem] = useState<string>('')

    const commentHandler = (e:FormEvent) => {
        e.preventDefault();
        if (!commentItem){
            alert('All inputs should be filled')
            return
        }
        let idLogic :number = comment ? comment.lenght - 1 : 0
        let date = new Date().toLocaleString()
         const newObject = {
             id: idLogic,
             productId: product.id,
             description: commentItem,
             date: date
    }
        fetch('http://localhost:5000/comments',{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
        setCommentItem('')
        setCommentEdit(false)
    }

    if (!commentEdit) return null

    return ReactDom.createPortal(
        <div className="comment-wrapper">
            <form action="#">
                <input value={commentItem} onChange={(e) => setCommentItem(e.target.value)} type="text"/>
                <button onClick={e => commentHandler(e)} type="submit">Add comment</button>
                <button onClick={() => setCommentEdit(false)}>Cancel</button>
            </form>
        </div>, document.getElementById('comment')!
    );
};

export default CommentsField;
