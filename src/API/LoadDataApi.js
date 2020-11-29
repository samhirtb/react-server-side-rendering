export const loadPostsData = async (fetch, params) => {
    return fetch(`http://localhost:39749/LivingSimple/posts`)
        .then(response => response.json())
}

export const loadPostData = async (fetch, params) => {
    return fetch(`http://localhost:39749/LivingSimple/posts/${params.id}`)
        .then(response => response.json())
}