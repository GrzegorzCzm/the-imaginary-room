import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddNodeButton from "./components/utilities/AddNodeButton";
import NodeList from "./components/utilities/NodeList";
import storyService from "../create_story/services/story";
import { setContentAction } from "./reducers/contentReducer";
import { setStoryIdAction } from "./reducers/storyIdReducer";
import { useDispatch } from "react-redux";

import "../styles/story_editor.css";

function CreateStory() {
  const dispatch = useDispatch();
  const storyId = useParams().id;

  useEffect(() => {
    dispatch(setStoryIdAction(storyId));
    storyService.getStory(storyId).then((story) => {
      dispatch(setContentAction(story.story_content));
    });
    /* Some linter will help you a lot with cleaner code. E.g. below line generate warning like:
     * React Hook useEffect has a missing dependency: 'storyId'.
     * Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps
     */
  }, [dispatch]);

  return (
    <div className="story_editor">
      <AddNodeButton />
      <NodeList />
      <Link className="preview_story_button" to={"/read_story/" + storyId}>
        PREVIEW STORY
      </Link>
    </div>
  );
}

export default CreateStory;
