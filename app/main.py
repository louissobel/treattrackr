import os

import flask

app = flask.Flask(__name__)
app.debug = True


@app.route('/')
def index():
    return flask.redirect('/add_item')

@app.route('/add_item')
def add_item():
    return flask.render_template('add_item.html')

@app.route('/data')
def data():
    return flask.render_template('data.html')

if __name__ == "__main__":
    app.run('0.0.0.0', port=6813)