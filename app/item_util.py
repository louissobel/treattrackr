"""
dump and load consumableItems
"""
import sys
import json
import os

import mongoengine

from models import ConsumableItem

mongoengine.connect('treattrackr-dev', host=os.environ.get('MONGOHQ_URL'))

def die(msg):
    sys.stderr.write(msg + '\n')
    sys.exit(1)

try:
    command = sys.argv[1]
except IndexError:
    die("Use either --dump or --load <file>")

if sys.argv[1] == '--dump':
    # Dump them to json
    items = ConsumableItem.objects
    print json.dumps([i.as_dict() for i in items], indent=2)

elif sys.argv[1] == '--load':
    try:
        filename = sys.argv[2]
    except IndexError:
        die("<file> is required argument to --load")

    try:
        with open(filename) as f:
            c = f.read()
            try:
                items = json.loads(c)

                # DUMP the database
                ConsumableItem.objects.delete()
                for i in items:
                    print "Loading %s" % i['name']
                    del i['_id']
                    n = ConsumableItem(**i)
                    n.save()

            except ValueError:
                die("Error loading json from %s" % filename)

    except IOError as e:
        die("error opening file %s: %s" % (filename, str(e)))


else:
    die("Use iether --dump or --load <file>")