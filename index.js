import dotenv from 'dotenv';
import express from 'express';
import MqttClient from './mqtt/mqtt-client.js';

dotenv.config()
const app = express()
const PORT = 3000;

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const mqttClient = new MqttClient(mqttOptions, ['test_topic']);
mqttClient.connect();

mqttClient.setMessageCallback((topic, message)=>{
  console.log(topic, message.toString())
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)  
})













