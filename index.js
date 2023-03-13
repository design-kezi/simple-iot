import dotenv from 'dotenv';
import express from 'express';
import MqttClient from './mqtt/mqtt-client.js';
import DB from './db/db.js';

dotenv.config()
const app = express()
const PORT = 3000;
const SUB_TOPIC_INDEX = 2;
const db = new DB({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const mqttClient = new MqttClient(mqttOptions, ['data/#']);
mqttClient.connect();

mqttClient.setMessageCallback(async (topic, message)=>{
  console.log(topic, message.toString());

  try{
    const subTopic = topic.split('/')[SUB_TOPIC_INDEX];
    const messageJson = JSON.parse(message);
    switch(subTopic){
      case 'temperature':
        await db.insertTemperature({
          device_id: messageJson.device_id,
          temperature: messageJson.temperature,
          created_at: new Date(messageJson.timestamp),
        })
        break;
      case 'humidity':
        await db.insertHumidity({
          device_id: messageJson.device_id,
          humidity: messageJson.humidity,
          created_at: new Date(messageJson.timestamp),
        })
        break;
    }
  }catch(error){
    console.log(error);
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)  
})







