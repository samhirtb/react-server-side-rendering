import React, { useState, useEffect, Fragment } from 'react'
import { DataContextConsumer } from '../contexts/DataContext'
import { loadPostsData } from '../API/LoadDataApi'
import PostItem from './displayComponents/PostItem'

const PostListing = ({ data }) => {
    const [_posts, setPosts] = useState(data)

    useEffect(() => {
        if(data === undefined) {
            loadPostsData(fetch, null)
                .then(d => setPosts(d))
        }
    }, [])
    
    return (
        _posts === undefined ?
        <p>Loading...</p>
        :
        <Fragment>
            {_posts.map(post => <PostItem key={post.id} {...post}/>)}
        </Fragment>
    )
}

const DataContextAppliedPostListing = DataContextConsumer(PostListing)

export { loadPostsData, DataContextAppliedPostListing as PostListing }