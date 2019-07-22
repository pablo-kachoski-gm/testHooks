import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import './App.css';

const CharactersContainer = styled.div`
  min-height: 300px;
  width: 300px;
  align-items: center;

`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #404858;
  padding: 20px;
  width: 300px;
`
const ActionButton = styled.button`
  background: ${props => props.primary ? "#337ab7" : "rgb(221, 221, 221)"};
  color: ${props => props.primary ? "#fff" : "black"};
  border-color: ${props => props.primary ? "#2e6da4" : "#ccc"};
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: 3px;
  width: 100px;

  &:hover {
    background: ${props => props.primary ? "#286090" : "#ccc"};
    border-color: ${props => props.primary ? "#122b40" : "#5a5a5a"};
  }
`
const ListContainer = styled.ul`
  margin: 0;
  padding: 10px 0;
  li {
    list-style-type: none;
  }
`
const LoadingContainer = styled.div`
  color: white;
`

function App() { 

  const baseURL = 'https://swapi.co/api/people/';
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchURL, setFetchURL] = useState(`${baseURL}?page=1`);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetch(fetchURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      return response.json();
    })
    .then(data => {
      setLastPage(Math.ceil(data.count/10));
      setFetchedData(data.results);
      setIsLoading(false);
    })
    .catch(err => {
      setIsError(true);
      setIsLoading(false);
      console.log(err);
    })
  }, [fetchURL]);

  const prevPage = () => {
    const prevPageNumber = currentPage > 1 ? currentPage - 1 : currentPage;
    setCurrentPage(prevPageNumber);
    setFetchURL(`${baseURL}?page=${prevPageNumber}`);
  };
  const nextPage = () => {
    const nextPageNumber = currentPage < lastPage ? currentPage + 1 : currentPage;
    setCurrentPage(nextPageNumber);
    setFetchURL(`${baseURL}?page=${nextPageNumber}`);
  };
  return (
    <>
      <div className="App">
        <header className="App-header">
          <CharactersContainer>
            { isError && <div> Something went wrong </div> }
            {
              isLoading ? (<LoadingContainer>Loading ...</LoadingContainer>) :
              fetchedData ?
              (
                <ListContainer> { fetchedData.map(character => <li key={character.url}>{character.name}</li>) }</ListContainer>
              ) : <div> No Results returned </div>
            }
          </CharactersContainer>
          <ActionsContainer id='actionItems'>
            <ActionButton primary onClick={ prevPage }>Prev</ActionButton>
            <ActionButton secondary onClick={ nextPage }>Next</ActionButton>
          </ActionsContainer>
        </header>
      </div>
    </>
  );
}

export default App;
