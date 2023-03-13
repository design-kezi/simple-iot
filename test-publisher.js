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
    console.log("## published")
    client.publish('data/202303AIOTM1/temperature', JSON.stringify({
      device_id: 1,
      temperature: 20, 
      timestamp: Date.now(),
    }));

    client.publish('data/202303AIOTM1/humidity', JSON.stringify({
      device_id: 1,
      humidity: 20, 
      timestamp: Date.now(),
    }));
  }, 1000)
});

