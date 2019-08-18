# webpack-nunjucks-boilerplate

Webpack boilerplate with SCSS, Babel for JS (es2015), and nunjucks for templating.

## Quickstart

For install the dependencies and run the project, open your bash/terminal in the root folder and run:

```bash
  npm install
  npm run watch
```

## Data Handling

The Nunjucks context make you able to use data under the development enviroment. You can follow the exemple below:

**First Part:** Create a new file in `/resources/data` like the exemple bellow: 

```javascript
// exemple.js
module.exports = {
  title: 'Exemple',
  list: [
    { title: 'Exemple list item 1' },
    { title: 'Exemple list item 2' },
    { title: 'Exemple list item 3' }
  ]
}
```

**Second:** Import the new file on `/resources/data/index.js`, save in a variable and then add it on the exported modules. For Exemple:

```javascript
const exemple = require('./exemple');

module.exports = {
  exemple
}
```

Now, you will be able to use the data in the project:

```html
<h1>{{ exemple.title }}</h1>

{% if exemple.list %}
  <ul>
    {% for item in exemple.list %}
      <li>{{ item.title }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

For more details about templating, visit the site of nunjucks clicking [here](https://mozilla.github.io/nunjucks/templating.html).

Project made with <3 under the MIT License.