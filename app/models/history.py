import mongoengine
import bson

from user import User
from consumed_item import ConsumedItem

class History(mongoengine.Document):
    user = mongoengine.ReferenceField(User)
    consumed_items = mongoengine.ListField(
        mongoengine.EmbeddedDocumentField(ConsumedItem)
    )


    def add_item(self, consumed_item):
        consumed_item.id = bson.objectid.ObjectId()
        self.consumed_items.append(consumed_item)
        return self
