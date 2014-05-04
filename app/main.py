import os
import json

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
    # Get list of consumable items
    items = json.dumps([o.as_dict() for o in models.ConsumableItem.objects])
    return flask.render_template('add_item.html', items=items)

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

@app.route('/admin/items/', methods=('GET', 'POST'))
def item_admin():
    """
    creates or views consumable items
    """
    if flask.request.method == "GET":
        items = models.ConsumableItem.objects
        return flask.render_template('admin/items.html', items=items)
    else:
        # Post
        f = flask.request.form
        item_type=f['item_type']
        name=f['name']
        default_quantity=f['default_quantity']
        default_calories=f['default_calories']
        img_url=f['img_url']

        if not all([item_type, name, default_quantity, default_calories, img_url]):
            flask.abort(400)
        item = models.ConsumableItem(
            item_type=f['item_type'],
            name=f['name'],
            default_quantity=f['default_quantity'],
            default_calories=int(f['default_calories']),
            img_url=f['img_url'],
        )
        item.save()
        return flask.redirect("/admin/items")

@app.route('/admin/items/<id>', methods=('GET', 'POST'))
def item_detail(id):
    """
    get shows,
    post edits
    """
    try:
        item = models.ConsumableItem.objects.get(id=id)
    except models.ConsumableItem.DoesNotExist:
        flask.abort(404)

    if flask.request.method == 'GET':
        return flask.render_template('admin/item_detail.html', item=item)
    else:
        # Post
        f = flask.request.form

        if f['action'] == 'delete':
            # Then do it.
            item.delete()
            return flask.redirect('/admin/items')

        item_type=f['item_type']
        name=f['name']
        default_quantity=f['default_quantity']
        default_calories=f['default_calories']
        img_url=f['img_url']

        if not all([item_type, name, default_quantity, default_calories, img_url]):
            flask.abort(400)

        item.item_type = item_type
        item.name = name
        item.default_quantity = default_quantity
        item.default_calories = default_calories
        item.img_url = img_url
        item.save()
        return flask.redirect('/admin/items/' + str(item.id))

if __name__ == "__main__":
    app.run('0.0.0.0', port=6813)