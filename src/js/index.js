import '../css/style.scss';
import json from '../assets/test';
import ReactLogo from '../assets/react.jpg';
import Post from './Post';
import Vue from 'vue';
import App from './vue/App';

const post = new Post('Webpack Post Title', ReactLogo);

console.log(post.toString());

console.log("JSON: ", json);

async function myAsyncFunc() {
return Promise.resolve('Async is working');
}

myAsyncFunc().then(m => console.log(m));

const unusedVariable = 88005553535;

new Vue({
  render: h => h(App),
}).$mount('#root');