// import mysql from 'promise-mysql'

import {createConnection} from "typeorm";

// //application mysql connection options
// const conectionConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'test'
// }

// //set the database with the nysql library
// const pool:any = mysql.createPool(conectionConfig)

// //connect to the database
// pool.getConnection()
//     .then((connection: any) => {
//         pool.releaseConnection(connection)
//         console.log('Database connected.')
//     })

// export default pool

// var connection = createConnection({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "",
//     database: "capitalhardware",
//     entities: [
//         __dirname + "/entity/*.ts"
//     ],
//     synchronize: true,
// });

// export default 

const dbConnection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "capitalhardware",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true,
})

export default  dbConnection

