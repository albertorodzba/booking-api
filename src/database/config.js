const mongosse =  require('mongoose');


class Database{

    constructor(){
        this.URI = process.env.DB_URI;
    
    }

    connect =  async() =>{
        try {
            await mongosse.connect(this.URI);
            console.log('Database connect');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    disconnect = async() => {
        try {
            await mongosse.disconnect();
            console.log('Database disconnect');
        } catch (error) {
            console.error(error);

        }
    }

}

module.exports = Database;