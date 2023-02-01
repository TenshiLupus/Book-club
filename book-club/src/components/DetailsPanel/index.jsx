import React from 'react'
import {React} from './styles'

const DetailsPanel = ({book}) => (
    <article>
        <figure>
            <img alt="" src={book.image}/>
            <h3>{book.title}</h3>
            <h4>by {book.author}</h4>
        </figure>

        <p>{book.description}</p>
        <p>
            <em>Published in {book.published}</em>
        </p>
    </article>
)

export default DetailsPanel