import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import MainNavbar from './components/Navbar';
import ListEntry from './components/ListEntry';
import EntryModal from './components/Entry';
import EntryCard from './components/EntryCard';
import Party from './components/Party';
import defaultPokemon from './assets/default-pokemon.json';
import Graph from './components/StatsGraph';

// Bootstrap Imports
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

const PARTY_SIZE = 6;

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [show, setShow] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [query, setQuery] = useState(null);
  const [result, setResult] = useState(null);
  const [party, setParty] = useState([]);

  const handleAddPokemon = (pokemon) => {
    if (party.length < PARTY_SIZE && party.includes(pokemon) === false) {
      setParty([...party, pokemon]); console.log(party);
    }
  }
  const handleRemovePokemon = (pokemon) => {
    setParty(party => party.filter(p => p !== pokemon))
  }

  const handleQuery = (q) => {
    setQuery(q);
  }

  const handleClose = () => setShow(false);
  const handleShow = (poke) => {
    setPokemon(poke);
    setShow(true);
  };

  const getUrl = useCallback(() => {
    const offset = (page - 1) * limit;
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset + '&limit=' + limit;
    return url;
  }, [page, limit]);

  const getQueryUrl = useCallback(() => {
    const param = query ? "" + query : "null";
    const url = 'https://pokeapi.co/api/v2/pokemon/' + param;
    return url;
  }, [query]);

  useEffect(() => {
    fetch(getQueryUrl())
      .then(response => response.json())
      .then(json => {
        setResult(json);
      })
      .catch(error => {
        console.error(error);
        setResult(null);
      })
  }, [query, setQuery, result, getQueryUrl]);

  useEffect(() => {
    fetch(getUrl())
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.error(error))
  }, [page, getUrl, pokemon]);

  return (
    <>
      {(pokemon && show) &&
        <EntryModal pokemon={pokemon} show={show} onHide={handleClose} />
      }
      <MainNavbar handleQuery={handleQuery} />
      <div className="pokedex my-4">
        <Container fluid>
          <Row>
            <Col md={4}>
              <div className="pokedex-results-wrapper m-4">
                {query &&
                  <div className="d-flex justify-content-between">
                    <p className="results mb-1">{"Searching For: " + query}</p>
                    <p className="results mb-1">{result ? "Result Found!" : "0 Results Found"}</p>
                  </div>
                }
                <Container className="pokedex-list m-0 p-0 rounded">
                  <ListGroup variant="flush" as="ol">
                    {(data && !result) && data.results.map(item => (
                      <ListEntry key={item.id} name={item.name} show={show} onShow={handleShow} setPokemon={setPokemon} onAdd={handleAddPokemon} />
                    ))}
                    {result &&
                      <ListEntry key={result.id} name={result.name} show={show} onShow={handleShow} setPokemon={setPokemon} onAdd={handleAddPokemon} />
                    }
                  </ListGroup>
                </Container>
                <div className="d-flex flex-row justify-content-between mt-3">
                  {(data && !result) &&
                    <div>
                      <PokePagination className="poke-pagination" page={page} setPage={setPage} pageLimit={Math.floor(data.count / limit)} />
                    </div>
                  }
                  {!result &&
                    <div className="limit-options">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>Limit</InputGroup.Text>
                        <DropdownButton
                          variant="outline-secondary"
                          title={limit}
                          id="limit-dropdown"
                        >
                          <Dropdown.Item onClick={() => setLimit(10)}>10</Dropdown.Item>
                          <Dropdown.Item onClick={() => setLimit(20)}>20</Dropdown.Item>
                          <Dropdown.Item onClick={() => setLimit(50)}>50</Dropdown.Item>
                          <Dropdown.Item onClick={() => setLimit(100)}>100</Dropdown.Item>
                        </DropdownButton>
                      </InputGroup>
                    </div>
                  }
                </div>
              </div>
            </Col>
            <Col md={8}>
              <Party party={party} onRemove={handleRemovePokemon} />
              <Row>
                <Graph party={party} />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

function PokePagination({ page, setPage, pageLimit }) {
  const firstPage = () => { setPage(1); }
  const prevPage = () => { setPage(page > 1 ? page - 1 : 1); }
  const nextPage = () => { setPage(page < pageLimit ? page + 1 : pageLimit) }
  const lastPage = () => { setPage(pageLimit) }

  return (
    <>
      <Pagination>
        <Pagination.First key={1} onClick={firstPage} />
        <Pagination.Prev key={2} onClick={prevPage} />
        <Pagination.Item key={3} active>{page}</Pagination.Item>
        <Pagination.Next key={4} onClick={nextPage} />
        <Pagination.Last key={5} onClick={lastPage} />
      </Pagination>
    </>
  )
}

export default App;
