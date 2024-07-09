import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.APP_DATABASE || 'learnaz_hub';

const url = `mongodb://${host}:${port}`;

class DBClient {
    constructor() {
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.connectDB();
    }


    async connectDB() {
        try {
            await this.client.connect();
            console.log('Database connected successfully');
            this.db = this.client.db(database);
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }


    isAlive() {
        if (this.client.topology.isConnected()) {
            return true
        }
        return false;
    }
    async nbUsers() {
        const allUsers = await this.db.collection('users').countDocuments();
        return allUsers;
    }

    async nbFiles() {
        const allFiles = await this.db.collection('files').countDocuments();
        return allFiles;
    }
}
const dbClient = new DBClient();

export default dbClient;