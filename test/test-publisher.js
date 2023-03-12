import mqtt from 'mqtt'
import dotenv from 'dotenv';
dotenv.config()

const mqttOptions = {
  host: process.env.MQTT_BROKER_HOST,
  port: process.env.MQTT_BROKER_PORT,
};

const client = mqtt.connect(mqttOptions);

client.on('connect', (connack) => {
  console.log('## test publisher connected')

  setInterval(()=>{
    client.publish('test_topic', 'hello');
  }, 1000)
});

