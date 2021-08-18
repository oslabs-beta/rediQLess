/**
 * This is a JSX container that imports AuthorProfile JSX component and iterates over the authorData
 * to generate the author information for the page
 * @param {string} name is the name of the author
 * @param {string} image is the url of the image
 * @param {string} info is some information about the author
 * @param {string} github is the github url of the author
 * @param {string} linkedin is the linkedin url of the author
 */
import React from 'react';
import AuthorProfile from '../components/authors';
import authorData from '../util/authorinfo';

const AuthorsContainer = () => {

	return (
		<div>
			{authorData.map((el, index:number) => {
			return <AuthorProfile key={index} name={el.name} image={el.image} info={el.info} github={el.github} linkedin={el.linkedin}/>
		})}	
		</div>		
	)
}

export default AuthorsContainer;