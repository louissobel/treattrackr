import mongoengine

class ConsumedItem(mongoengine.EmbeddedDocument):
    calories = mongoengine.IntField()
    img_url = mongoengine.StringField()
    name = mongoengine.StringField()
    date = mongoengine.DateTimeField()
    quantity = mongoengine.StringField()
    item_type = mongoengine.StringField(choices=['food', 'exercise'])
