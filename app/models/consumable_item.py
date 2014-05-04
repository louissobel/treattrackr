import mongoengine

class ConsumableItem(mongoengine.Document):
    img_url = mongoengine.StringField()
    name = mongoengine.StringField()
    default_quantity = mongoengine.StringField()
    default_calories = mongoengine.IntField()
    item_type = mongoengine.StringField(choices=['food', 'exercise'])
