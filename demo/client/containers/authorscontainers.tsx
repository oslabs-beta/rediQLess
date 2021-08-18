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