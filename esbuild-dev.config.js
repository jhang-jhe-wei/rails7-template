const path = require('path')
const chokidar = require('chokidar')
const http = require('http')

const clients = []

http.createServer((req, res) => {
  return clients.push(
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive'
    })
  )
}).listen(8082)

async function builder() {
  const result = await require('esbuild').build({
    entryPoints: ['application.js'],
    bundle: true,
    outdir: path.join(process.cwd(), 'app/assets/builds'),
    absWorkingDir: path.join(process.cwd(), 'app/javascript'),
    incremental: true,
    banner: {
      js: ' (() => new EventSource("http://localhost:8082").onmessage = () => location.reload())();'
    }
  })

  chokidar.watch(['./app/javascript/**/*.{js,ts,tsx,jsx}', './app/views/**/*.html.erb', './app/assets/stylesheets/*.css']).on('all', (event, path) => {
    if (path.includes('javascript')) {
      result
        .rebuild()
        .then((rebuildResult) => {
          clients.forEach((res) => res.write('data: update\n\n'))
          clients.length = 0
        })
        .catch((e) => { console.error(e) })
    }
  })
}
builder()
