import mqtt from 'mqtt'

class MqttClient {
  #options;
  #client;
  #topics;

  constructor(options, topics){
    this.#options = options;
    this.#topics = topics;
  }

  connect(){
    const self = this;
    self.#client = mqtt.connect(self.#options);    
    
    self.#client.on('connect', () => {
      console.log('## connected');

      self.#client.subscribe(self.#topics, (error) => {
        if (!error) {
          console.log(`## start to suscribe ${self.#topics}`);  
        } else {
          console.log(error)
        }
      });
    });

    self.#client.on('error', (error) => {
      console.log(error);
    });
  }

  setMessageCallback(cb){
    this.#client.on('message', cb);
  }
}

export default MqttClient;








