require('dotenv').config(); // Cargar las variables de entorno desde .env

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = process.env.PORT_WEBHOOK || 2000; // Ahora toma el puerto desde las variables de entorno o 2000 por defecto

// Tu cadena secreta configurada en GitHub, ahora puede estar en el archivo .env
const secret = process.env.GITHUB_SECRET || ''; // Usar la cadena secreta desde el .env

const server = http.createServer((req, res) => {
  try {
    console.log(req.method);
    console.log(req.url);

    if (
      req.method === 'POST' &&
      req.url === `/${process.env.LABEL_URL}`
    ) {
      console.log('Webhook recibido');
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      console.log('Recibiendo datos');
      req.on('end', () => {
        try {
          const sig = req.headers['x-hub-signature'];
          console.log('Verificando firma', sig);
          console.log('Headers', req.headers);
          
          if (!sig) {
            res.statusCode = 403;
            res.end('No signature');
            return;
          }

          const hmac = crypto.createHmac('sha1', secret);
          const digest = 'sha1=' + hmac.update(body).digest('hex');
          if (sig !== digest) {
            res.statusCode = 403;
            res.end('Invalid signature'); return;
          }

          const payload = JSON.parse(body);
          if (payload.ref === 'refs/heads/' + process.env.BRANCH) {
            exec('./deploy.sh', (error, stdout, stderr) => {
              if (error) {
                console.error(`Error ejecutando el script: ${error}`);
                res.statusCode = 500;
                res.end('Error ejecutando el script');
                return;
              }
              console.log(
                `Despliegue completado ${process.env.BRANCH} ${process.env.LABEL_URL}: ${stdout}`,
              );
              res.statusCode = 200;
              res.end('Despliegue completado');
            });
          } else {
            res.statusCode = 200;
            res.end('No se requiere despliegue');
          }
        } catch (error) {
          console.error(`Error procesando el webhook ${process.env.LABEL_URL}: ${error}`);
          res.statusCode = 500;
          res.end(`Error procesando el webhook ${process.env.LABEL_URL}`);
        }
      });
    } else {
      res.statusCode = 404;
      res.end('Not found');
    }
  } catch (error) {
    console.error(`Error en el servidor: ${error}`);
    res.statusCode = 500;
    res.end('Error en el servidor');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
