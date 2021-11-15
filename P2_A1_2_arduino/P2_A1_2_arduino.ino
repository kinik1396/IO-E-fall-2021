#include "Arduino_SensorKit.h"

float sensors[3];

void setup() {
  
  Serial.begin(9600);
  while(!Serial);
  
  Accelerometer.begin();
}

void loop() {
  sensors[0] = (Accelerometer.readX() * 100);
  sensors[1] = (Accelerometer.readY()* 100);
  sensors[2] = (Accelerometer.readZ()* 100);        

  for(int i = 0; i < 3; i++){
    int sensorPrint = sensors[i];

    Serial.print(sensorPrint);
    if(i == 2){
      Serial.println();
    } else {
      Serial.print(", ");
    }
  }
  
 
  delay(100);
}
