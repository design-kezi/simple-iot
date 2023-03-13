import mysql from 'mysql2';

class DB {
  constructor({host, user, password, database}){
    this.pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0
    });
    this.promisePool = this.pool.promise();
  }

  async insertTemperature({device_id, temperature, created_at}){
    const sql = `INSERT INTO temperature (device_id, temperature, created_at) values (?,?,?);`;
    const [rows,fields] = await this.promisePool.query(sql,[device_id, temperature, created_at]);
    return rows;
  }

  async insertHumidity({device_id, humidity, created_at}){
    const sql = `INSERT INTO humidity (device_id, humidity, created_at) values (?,?,?);`;
    const [rows,fields] = await this.promisePool.query(sql,[device_id, humidity, created_at]);
    return rows;
  }

  async getAllData(){
    const sql = `select * from temperature;`;
    const [rows,fields] = await this.promisePool.query(sql);
    return rows;
  }
}

export default DB