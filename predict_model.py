import sys
import json
import joblib

model = joblib.load('hepatitis_model.pkl')

input_data = json.loads(sys.argv[1])
prediction = model.predict([input_data])
print(prediction[0])
