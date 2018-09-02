import Router from './config/router.js';

const app = document.createElement('div');

let router = new Router();
router.init();

document.getElementById('root').appendChild(app);