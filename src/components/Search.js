import React, { useState } from 'react';
import { Form, Segment, Grid, Divider, Card, Button } from 'semantic-ui-react';
import facade from '../api/apiFacade';

export default function Search() {
  const initialSearchType = {
    id: false,
    email: false
  };
  const initialSearch = {
    id: '',
    email: '',
    phone: ''
  };
  const initialPerson = {
    id: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: ''
  };
  const [search, setSearch] = useState(initialSearch);
  const [person, setPerson] = useState(initialPerson);
  const [searchType, setSearchType] = useState(initialSearchType);

  const searchForPerson = (searchType) => {
    facade
      .fetchData(`/api/person/${searchType}/${search[searchType]}`)
      .then((response) => {
        setSearch(initialSearch);
        setPerson(response);
      });
  };

  const onChange = (evt) => {
    setSearch({ ...search, [evt.target.id]: evt.target.value });
    setSearchType({ ...initialSearchType, [evt.target.id]: true });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (searchType.email) {
      searchForPerson('email');
    } else {
      searchForPerson('id');
    }
    setSearchType(initialSearchType);
  };
  return (
    <React.Fragment>
      <h1>Search page</h1>
      <Segment>
        <h4>Search by ID or Email</h4>
        <Grid columns={2} stackable textAlign='left'>
          <Divider vertical />

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Form onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Input
                    placeholder='id'
                    id='id'
                    name='id'
                    value={search.id}
                    onChange={onChange}
                  />
                  <Form.Input
                    placeholder='Email'
                    id='email'
                    name='email'
                    value={search.email}
                    onChange={onChange}
                  />
                  <Form.Button content='Submit' />
                </Form.Group>
              </Form>
            </Grid.Column>

            <Grid.Column>
              {person.id && (
                <Card>
                  <Card.Content
                    header={`${person.firstName} ${person.lastName}`}
                  />
                  <Card.Content description={`Email: ${person.email}`} />
                  <Card.Content description={`Phone: ${person.phone}`} />
                </Card>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <SearchByHobby />
      <GetAllHobbies />
    </React.Fragment>
  );
}

function SearchByHobby() {
  const [people, SetPeople] = useState([]);
  const [hobby, setHobby] = useState('');

  const onChange = (evt) => {
    setHobby(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    facade.fetchData(`/api/person/hobby/${hobby}`).then((response) => {
      SetPeople(response);
      setHobby('');
    });
  };
  return (
    <React.Fragment>
      <Segment>
        <h4>Search by hobbies</h4>
        <Grid columns={2} stackable textAlign='left'>
          <Divider vertical />

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Form onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Input
                    placeholder='hobby'
                    id='hobby'
                    name='hobby'
                    value={hobby}
                    onChange={onChange}
                  />
                  <Form.Button content='Submit' />
                </Form.Group>
              </Form>
            </Grid.Column>

            <Grid.Column>
              <PrintPeopleCards people={people} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
}

function GetAllHobbies() {
  const [hobbies, setHobbies] = useState([]);
  const onClick = () => {
    facade.fetchData(`/api/hobby/all`).then((response) => {
      setHobbies(response);
    });
  };
  return (
    <React.Fragment>
      <Segment>
        <h4>Get all hobbies</h4>
        <Grid columns={2} stackable textAlign='left'>
          <Divider vertical />
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Button onClick={onClick}>Get hobbies</Button>
            </Grid.Column>
            <Grid.Column>
              <PrintHobbyCards hobbies={hobbies} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
}

function PrintHobbyCards({ hobbies }) {
  return (
    <React.Fragment>
      {hobbies.map((hobby) => {
        return (
          <Card key={hobby.name}>
            <Card.Content header={hobby.name} />
            <Card.Content description={hobby.description} />
          </Card>
        );
      })}
    </React.Fragment>
  );
}

function PrintPeopleCards({ people }) {
  return (
    <React.Fragment>
      {people.map((person) => {
        return (
          <Card key={person.id}>
            <Card.Content header={`${person.firstName} ${person.lastName}`} />
            <Card.Content description={`Email: ${person.email}`} />
            <Card.Content description={`Phone: ${person.phone}`} />
          </Card>
        );
      })}
    </React.Fragment>
  );
}
