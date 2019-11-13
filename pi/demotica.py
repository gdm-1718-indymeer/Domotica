import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
import numpy as np
import sys
import os
import time

from sense_hat import SenseHat
from time import sleep

sense  = SenseHat()
sense.clear()
sense.set_rotation(180)
cred = credentials.Certificate("key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://demotica-1b701.firebaseio.com/'
})


AllCharacters = []

X = [255, 0, 0] 
Y = [255, 255, 0]  # Yellow
LB = [173, 216, 230]  # Lightblue
G = [0, 128, 0] # Green
Gb = [0, 129, 0] # Green
E = [0, 0, 0] # empty

def measure():
	#temp = sense.get_temperature()
    humidity = sense.get_humidity()
    temp = sense.get_temperature_from_humidity()
    db.reference('/temp').child("temperature").set(round(temp))
    db.reference('/temp').child("humidity").set(round(humidity))



def showRoom():
    ref = db.reference('/grid')
    snapshot = ref.get()
    for i in snapshot:
        #print('{0} => {1}'.format(key, val))
        if i == 2:
            AllCharacters.append(G)
        elif i == 0:
            AllCharacters.append(E)
        elif i == 3:
            AllCharacters.append(Gb)
        elif i == 4:
            AllCharacters.append(LB)
        elif i == 5:
            AllCharacters.append(Y)
       # print(AllCharacters)
    
    #print(AllCharacters)
    
    sense.set_pixels(AllCharacters)

def listener(event):
    #print(AllCharacters)
    print('Im watching')
    print(event.data)  # new data at /reference/event.path. None if deleted
    for i in event.data:
        if i == "voordeur":
            if event.data['voordeur'] == True:
                for (i, item) in enumerate(AllCharacters):
                    if item == [0, 128, 0]:
                        AllCharacters[i] = [255, 0, 0] 
                sense.set_pixels(AllCharacters)  
            elif event.data['voordeur'] == False:
                for (i, item) in enumerate(AllCharacters):
                    if item == [255, 0, 0]:
                        AllCharacters[i] = [0, 128, 0] 
                sense.set_pixels(AllCharacters)  
        elif i == "achterdeur":
            if event.data["achterdeur"] == True:
                for (i, item) in enumerate(AllCharacters):
                    if item == [0, 129, 0]:
                        AllCharacters[i] = [254, 0, 0] 
                sense.set_pixels(AllCharacters)
            elif event.data['achterdeur'] == False:
                for (i, item) in enumerate(AllCharacters):
                    if item == [254, 0, 0]:
                        AllCharacters[i] = [0, 129, 0] 
                sense.set_pixels(AllCharacters)    
        elif i == "stopcontacten":
            if event.data["stopcontacten"] == True:
                for (i, item) in enumerate(AllCharacters):
                    if item == [173, 216, 230]:
                        AllCharacters[i] = [0, 0, 139] 
                sense.set_pixels(AllCharacters)
            elif event.data['stopcontacten'] == False:
                for (i, item) in enumerate(AllCharacters):
                    if item == [0, 0, 139]:
                        AllCharacters[i] = [173, 216, 230] 
                sense.set_pixels(AllCharacters)         
        elif i == "lichtpunten":
            if event.data["lichtpunten"] == True:
                for (i, item) in enumerate(AllCharacters):
                    if item == [255, 255, 0]:
                        AllCharacters[i] = [110, 110, 0] 
                sense.set_pixels(AllCharacters)
            elif event.data['lichtpunten'] == False:
                for (i, item) in enumerate(AllCharacters):
                    if item == [110, 110, 0]:
                        AllCharacters[i] = [255, 255, 0] 
                sense.set_pixels(AllCharacters)   
        elif i == "Alarm":
            if event.data["Alarm"] == True:
                del AllCharacters[:]
                showRoom()
                while event.data["Alarm"] == True:
                    sense.gamma = [0] * 32
                    sense.gamma_reset()
                    db.reference('/Booleans').listen(listener)
                    if event.data['Alarm'] == False:
                        break
                break;        
            elif event.data['Alarm'] == False:
                sense.gamma_reset()
                sense.set_pixels(AllCharacters)   
    

try: 
    db.reference('/Booleans').listen(listener)
    showRoom()
    while True:
        measure()
        time.sleep(1)

     
except (KeyboardInterrupt, SystemExit):
	sense.clear()
	sys.exit(0)