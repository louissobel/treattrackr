import mongoengine

from user import User
from consumed_item import ConsumedItem

class History(mongoengine.Document):
    user = mongoengine.ReferenceField(User)
    consumed_items = mongoengine.ListField(
        mongoengine.EmbeddedDocumentField(ConsumedItem)
    )
