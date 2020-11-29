
import { loadPostsData, loadPostData } from '../API/LoadDataApi'
import fetchMock from 'fetch-mock' //http://www.wheresrhys.co.uk/fetch-mock/

const dummyPosts = [
    {
        id : 1,
        title: "Post 1",
        date: "2020-02-02",
        postPreviewContent: "preview1",
        postContent: "content1",
        numberOfComments: 0,
        imgURL: "url/img1"
    },
    {
        id : 2,
        title: "Post 2",
        date: "2020-02-02",
        postPreviewContent: "preview2",
        postContent: "content2",
        numberOfComments: 3,
        imgURL: "url/img2"
    }
]

describe('loadPostsData', () => {
    it('Fetches posts data', async () => {
        const url = 'http://localhost:39749/LivingSimple/posts'

        const mockedPostsFetch = fetchMock.getOnce(url, {
            status: 200,
            body: dummyPosts
        })

        const response = await loadPostsData(fetch, null)
        expect(mockedPostsFetch.called(url)).toBeTruthy();
        expect(response).toEqual(dummyPosts)
    });
});

describe('loadPostData', () => {
    it('Fetches relevant post data', async () => {
        const url = 'http://localhost:39749/LivingSimple/posts/1'

        const mockedPostsFetch = fetchMock.getOnce(url, {
            status: 200,
            body: dummyPosts[0]
        })

        const response = await loadPostData(fetch, {id : 1})
        expect(mockedPostsFetch.called(url)).toBeTruthy(); //not required really, fetchMock covers it
        expect(response).toEqual(dummyPosts[0])
    });
});
