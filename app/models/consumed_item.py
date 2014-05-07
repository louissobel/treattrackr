import time

import mongoengine

class ConsumedItem(mongoengine.EmbeddedDocument):
    calories = mongoengine.IntField()
    img_url = mongoengine.StringField()
    name = mongoengine.StringField()
    date = mongoengine.DateTimeField()
    quantity = mongoengine.StringField()
    item_type = mongoengine.StringField(choices=['food', 'exercise'])
    id = mongoengine.ObjectIdField()

    def as_dict(self):
        return {
            'calories':self.calories,
            'img_url':self.img_url,
            'name':self.name,
            'date': self.format_date(),
            'quantity':self.quantity,
            'item_type':self.item_type,
            'id':str(self.id),
        }

    def format_date(self):
        if isinstance(self.date, basestring):
            return self.date
        else:
            return time.mktime(self.date.timetuple()) * 1000
    