const express = require('express');

const app = express();

app.get('/',function(req, res){res.send('Hola Alex');});

app.listen(3000);
