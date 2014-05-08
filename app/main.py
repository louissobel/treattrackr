import os
import json
import functools
import datetime

import flask
import mongoengine

import models

app = flask.Flask(__name__)
app.debug = True

mongo = os.environ.get('MONGOHQ_URL', 'treattrackr-dev')
mongoengine.connect(mongo)


def require_user(f):
    @functools.wraps(f)
    def inner(*args, **kwargs):
        username = flask.request.args.get('user')
        if username is None:
            return "Specifiy a username in the url like <code>localhost:6813/add_item?user=caloriecounter111"
        else:
            flask.g.user, _ = models.User.objects.get_or_create(username=username)
            return f(*args, **kwargs)
    return inner

@app.before_request
def default_admin_user():
    flask.g.user, _ = models.User.objects.get_or_create(username='admin')

@app.route('/')
def index():
    return flask.redirect('/add_item')

@app.route('/add_item')
@require_user
def add_item():
    # Get list of consumable items
    items = json.dumps([o.as_dict() for o in models.ConsumableItem.objects])
    history, _ = models.History.objects.get_or_create(user=flask.g.user)
    history_list = json.dumps([i.as_dict() for i in history.consumed_items])
    return flask.render_template('add_item.html', items=items, history=history_list)

@app.route('/data')
@require_user
def data():
    history, _ = models.History.objects.get_or_create(user=flask.g.user)
    history_list = json.dumps([i.as_dict() for i in history.consumed_items])
    return flask.render_template('data.html', history=history_list)

@app.route('/users/<user_id>/history', methods=('GET', 'POST'))
def user_history(user_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        flask.abort(404)
    history, _ = models.History.objects.get_or_create(user=user)

    if flask.request.method == "GET":
        return flask.jsonify({
            'count': len(history.consumed_items),
            'items': [i.as_dict() for i in history.consumed_items]
        })
    else:
        f = flask.request.form
        calories = f['calories']
        img_url = f['img_url']
        name = f['name']
        date = datetime.datetime.fromtimestamp(int(f['date']) / 1000) # it comes in as milliseconds
        quantity = f['quantity']
        item_type = f['item_type']
        if not all([item_type, quantity, date, name, img_url, calories]):
            flask.abort(400)

        new_item = models.ConsumedItem(
            calories=calories,
            img_url=img_url,
            name=name,
            date=date,
            quantity=quantity,
            item_type=item_type,
        )
        history.add_item(new_item)
        history.save()
        return flask.jsonify(new_item.as_dict())

@app.route('/users/<user_id>/history/<item_id>', methods=('POST',))
def delete_consumed_item(user_id, item_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        flask.abort(404)
    history, _ = models.History.objects.get_or_create(user=user)

    # find the consume item we want to delete
    item = None
    for consumed_item in history.consumed_items:
        if str(consumed_item.id) == item_id:
            item = consumed_item
            break
    if item is None:
        flask.abort(404)

    history.consumed_items.remove(item)
    history.save()
    return flask.jsonify(item.as_dict())

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

# Favicon!
@app.route('/favicon.ico')
def favi():
    return flask.redirect('/static/img/favicon.ico')

if __name__ == "__main__":
    app.run('0.0.0.0', port=6813)