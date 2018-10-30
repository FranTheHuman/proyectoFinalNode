'use strict'

import dotenv from 'dotenv'; 
dotenv.config();

module.exports = {
    development: {
        host: process.env.DB_HOST_DEV,
        database: process.env.DB_NAME_DEV,
        username: process.env.DB_USER_DEV,
        password: process.env.DB_PASS_DEV,
        dialect: 'postgres',
        pool: { max : 5, min: 0, idle: 10000 }
    },
    production: {
        host: process.env.DB_HOST_PRO,
        database: process.env.DB_NAME_PRO,
        username: process.env.DB_USER_PRO,
        password: process.env.DB_PASS_PRO,
        dialect: 'postgres',
        pool: { max : 5, min: 0, idle: 10000 }, 
    } 
 }