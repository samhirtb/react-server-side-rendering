import App from '../App'

import { PostListing } from '../components/PostsListing'
import { Post } from '../components/Post'
import { loadPostsData, loadPostData } from '../API/LoadDataApi'


const routes = [
    {
      component: App,
      routes: [
        {
            path: "/",
            exact: true,
            component: PostListing,
            loadData: loadPostsData
        },
        {
          path: "/posts/:id",
          exact: true,
          component: Post,
          loadData: loadPostData
        }
      ]
    }
  ];

export {routes}