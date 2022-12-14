'use strict'

const { Sequelize, DataTypes, Model, Op } = require('sequelize')

class MysqlConnection {
    constructor (config) {
        // if (!connectionConfig.pool) connectionConfig.pool = { min: 0, max: 3 } // default
        this.config = config
    }
    connect() {
        console.log('connecting to mysql server...')
        let opt = {}
        if (this.config.debug) {
            opt['logging'] = (...msg) => console.log(msg)
        }
        if (this.config.pool) {
            opt.pool = this.this.config.pool
        }
        this.ctl = new Sequelize(this.config.dsn, opt)
        return this
    }

    async testConnection () {

    }
}

class MysqlClient {
    constructor({ dsn, debug, models }) {
        this.connectionConfig = { dsn, debug }
        this.models = models
    }

    getContext() {
        return knex
    }

    async start() {
        try {
            const con = new MysqlConnection(this.connectionConfig).connect()
            await con.testConnection()
            let models = {}
            for (const m in this.models) {
                models[m] = this.models[m](con.ctl, {Model, DataTypes, Op})
                await models[m].sync()
            }
            console.log('Mysql Connected')
            return models
        } catch (err) {
            console.error('Mysql Error', err)
        }
    }
}

module.exports = MysqlClient