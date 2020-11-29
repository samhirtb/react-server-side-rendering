import React from 'react'
import * as Post from '../components/Post'
import * as Load from '../API/LoadDataApi'
import fetchMock from 'fetch-mock'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, fireEvent } from "@testing-library/react";


describe('Post component', () => {

  beforeEach(() => jest.restoreAllMocks())

  it('component renders correctly', async () => {
    const loadSpy = jest.spyOn(Load, "loadPostData").mockImplementationOnce(
      async () =>
        new Promise((resolve) =>
          resolve({ title: 'ABC', date:"2020-02-02", postContent: "TEST CONTENT" })
        )
    );

    const { findByText, findByDisplayValue } = render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Route path="/posts/:id">
          <Post.TestPost />
        </Route>
      </MemoryRouter>
    );
  
    await findByText("ABC");
    await findByText("2020-02-02");
    await findByDisplayValue("TEST CONTENT");
    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(loadSpy).toHaveBeenCalledWith(fetch, { id :"1" });
  });



  it('component displays loading while data undefined', async () => {
    const loadSpy = jest.spyOn(Load, "loadPostData").mockImplementationOnce(
      async () =>
        new Promise((resolve) =>
          resolve(undefined)
        )
    );

    const { findByText } = render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Route path="/posts/:id">
          <Post.TestPost />
        </Route>
      </MemoryRouter>
    );
  
    await findByText("Loading...");
  });



  it('component state updates on textarea onChange', async () => {
    const loadSpy = jest.spyOn(Load, "loadPostData").mockImplementationOnce(
      async () =>
        new Promise((resolve) =>
          resolve({ title: 'ABC', date:"2020-02-02", postContent: "TEST CONTENT" })
        )
    );

    const { findByDisplayValue } = render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Route path="/posts/:id">
          <Post.TestPost />
        </Route>
      </MemoryRouter>
    );
  
    const postContent = await findByDisplayValue("TEST CONTENT")
    postContent.onchange = jest.fn()
    fireEvent.change(postContent, { target: { value: 'UPDATED CONTENT' } });

    expect(postContent.onchange).toHaveBeenCalledTimes(1);
    expect(postContent.value).toEqual('UPDATED CONTENT');
  });



  it('component saves called properly', async () => {
    const url = 'http://localhost:39749/LivingSimple/posts'

    const mockedPostUpdate = fetchMock.postOnce(url, {})

    const loadSpy = jest.spyOn(Load, "loadPostData").mockImplementationOnce(
      async () =>
        new Promise((resolve) =>
          resolve({ title: 'ABC', date:"2020-02-02", postContent: "TEST CONTENT" })
        )
    );

    const { findByText, findByDisplayValue } = render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Route path="/posts/:id">
          <Post.TestPost />
        </Route>
      </MemoryRouter>
    );

    const saveButton = await findByText("SAVE")
    const postContent = await findByDisplayValue("TEST CONTENT")
    
    postContent.onchange = jest.fn()
    saveButton.onclick = jest.fn()

    fireEvent.change(postContent, { target: { value: 'UPDATED CONTENT' } });
    fireEvent.click(saveButton)

    expect(saveButton.onclick).toHaveBeenCalledTimes(1);
    expect(mockedPostUpdate.called(url)).toBeTruthy();
    expect(mockedPostUpdate._calls[0].options.body).toEqual(JSON.stringify({title:"ABC",date:"2020-02-02",postContent:"UPDATED CONTENT"}))
  });
});