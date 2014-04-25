import mongoengine

class User(mongoengine.Document):
    username = mongoengine.StringField(unique=True)
