import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './App.css';


function App() {
	//useState hooks are used to store term, mediatype, results and favourites states with their initial state.
    const [term, setTerm] = useState("");
    const [mediaType, setMediaType] = useState("all");
    const [results, setResults] = useState([]);
    const [favourites, setFavourites] = useState([]);

	//The search function fetches data from the iTunes search API by the term and media type, limited to 12 results.
    const search = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://itunes.apple.com//search?term=${term}&media=${mediaType}&limit=12`);
        const data = await response.json();
        setResults(data.results);
    };

	//The addToFavourites function adds the selected item to the favourites list
    const addToFavourites = (item) => {
        setFavourites([...favourites, item]);
    };

	//The removeFromFavourites function removes the selected item from the favourites list
    const removeFromFavourites = (item) => {
        setFavourites(favourites.filter((favorite) => favorite.trackId !== item.trackId));
    };
	console.log(results)
 	return (
		<div className="App">
			<h1 className="text-center m-5 text-decoration-underline ">iTunes Search App</h1>
			<form onSubmit={search} className="mb-4 text-center">
				<input
					className="input-field px-1"
					type="text"
					onChange={(e) => setTerm(e.target.value)}
					value={term}
					required
				/>
				<select className="select-dropdown" onChange={(e) => setMediaType(e.target.value)}>
					<option value="all">All</option>
					<option value="movie">Movie</option>
					<option value="podcast">Podcast</option>
					<option value="music">Music</option>
					<option value="musicVideo">Music video</option>
					<option value="audiobook">Audio book</option>
					<option value="shortFilm">Short film</option>
					<option value="tvShow">TV show</option>
					<option value="software">Software</option>
					<option value="ebook">Ebook</option>
				</select>
				<Button className="search-button" type="submit">Search</Button>
			</form>
			<hr />

			<Container>
				<h2 className="text-center my-2">Favourites</h2>
				<Row className="g-2">
					{favourites.map((item, idx) => (
						<Col md={2} key={item.trackId}>
							<Card className="cards d-flex flex-column p-1 h-100 mb-1">
								<Card.Img className="card-image" variant="top" src={item.artworkUrl100} alt={item.trackName} />
								<Card.Body className="d-flex flex-column">
									<Card.Title className="flex-grow-1">{item.artistName} - {item.trackName || item.collectionName}</Card.Title>
									<ButtonGroup className="buttons align-bottom  ">
										<Button className="visit-button" variant="primary"><a href={item.trackViewUrl} target="_blank" rel="noreferrer">Visit</a></Button>
										<Button className="favourite-button" variant="primary" border="dark" onClick={() => removeFromFavourites(item)}>Remove</Button>
									</ButtonGroup>    
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				<hr />
			</Container>

			<Container className="pb-4">
				<h2 className="text-center my-2 ">Results</h2>
				<div data-testid="results" >
					<Row className="g-2">
						{results.map((item, idx) => (
							<Col md={2} key={item.trackId}>
								<Card className="cards d-flex flex-column p-1 h-100 mb-1">
									<Card.Img className="card-image" variant="top" src={item.artworkUrl100} alt={item.trackName} />
									<Card.Body className="d-flex flex-column">
										<Card.Title className="flex-grow-1" >{item.artistName} - {item.trackName|| item.collectionName}</Card.Title>
										<ButtonGroup className="buttons align-bottom  ">
											<Button className="visit-button" variant="primary"><a href={item.trackViewUrl} target="_blank" rel="noreferrer">Visit</a></Button>
											<Button className="favourite-button" variant="primary" border="dark" onClick={() => addToFavourites(item)}>Favourite</Button>
										</ButtonGroup>	
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Container>		
		</div>
  	);
}

export default App;
