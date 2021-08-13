import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../create_user/services/user";
import storyService from "../create_story/services/story";
import { Link } from "react-router-dom";
import "../styles/my_stories.css";

const getStoryDetails = async (userToken) => {
  const user = await userService.getUser(userToken);
  const storyIds = user.stories;
  const storyDetails = Promise.all(
    storyIds.map(async (s) => {
      //First I did this without Promise.all but then the resulting storyDetails array was an array of promises. Promise.all waits for all the promises inside of it to be resolved, then returns a single promise which resolves to an array of the results of the input promises.
      /* [G.Cz]:  Promise.all is a good solution. But the better one will be some well defined endpoint on backend
       *  which will accept storiesId list or even better userId and return his stories
       */
      const story = await storyService.getStory(s);
      return {
        story_id: story.id,
        story_name: story.story_name,
        status: story.status,
      };
    })
  );
  return storyDetails;
};

const MyStories = () => {
  const [storyDetails, setStoryDetails] = useState([]);

  const userToken = useSelector((state) => state.userToken);

  useEffect(() => {
    /* [G.Cz]:  for this you should use react + e.g. thunk and keep this in redux. Now everytime when I open this view I am fetching my stories one more time */
    getStoryDetails(userToken).then((details) => {
      setStoryDetails(details);
    });
  }, []); //We cannot make components async. So I couldn't use await to get the story details. Instead, I used then().
  /* [G.Cz]:  Your above coment says loudly that something is not fine with current approach for fetching data */

  const draftStories = storyDetails.filter((s) => s.status === "draft");
  const publishedStories = storyDetails.filter((s) => s.status === "published");

  const switchState = async (storyId) => {
    const story = await storyService.getStory(storyId);
    if (story.status === "draft") {
      story.status = "published";
      if (story.publish_date === null) {
        let currentDate = new Date();
        let day =
          currentDate.getUTCDate() < 10
            ? "0" + currentDate.getUTCDate()
            : currentDate.getUTCDate();
        let month =
          currentDate.getUTCMonth() < 9
            ? "0" + (currentDate.getUTCMonth() + 1)
            : currentDate.getUTCMonth() + 1;
        let year = currentDate.getUTCFullYear();
        story.publish_date = day + "/" + month + "/" + year;
      }
    } else if (story.status === "published") {
      story.status = "draft";
    }
    const returnedStory = await storyService.updateStory(story, userToken);
    setStoryDetails(
      storyDetails.map((s) =>
        s.story_id === returnedStory.id
          ? { ...s, status: returnedStory.status }
          : s
      )
    );
  };

  return (
    <div className="my_stories">
      <p className="my_stories_title">MY STORIES</p>
      <p className="draft_text">DRAFTS</p>
      <div className="my_stories_list">
        {draftStories.map((s) => (
          <div key={s.story_id} className="my_stories_story">
            <p className="my_stories_story_name">{s.story_name}</p>
            <Link
              className="my_stories_button"
              to={"/story_editor/" + s.story_id}
            >
              OPEN IN EDITOR
            </Link>
            <button
              className="my_stories_button"
              onClick={() => switchState(s.story_id)}
            >
              PUBLISH
            </button>
          </div>
        ))}
      </div>
      <p className="draft_text">PUBLISHED</p>
      <div className="my_stories_list">
        {publishedStories.map((s) => (
          <div key={s.story_id} className="my_stories_story">
            <p className="my_stories_story_name">{s.story_name}</p>
            <Link
              className="my_stories_button"
              to={"/story_editor/" + s.story_id}
            >
              OPEN IN EDITOR
            </Link>
            <button
              className="my_stories_button"
              onClick={() => switchState(s.story_id)}
            >
              MAKE DRAFT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStories;
