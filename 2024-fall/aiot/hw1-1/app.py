import matplotlib
matplotlib.use('Agg')

from flask import Flask, request, render_template, session
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import io
import base64

app = Flask(__name__)
app.secret_key = '7113056077'  # Replace with a secure secret key

# Set the random seed once when the application starts
np.random.seed(42)

@app.route('/', methods=['GET', 'POST'])
def index():
    # Default values
    default_a = 3.0
    default_b = 4.0
    default_noise = 1.0
    default_num_points = 100

    if request.method == 'POST':
        # Get user inputs
        a = float(request.form.get('a', default_a))
        b = float(request.form.get('b', default_b))
        noise = float(request.form.get('noise', default_noise))
        num_points = int(request.form.get('num_points', default_num_points))

        # Store the parameters in the session
        session['a'] = a
        session['b'] = b
        session['noise'] = noise
        session['num_points'] = num_points

        # Generate dataset
        X = 2 * np.random.rand(num_points, 1)
        y = a * X + b + noise * np.random.randn(num_points, 1)

        # Prepare the data
        X = X.reshape(-1, 1)
        y = y.reshape(-1, 1)

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train a linear regression model
        model = LinearRegression()
        model.fit(X_train, y_train)

        # Predict on the test set
        y_pred = model.predict(X_test)

        # Plot the training data, testing data, and regression line
        plt.figure(figsize=(10, 6))
        plt.scatter(X_train, y_train, color='green', label='Training Data')
        plt.scatter(X_test, y_test, color='blue', label='Testing Data')
        plt.plot(X_test, y_pred, color='red', linewidth=2, label='Regression Line')
        plt.xlabel('X')
        plt.ylabel('y')
        plt.title('Training and Testing Data with Regression Line')
        plt.legend()

        # Save the plot to a string buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        plot_url = base64.b64encode(buf.getvalue()).decode('utf8')
        plt.close()

        return render_template('index.html', plot_url=plot_url, mse=mean_squared_error(y_test, y_pred), 
                               a=a, b=b, noise=noise, num_points=num_points)

    # Retrieve parameters from session if available
    a = session.get('a', default_a)
    b = session.get('b', default_b)
    noise = session.get('noise', default_noise)
    num_points = session.get('num_points', default_num_points)

    return render_template('index.html', 
                           a=a, b=b, noise=noise, num_points=num_points)

if __name__ == '__main__':
    app.run(debug=True)