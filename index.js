const watchify = require('watchify');
const fs = require('fs');
const browserify = require('browserify');
const tsify = require('tsify');
const http = require('http')

const b = browserify()
  .add('src/index.ts') // main entry of an application
  .plugin(tsify, { noImplicitAny: true })
  .plugin(watchify, {
    delay: 100,
    ignoreWatch: ['**/node_modules/**', 'out/'],
    poll: false
  })
  .on('update', bundle)

bundle()

function bundle() {
  console.log('changes detected')
  b.bundle(function(err, buf) {
    console.log('bundle complete')
    if (err) console.error(err)
    else fs.writeFile('out/bundle.js', buf, (err) => {
      if (err) throw err
      console.log('bundle saved')
    })
  })
}


const httpServer = http.createServer(function(req, res) {
  if (req.url === '/js/bundle.js') {
    fs.readFile('./out/bundle.js', function(err, data) {
      if (err) {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        return res.end();
      }
      res.statusCode = 200;
      res.write(data);
      return res.end();
    });
  } else {
    fs.readFile('./out/index.html', function(err, data) {
      if (err) {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        return res.end();
      }
      res.statusCode = 200;
      res.write(data);
      return res.end();
    });
  }
});

httpServer.listen(8080, function() {
  console.log('bitter server running')
});
