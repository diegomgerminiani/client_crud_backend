const { driver, auth } = require('neo4j-driver')

const URL = process.env.DB_URL
const USER = process.env.DB_USER
const PASS = process.env.DB_PASS

exports.driver = driver(URL, auth.basic(USER, PASS))