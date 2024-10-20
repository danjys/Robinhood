from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_socketio import SocketIO, emit
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing

app.config['SECRET_KEY'] = os.urandom(24).hex() # Generates a random 24-byte key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stocks.db'

db = SQLAlchemy(app)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Allow all origins

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    balance = db.Column(db.Float, default=10000)

class StockTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    stock_symbol = db.Column(db.String(10), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered!"}), 201

# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials!"}), 401

# Buy stock
@app.route('/buy', methods=['POST'])
@jwt_required()
def buy_stock():
    data = request.json
    stock_symbol = data['stock_symbol']
    quantity = data['quantity']

    # Fetch stock price from external API
    stock_data = requests.get(f"https://api.example.com/stock/{stock_symbol}").json()
    stock_price = stock_data['price']

    # Process the transaction (check balance, update DB, etc.)
    # ...

    return jsonify({"message": "Stock purchased!"})

# Get real-time stock prices via WebSocket
API_KEY = '3E3MW4NJ02CCR38X'

@socketio.on('stock_request')
def handle_stock_request(json_data):
    stock_symbol = json_data['stock_symbol']
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={stock_symbol}&interval=1min&apikey={API_KEY}'
    
    # Fetch stock data from Alpha Vantage
    response = requests.get(url)
    data = response.json()

    # Check if the response contains valid stock data
    try:
        last_refreshed = data["Meta Data"]["3. Last Refreshed"]
        stock_price = data["Time Series (1min)"][last_refreshed]["1. open"]
    except KeyError:
        stock_price = 0  # Handle error when symbol is invalid or data isn't available

    emit('stock_update', {'price': stock_price})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the tables
    socketio.run(app, debug=True)



