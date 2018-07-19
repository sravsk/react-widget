import React from 'react';
import { Input } from 'antd'


const Search = () => {
	const Search = Input.Search;
	return (
		<div className="knowhow-search-wrapper">
		<span className="knowhow-search-title">Find an answer quickly</span>
		<Search 
			placeholder="Search Knowledge base..."
			onSearch={value => console.log(value)}
			style={{ width : 200}} />
		</div>
		)
}

export default Search;