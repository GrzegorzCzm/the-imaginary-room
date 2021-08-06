import React from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/homepage.css';

const HomePage = () => {
    const history = useHistory();
    return (
        <div className="home-page">
            <div className="welcome-section">
                <h1>ENTER THE IMAGINARY ROOM</h1>
                <p>
                    This is the common ground for people who would like to
                    create or experience stories in an interactive way.
                </p>
            </div>
            <div className="panels">
                <div className="panel top-panel">
                    <h1>WHAT IS THE IMAGINARY ROOM?</h1>
                    <p>
                        The Imaginary Room allows you to read, create, and share interactive stories. Thanks to our Story Creator tool, you can place dialogue
                        and story choices into your story to create an experience similar to old text-based games.
                        <br /> <br />
                        The Story Creator tool offers several "nodes" to help you create your stories easily. You can get inputs from users, present choices,
                        change future texts and choices based on the choices made before, and many more!
                        <br /> <br />
                        There is no requirement about how you structure your story. You can create a linear story with minimal interaction, or you can use all
                        the tools Story Creator offers to maximize the interactivity!
                    </p>
                </div>
                    <div className="panel middle-panel-1">
                        <h1>READ</h1>
                        <div>
                        <p>
                            Start reading the stories created by
                            others right away!
                            <br /> <br />
                            Once you start reading a story, it will
                            be added to your library. All your
                            progress will be saved automatically,
                            so you can always stop reading and then
                            keep going from where you left off later!
                            <br /> <br />
                            Browse the stories available now to deep
                            dive into the magical world of The
                            Imaginary Room!
                        </p>
                        </div>
                        <button className="panel-button" onClick={() => history.push('/browse_stories')}>CHECK OUT STORIES</button>
                    </div>
                    <div className="panel middle-panel-2">
                        <h1>CREATE</h1>
                        <div>
                        <p>
                            You can create your own stories by using
                            our Story Creator tool!
                            <br /> <br />
                            Story Creator provides you with various
                            tools to help you put the ideas on your
                            mind into practice as much as you can!
                            <br /> <br />
                            Login or register to start creating stories
                            in any languageand show your vision to
                            the readers all around the world!
                        </p>
                        </div>
                        <button className="panel-button" onClick={() => history.push('/login')}>LOGIN OR REGISTER</button>
                    </div>
                    <div className="panel middle-panel-3">
                        <h1>SHARE</h1>
                        <p>
                            Once your story is created, go ahed and
                            share it!
                            <br /> <br />
                            Your story will be placed in our story
                            catalogue and readers will be able to
                            read it.
                            <br /> <br />
                            Stories can be read without an
                            Imaginary Room account, so you can
                            send a link to anyone and they can
                            start reading your story right away!
                        </p>
                    </div>
                   <div className="panel bottom-panel-1">
                        <h1>LEARN</h1>
                        <p>
                            Read our documentation to learn how to use the Story Creator tool
                            to create stories.
                            <br /> <br />
                            The tool features "nodes" and each node serves a specific purpose
                            for you to have the experience you want your readers to have.
                        </p>
                    </div>
                    <div className="panel bottom-panel-2">
                        <h1>REVIEW</h1>
                        <p>
                            Review the stories created by other users. You can rate a story, and
                            write a review about it.
                            <br /> <br />
                            The average of all the ratings determines the overall rating of a
                            story.
                        </p>
                    </div>
            </div>
        </div>
    );
}

export default HomePage;