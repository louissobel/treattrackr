import os

import flask
import mongoengine

import models

app = flask.Flask(__name__)
app.debug = True

# TODO: connect based on envvar for heroku.
mongoengine.connect('treattrackr-dev')

@app.route('/')
def index():
    return flask.redirect('/add_item')

@app.route('/add_item')
def add_item():
    return flask.render_template('add_item.html')

@app.route('/data')
def data():
    return flask.render_template('data.html')

# Admin endpoints
@app.route('/admin/')
def admin_index():
    return flask.render_template('admin/index.html')

@app.route('/admin/users/', methods=('GET', 'POST'))
def user_admin():
    """
    create or view users
    """
    if flask.request.method == 'GET':
        users = models.User.objects
        return flask.render_template('admin/users.html', users=users)
    else:
        # POST
        # Create the new user.
        user = models.User(username=flask.request.form['username'])
        user.save()
        return flask.redirect('/admin/users')

@app.route('/admin/users/<username>', methods=('GET', 'POST'))
def user_detail(username):
    """
    view or delete a user

    post is a delete
    """
    try:
        user = models.User.objects.get(username=username)
    except models.User.DoesNotExist:
        flask.abort(404, "No Such User")

    if flask.request.method == 'GET':
        history, _ = models.History.objects.get_or_create(user=user)
        return flask.render_template('admin/user_detail.html', user=user, history=history)
    else:
        # Post
        user.delete()
        return flask.redirect('/admin/users')

if __name__ == "__main__":
    app.run('0.0.0.0', port=6813)