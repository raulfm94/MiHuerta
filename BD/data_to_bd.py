import re
import json
import pymongo
from tkinter import Tk
from tkinter import filedialog
from tkinter.filedialog import askopenfilename

Tk().withdraw()

filename = askopenfilename()


with open(filename, "r") as f:
		data = f.read()

with open('result.json', 'w') as fp:
	json.dump(data_to_dict(data), fp, indent=4)

connection = pymongo.MongoClient("mongodb://localhost/mihuerta")

db=connection.users
record1 = db.users
page = open("result.json", 'r')
parsed = json.loads(page.read())
for item in parsed:
	record1.insert(item)