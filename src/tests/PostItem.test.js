import React from 'react'
import PostItem from '../components/displayComponents/PostItem'
import Enzyme, { shallow } from 'enzyme'
import toJson from "enzyme-to-json";
import { Link } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const dummyPost = {
    id : 1,
    title: "Post 1",
    date: "2020-02-02",
    postPreviewContent: "preview1",
    postContent: "content1",
    numberOfComments: 0,
    imgURL: "url/img1"
}

describe('Post item component', () => {
    beforeEach(() => jest.restoreAllMocks())

    it('component renders correctly', async () => {
        // jest.mock('react-router-dom', () => ({
        //   ...jest.requireActual('react-router-dom'),
        //   useParams: jest.fn().mockReturnValue({ id: 1 })
        // }));

        const container = shallow(
          <PostItem {...dummyPost} />
        );

        expect(container.find(Link).length).toEqual(1);
        expect(container.find('p').length).toEqual(1);
    });

    
    it('Component is correctly ordered', async () => {
        const wrapper = shallow(<PostItem {...dummyPost} />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
  });