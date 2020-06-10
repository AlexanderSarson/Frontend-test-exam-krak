import React, { useState } from 'react';
import { Form, Segment, Grid, Divider, Card } from 'semantic-ui-react';
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
    </React.Fragment>
  );
}
