#!/usr/bin/env node

const yargs = require('yargs')
const download = require('../lib')

const argv = yargs
  .usage('$0', 'Download an hash via IPFS, falling back to an HTTP Gateway.')
  .scriptName('ipfs-or-gateway')
  .option('cid', {
    alias: 'c',
    describe: 'cid to download',
    type: 'string',
    demandOption: true
  }).option('path', {
    alias: 'p',
    describe: 'path to output the files',
    type: 'string',
    demandOption: true
  }).option('clean', {
    describe: 'clean path first',
    type: 'boolean'
  }).option('api', {
    alias: 'a',
    describe: 'api url',
    type: 'string'
  })
  .help()
  .argv

async function run () {
  try {
    const opts = {
      cid: argv.cid,
      path: argv.path,
      clean: argv.clean,
      api: argv.api
    }

    await download(opts)
    console.log(`Downloaded and extracted ${opts.cid} to ${opts.path}`)
  } catch (error) {
    console.error(error)
  }
}

run()
