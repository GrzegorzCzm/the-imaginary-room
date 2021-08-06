import React, {useState, useEffect} from 'react';
import storyService from '../create_story/services/story';
import {Link} from 'react-router-dom';
import '../styles/browse_stories.css'

import StarIcon from '../images/Icon-Star.png';
import EyeIcon from '../images/Icon-Eye.png';
import CommentIcon from '../images/Icon-Comment.png';

const BrowseStories = () => {
    const [stories, setStories] = useState([]);
    /*const [sortValue, setSortValue] = useState("POPULARITY");
    const [dateValue, setDateValue] = useState("THIS YEAR");
    const [genreValue, setGenreValue] = useState("ALL");*/

    useEffect(() => {
        storyService.getAllStories().then(allStories =>
            setStories(allStories)
        );
    }, []);

    console.log(stories);

    return(
        <div className="browse_stories">
            <p className="browse_stories_title">BROWSE STORIES</p>
            <div className="story_filter">
                <div className="sort_by filter_element">
                    <p className="sort_by_text">SORT BY: </p>
                    <select className="sort_by_select">
                        <option>POPULARITY</option>
                        <option>RATING</option>
                        <option>NAME</option>
                        <option>FROM NEWEST</option>
                        <option>FROM OLDEST</option>
                    </select>
                </div>
                <div className="date filter_element">
                    <p className="date_text">DATE: </p>
                    <select className="date_select">
                        <option>ALL TIME</option>
                        <option>TODAY</option>
                        <option>THIS WEEK</option>
                        <option>THIS MONTH</option>
                        <option>THIS YEAR</option>
                    </select>
                </div>
                <div className="genre filter_element">
                    <p className="genre_text">GENRE: </p>
                    <select className="genre_select">
                        <option>BIOGRAPHY</option>
                        <option>CHILDREN'S</option>
                        <option>COMEDY</option>
                        <option>DRAMA</option>
                        <option>FANTASY</option>
                        <option>HISTORY</option>
                        <option>HORROR</option>
                        <option>MUSIC</option>
                        <option>MYSTERY</option>
                        <option>PSYCHOLOGICAL</option>
                        <option>ROMANCE</option>
                        <option>SCIENCE FICTION</option>
                        <option>SPORTS</option>
                        <option>THRILLER</option>
                    </select>
                </div>
            </div>
            <div className="story_list">
            {
                stories.map(s => 
                    <div key={s.id} className="story">
                        <div className="story_header">
                            <div className="info_header info_rating">
                                <img className="star_icon" src={StarIcon} alt="star" />
                                <p>8.2/10</p>
                            </div>
                            <div className="info_header info_view">
                                <img className="eye_icon" src={EyeIcon} alt="eye" />
                                <p>12.500</p>
                            </div>
                            <div className="info_header info_review">
                                <img className="comment_icon" src={CommentIcon} alt="comment" />
                                <p>50</p>
                            </div>
                            <div className="publish_date">{s.publish_date}</div>
                        </div>
                        <div className="story_title">{s.story_name.toUpperCase()}</div>
                        <div className="story_author">BY<br />{s.user.name.toUpperCase() + " " + s.user.surname.toUpperCase()}</div>
                        <div className="story_genres">
                            {s.genres.map((g, i) => 
                                <div key={i} className="story_genre">
                                    {g}
                                </div>
                            )}
                        </div>
                        <div className="story_summary">{s.summary}</div>
                        <Link to={'/read_story'+'/'+s.id} className="story_read">READ</Link>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default BrowseStories;