TreatTrackr
========

6.813 Project


Getting Mongo working
===================

Ok - using mongo on the backend. Here are (hopefully) sufficient instructions
for getting things up and running.

1. Install Mongo
------------------

 - You should do this using [Homebrew](http://brew.sh/), so make sure you have that installed
 - install mongo: `brew install mongodb`
 - note the output at the end of the install which will tell you how to make sure that 
   mongo is always running, you should probably follow those instructions, it will
   make your life easier.

2. Install and set up virtualenv
--------------------

Virtualenv is a tool to isolate python projects, which may have different dependencies,
from eachother. It is a very useful tool.

 - you already have pip, so `sudo pip install virtualenv` should do it.
 - then, from inside the `treattrackr` folder, do `virtualenv env`.
 - next, run `source env/bin/activate`
 - you'll have to run `source env/bin/activate` in every terminal you open for treattrackr.

3. Install dependencies
-------------------------

With virtualenv, this is easy:

`pip install -r requirements.txt`

This will install all the dependencies listed into a subdirectory of the `env` folder you just created.

4. Confirm things are working
------------------------

 - `python app/main.py`
 - go to `localhost:6813/admin/users` and try to create a user

