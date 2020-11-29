import React from 'react'
import { Link } from 'react-router-dom'

export default ({id, title, date, numberOfComments}) => (
    <div key={id}>
        <Link to={`/posts/${id}`}>{title}</Link>
        <p>{date} | {numberOfComments} {numberOfComments === 1 ? "comment" : "comments"}</p>
    </div>
)