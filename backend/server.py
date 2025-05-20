from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # <--- this line allows React to talk to Flask

# Replace this with your real linear regression model
def predict_salary(data):
    # Dummy encoding and prediction
    gender = 1 if data['gender'] == 'male' else 0
    title_map = {'Software Engineer': 1, 'Data Analyst': 2, 'Manager': 3}
    qual_map = {'Bachelors': 1, 'Masters': 2, 'PhD': 3}
    title = title_map.get(data['title'], 0)
    qual = qual_map.get(data['qualification'], 0)
    experience = float(data['experience'])

    # Example weight vector for prediction
    weights = np.array([5000, 3000, 2000, 1500, 10000])  # [bias, gender, title, qual, experience]
    features = np.array([1, gender, title, qual, experience])
    salary = np.dot(weights, features)
    return salary

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    salary = predict_salary(data)
    return jsonify({'predicted_salary': round(salary, 2)})

if __name__ == '__main__':
    app.run(debug=True)
