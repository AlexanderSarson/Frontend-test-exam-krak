import React, { useState, useEffect } from 'react';
import { Form, Segment, Grid, Divider, Card, Button } from 'semantic-ui-react';
import facade from '../api/apiFacade';

export default function Hobbies() {
  const initialStateHobby = {
    id: null,
    name: '',
    description: ''
  };
  const [loadHobbies, setLoadHobbies] = useState(false);
  const [editHobby, setEditHobby] = useState(initialStateHobby);
  const [hobbies, setHobbies] = useState([]);
  useEffect(() => {
    facade.fetchData(`/api/hobby/all`).then((response) => {
      setHobbies(response);
    });
  }, [loadHobbies]);

  const deleteHobby = (hobby) => {
    facade
      .avancedFetchData('/api/hobby', facade.makeOptions('DELETE', true, hobby))
      .then(() => {
        setLoadHobbies(!loadHobbies);
      });
  };
  const editHobbies = (hobby) => {
    setEditHobby(hobby);
  };

  const onSubmitEditHobby = (hobby) => {
    facade
      .avancedFetchData('/api/hobby', facade.makeOptions('PUT', true, hobby))
      .then(() => {
        setLoadHobbies(!loadHobbies);
        setEditHobby(initialStateHobby);
      });
  };

  const onSubmitNewHobby = (hobby) => {
    facade
      .avancedFetchData('/api/hobby', facade.makeOptions('POST', true, hobby))
      .then(() => {
        setLoadHobbies(!loadHobbies);
      });
  };

  return (
    <React.Fragment>
      <h1>Edit hobbies</h1>
      <NewHobby onSubmitNewHobby={onSubmitNewHobby} />
      <Segment>
        <Grid columns={2} stackable textAlign='left'>
          <Divider vertical />

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <PrintHobbyCards
                hobbies={hobbies}
                deleteHobby={deleteHobby}
                editHobbies={editHobbies}
              />
            </Grid.Column>

            <Grid.Column>
              <EditHobby
                editHobby={editHobby}
                onSubmitEditHobby={onSubmitEditHobby}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
}

function EditHobby({ editHobby, onSubmitEditHobby }) {
  const [hobby, setHobby] = useState({});
  useEffect(() => {
    setHobby(editHobby);
  }, [editHobby]);
  const onChange = (evt) => {
    setHobby({ ...hobby, [evt.target.id]: evt.target.value });
  };
  return (
    <React.Fragment>
      <h3>Edit Hobby</h3>
      <Form onSubmit={() => onSubmitEditHobby(hobby)}>
        <Form.Group>
          <Form.Input
            placeholder='Name'
            id='name'
            name='name'
            value={hobby.name}
            onChange={onChange}
          />
          <Form.Input
            placeholder='Description'
            id='description'
            name='description'
            value={hobby.description}
            onChange={onChange}
          />
          <Form.Button content='Submit' />
        </Form.Group>
      </Form>
    </React.Fragment>
  );
}

function PrintHobbyCards({ hobbies, deleteHobby, editHobbies }) {
  return (
    <React.Fragment>
      {hobbies.map((hobby) => {
        return (
          <Card key={hobby.id}>
            <Card.Content header={hobby.name} />
            <Card.Content description={hobby.description} />
            <Card.Content extra>
              <Button onClick={() => deleteHobby(hobby)}>DELETE</Button>
              <Button onClick={() => editHobbies(hobby)}>EDIT</Button>
            </Card.Content>
          </Card>
        );
      })}
    </React.Fragment>
  );
}

function NewHobby({ onSubmitNewHobby }) {
  const initialState = {
    name: '',
    description: ''
  };
  const [hobby, setHobby] = useState(initialState);
  const onChange = (evt) => {
    setHobby({ ...hobby, [evt.target.id]: evt.target.value });
  };
  return (
    <React.Fragment>
      <React.Fragment>
        <h3>New Hobby</h3>
        <Form
          onSubmit={() => {
            onSubmitNewHobby(hobby);
            setHobby(initialState);
          }}
        >
          <Form.Group>
            <Form.Input
              placeholder='Name'
              id='name'
              name='name'
              value={hobby.name}
              onChange={onChange}
            />
            <Form.Input
              placeholder='Description'
              id='description'
              name='description'
              value={hobby.description}
              onChange={onChange}
            />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>
      </React.Fragment>
    </React.Fragment>
  );
}
