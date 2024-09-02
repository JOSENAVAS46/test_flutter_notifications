import React, { useState } from 'react';
import axiosRequest from './methods';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

const App = () => {
  const [appName, setAppName] = useState('app-adm-operaciones');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [choferId, setChoferId] = useState('');
  const [data, setData] = useState([{ key: '', value: '' }]);

  const handleDataChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const addDataField = () => {
    setData([...data, { key: '', value: '' }]);
  };

  const removeDataField = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const firebaseToken = await getFirebaseToken();
      const choferTokens = await getChoferTokens(choferId);
      const dataMap = data.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {});

      const notificationPayload = {
        message: {
          notification: {
            title: title,
            body: body
          },
          data: dataMap
        }
      };

      for (const deviceToken of choferTokens) {
        notificationPayload.message.token = deviceToken;
        await sendNotification(firebaseToken, notificationPayload, appName);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const getFirebaseToken = async () => {
    try {
      const data = await axiosRequest('get', process.env.REACT_APP_FIREBASE_API_URL);
      const token = data.token;
      return token;
    } catch (error) {
      console.error('Error fetching Firebase token:', error.response ? error.response.data : error.message);
    }
  };

  const getChoferTokens = async (choferId) => {
    try {
      const data = await axiosRequest('get', `${process.env.REACT_APP_CHOFER_TOKENS_URL}${choferId}`);
      return data.map(item => item.token);
    } catch (error) {
      console.error('Error fetching chofer tokens:', error);
    }
  };

  const sendNotification = async (firebaseToken, notificationPayload, appName) => {
    try {
      await axiosRequest('post', `${process.env.REACT_APP_FCM_API_URL}${appName}/messages:send`, notificationPayload, {
        Authorization: `Bearer ${firebaseToken}`
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Enviar Notificación</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la App:</Form.Label>
          <Form.Control
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ID del Chofer:</Form.Label>
          <Form.Control
            type="text"
            value={choferId}
            onChange={(e) => setChoferId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cuerpo:</Form.Label>
          <Form.Control
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Datos (key-value):</Form.Label>
          {data.map((field, index) => (
            <InputGroup className="mb-2" key={index}>
              <Form.Control
                type="text"
                placeholder="Key"
                value={field.key}
                onChange={(e) => handleDataChange(index, 'key', e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) => handleDataChange(index, 'value', e.target.value)}
              />
              <Button
                variant="danger"
                onClick={() => removeDataField(index)}
              >
                Eliminar
              </Button>
            </InputGroup>
          ))}
          <Button variant="primary" onClick={addDataField}>Agregar Data</Button>
        </Form.Group>
        <Button type="submit" variant="success">Enviar Notificación</Button>
      </Form>
    </Container>
  );
};

export default App;
