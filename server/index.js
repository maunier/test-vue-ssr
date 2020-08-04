require = require('esm')(module)
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')

const app = new Koa()

app.proxy = true
config.dev = !(app.env === 'production')

async function start () {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  const deployPort = port

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(deployPort)
  consola.ready({
    message: `Server listening on http://${host}:${deployPort}`,
    badge: true
  })
}
start()
