import React, { useState, useEffect, Fragment, useRef } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { DataContextConsumer } from '../contexts/DataContext'
import { loadPostData } from '../API/LoadDataApi'

import '../CSS/styles.css'

const Post = ({ data }) => {
    const [_post, setPost] = useState(data)
    const { id } = useParams();
    // const { pathname } = useLocation()
    let inputRef = useRef(null)

    useEffect(() => {
        if(data === undefined) {
            //implement graceful error handling
            loadPostData(fetch, { id })
                .then(d => setPost(d))
        }
    }, [])

    useEffect(() => {
        if(inputRef.current !== null && _post !== null) {
            inputRef.current.value = _post.postContent
            inputRef.current.focus()
        }
    }, [_post])
    
    const onChange = (e) => {
        const {name, value} = e.target
        setPost(p => (
            {
                ...p,
                [name]: value
            }
        ))
    }

    const saveChanges = () => {
        fetch(`http://localhost:39749/LivingSimple/posts`, {
            method: "POST", 
            body: JSON.stringify(_post), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
    }

    return (
        _post === undefined ?
        <p>Loading...</p>
        :
        <Fragment>
            <Link to="/">{`← Go back`}</Link>
            <h2>{_post.title}</h2>
            <h6>{_post.date}</h6>
            <textarea name="postContent" onChange={onChange} ref={inputRef}/>
            <button onClick={saveChanges}>SAVE</button>
        </Fragment>
    )

}

const DataContextAppliedPost = DataContextConsumer(Post)

export { loadPostData, DataContextAppliedPost as Post, Post as TestPost}