import React from 'react';

const CommentItem = ({...props}) => {
    const {comment,product} = props

    const deleteCommentHandler = (e:number) => {
        let url = " http://localhost:5000/comments"
        fetch(`${url}/${e}`,{
            method: "DELETE"
        })
    }

    const commentList = comment.map((el:any,id:number) => {
        if (el.productId === product.id){
            return(
                <div key={id} className="comment-item">
                <span className='comment'>{el.description}</span>
                <span className='comment-date' >{el.date}</span>
                <button onClick={() => deleteCommentHandler(el.id)}>Delete this comment</button>
                    </div>
            )
        }
    })

    return (
        <div>
            {commentList}
        </div>
    );
};

export default CommentItem;
