import mongoengine

class ConsumableItem(mongoengine.Document):
    img_url = mongoengine.StringField()
    name = mongoengine.StringField()
    default_quantity = mongoengine.StringField()
    default_calories = mongoengine.IntField()
    item_type = mongoengine.StringField(choices=['food', 'exercise'])

    def as_dict(self):
        return {
            'img_url': self.img_url,
            'name': self.name,
            'default_quantity': self.default_quantity,
            'default_calories': self.default_calories,
            'item_type': self.item_type,
            '_id': str(self.id)
        }
