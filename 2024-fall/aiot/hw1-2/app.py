import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Lasso
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.feature_selection import SelectKBest, f_regression
from sklearn.ensemble import RandomForestRegressor
import io

# Enable wide mode
st.set_page_config(layout="wide")

# CRISP-DM Steps
st.title("California Housing Prices Prediction")
st.header("CRISP-DM Methodology")

# Step 1: Business Understanding
st.subheader("1. Business Understanding")
st.write("Define the objective: Predict housing prices in California.")
st.write("Identify key metrics: Root Mean Squared Error (RMSE), R².")

# Step 2: Data Understanding
st.subheader("2. Data Understanding")
st.write("Load and explore the dataset.")

# Load the dataset
housing = fetch_california_housing()
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['MedHouseVal'] = housing.target

# Display dataset information
buffer = io.StringIO()
df.info(buf=buffer)
s = buffer.getvalue()
st.write("Data info:")
st.text(s)
st.write("Data describe:")
st.write(df.describe())

# Step 3: Data Preparation
st.subheader("3. Data Preparation")
st.write("Handle missing values, encode categorical variables, scale features, and split the data.")

# Handle missing values (if any)
df = df.dropna()

# Split the data into training and testing sets
X = df.drop('MedHouseVal', axis=1)
y = df['MedHouseVal']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Show training and testing set sizes
st.write(f"Training set size: {X_train.shape}")
st.write(f"Testing set size: {X_test.shape}")

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 4: Modeling
st.subheader("4. Modeling")
st.write("Select the Lasso model, perform feature selection, train the model, and print the results.")

# Initialize the Lasso model
lasso = Lasso(alpha=0.1)

# Perform feature selection and train the model
results = []
for num_features in range(1, X_train.shape[1] + 1):
    lasso.fit(X_train_scaled[:, :num_features], y_train)
    y_pred = lasso.predict(X_test_scaled[:, :num_features])
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    selected_features = X.columns[:num_features].tolist()
    results.append((num_features, selected_features, rmse, r2))

# Print the results
results_df = pd.DataFrame(results, columns=['Number of Features', 'Selected Features', 'RMSE', 'R²'])
st.write(results_df)

# Step 5: Evaluation
st.subheader("5. Evaluation")
st.write("Apply three different SOTA methods for feature selection, evaluate the model, print the results, and plot the results graph.")

# Method 1: Lasso
lasso = Lasso(alpha=0.1)
lasso.fit(X_train_scaled, y_train)
lasso_importances = np.abs(lasso.coef_)

# Method 2: Random Forest
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train_scaled, y_train)
rf_importances = rf.feature_importances_

# Method 3: SelectKBest
select_k_best = SelectKBest(score_func=f_regression, k='all')
select_k_best.fit(X_train_scaled, y_train)
skb_importances = select_k_best.scores_

# Evaluate and plot results for each method
methods = {'Lasso': lasso_importances, 'Random Forest': rf_importances, 'SelectKBest': skb_importances}
results_dict = {'Method': [], 'Number of Features': [], 'RMSE': [], 'R²': []}

for method, importances in methods.items():
    results = []
    for num_features in range(1, X_train.shape[1] + 1):
        selected_indices = np.argsort(importances)[-num_features:]
        lasso.fit(X_train_scaled[:, selected_indices], y_train)
        y_pred = lasso.predict(X_test_scaled[:, selected_indices])
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2 = r2_score(y_test, y_pred)
        selected_features = X.columns[selected_indices].tolist()
        results.append((num_features, selected_features, rmse, r2))
        
        # Append to results_dict for plotting
        results_dict['Method'].append(method)
        results_dict['Number of Features'].append(num_features)
        results_dict['RMSE'].append(rmse)
        results_dict['R²'].append(r2)
    
    # Print the results
    results_df = pd.DataFrame(results, columns=['Number of Features', 'Selected Features', 'RMSE', 'R²'])
    st.write(f"Results for {method}:")
    st.write(results_df)

# Convert results_dict to DataFrame for plotting
results_df = pd.DataFrame(results_dict)

# Define markers for each method
markers = {'Lasso': 'o', 'Random Forest': 's', 'SelectKBest': 'D'}

# Plot the RMSE results in a single graph
st.write("RMSE:")
fig_rmse = plt.figure(figsize=(14, 7))
for method in methods.keys():
    method_df = results_df[results_df['Method'] == method]
    plt.plot(method_df['Number of Features'], method_df['RMSE'], marker=markers[method], label=f'{method} RMSE')

plt.xlabel('Number of Features')
plt.ylabel('RMSE')
plt.title('Feature Selection Results - RMSE')
plt.legend()
st.pyplot(fig_rmse)

# Plot the R² results in a single graph
st.write("R²:")
fig_r2 = plt.figure(figsize=(14, 7))
for method in methods.keys():
    method_df = results_df[results_df['Method'] == method]
    plt.plot(method_df['Number of Features'], method_df['R²'], marker=markers[method], label=f'{method} R²')

plt.xlabel('Number of Features')
plt.ylabel('R²')
plt.title('Feature Selection Results - R²')
plt.legend()
st.pyplot(fig_r2)

# Step 6: Deployment
st.subheader("6. Deployment")
st.write("Create a Streamlit Application:")
st.write("- Integrate all the steps into a Streamlit application to visualize the results interactively.")
st.write("- The application will display data understanding, data visualization, modeling results, and evaluation results with different feature selection methods.")