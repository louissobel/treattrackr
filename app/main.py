import os

import flask

app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return "Hello"

if __name__ == "__main__":
    app.run('0.0.0.0', port=6813)