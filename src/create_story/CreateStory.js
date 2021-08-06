import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import storyService from './services/story';
import {Redirect, useHistory} from 'react-router-dom';
import '../styles/create_story.css';

const genres = [
    'Biography',
    'Children\'s',
    'Comedy',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Psychological',
    'Romance',
    'Science Fiction',
    'Sports',
    'Thriller'
];

const languages = [
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'Bengali',
    'Bosnian',
    'Bulgarian',
    'Burmese',
    'Catalan',
    'Chichewa',
    'Chinese',
    'Crotian',
    'Czech',
    'Danish',
    'Dhivehi',
    'Dutch',
    'Dzongkha',
    'English',
    'Estonian',
    'Filipino',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Hebrew',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Italian',
    'Japanese',
    'Kazakh',
    'Khmer',
    'Korean',
    'Kyrgyz',
    'Lao',
    'Latvian',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Moldovan',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Ossetian',
    'Pashto',
    'Persian',
    'Polish',
    'Portuguese',
    'Romanian',
    'Russian',
    'Serbian',
    'Sinhala',
    'Slovak',
    'Slovene',
    'Sotho',
    'Spanish',
    'Swedish',
    'Tajik',
    'Thai',
    'Tigrinya',
    'Turkish',
    'Turkmen',
    'Ukrainian',
    'Uzbek',
    'Vietnamese',
    'Woleaian'
];

const LanguageList = ({setLanguage}) => {
    return(
        <div className='language_list'>
            <select defaultValue='English' onChange={(event) => setLanguage(event.target.value)}>
                {languages.map(l => 
                    <option key={l} value={l}>{l}</option>
                    )}
            </select>
        </div>
    )
}

const PickedGenres = ({storyGenres, setStoryGenres}) => {
    return(
        <div className='picked_genres'>
                {storyGenres.map((g) => <button className="genre_button" key={g} onClick={() => setStoryGenres(storyGenres.filter(s => s !== g))}>{g}</button>)}
        </div>
                
        
    );
}

const AvailableGenres = ({storyGenres, setStoryGenres}) => {
    const genresNotPicked = genres.filter(g => !storyGenres.includes(g));
    return(
        <div className='available_genres'>
            {genresNotPicked.map(g => <button className="genre_button" key={g} onClick={() => setStoryGenres(storyGenres.concat(g))}>{g}</button>)}
        </div>
    )
}

const CreateStory = () => {
    const [storyName, setStoryName] = useState('');
    const [storyGenres, setStoryGenres] = useState([]);
    const [summary, setSummary] = useState('');
    const [language, setLanguage] = useState('English');

    storyGenres.length = Math.min(storyGenres.length, 3);

    const userToken = useSelector(state => state.userToken);

    const history = useHistory();

    if(!userToken){
        return <Redirect to='/' />; //First I used history.push('/') here. It worked but there was a warning (Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.). So I used redirecting instead and it was fine. This is probably because when the rendering occurs, this component is expected to return some JSX stuff. That is the difference between push and redirect. Push is the programatic way to change a route. For example it can be used withing the onSubmit method of a form. Redirect is like a component itself and it is better to use it if we need to return some JSX, like in this case.
    }

    const submitStory = async (event) => {
        event.preventDefault();
        const storyDetails = {
            story_name: storyName,
            story_genres: storyGenres,
            summary: summary,
            language: language
        }

        await storyService.createNewStory(storyDetails, userToken);

        history.push('/my_stories');
        
    }


    return(
        <div className='create_story'>
            <div className="create_story_title">CREATE STORY</div>
            <form onSubmit={submitStory}>
                <div className="create_story_form">
                    <div className="cs_story_name">
                        <p>NAME</p>
                        <input value={storyName} onChange={(event) => setStoryName(event.target.value)} maxLength="35"></input>
                    </div>
                    <div className="cs_story_summary">
                        <p>SUMMARY</p>
                        <textarea value={summary} onChange={(event) => setSummary(event.target.value)}></textarea>
                    </div>
                    <div className="cs_story_language">
                        <p>LANGUAGE</p>
                        <LanguageList setLanguage={setLanguage}/>
                    </div>
                    <div className="cs_story_genres">
                        <p>GENRE(S)</p>
                        <PickedGenres storyGenres={storyGenres} setStoryGenres={setStoryGenres} />
                    </div>
                    <div className="cs_available_genres">
                        <p>AVAILABLE GENRES</p>
                        <AvailableGenres storyGenres={storyGenres} setStoryGenres={setStoryGenres} />
                    </div>
                    <button className="create_story_button" type='submit'>CREATE STORY</button>
                </div>
            </form>
        </div>
    )
}

export default CreateStory;