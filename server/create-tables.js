var server = require('./server')
var ds = server.dataSources.postgres
var tables = ['group', 'income']
ds.automigrate(tables, function(er) {
  if (er) throw er
  console.log('Loopback tables [' + tables + '] created in ', ds.adapter.name)
  ds.disconnect()
})
