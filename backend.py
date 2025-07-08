import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

def load_and_prepare_data(file_path):
    print("Loading and preparing data...")

    np.random.seed(42)
    n_samples = 1000

    start_date = datetime(2020, 1, 1).timestamp()
    end_date = datetime(2023, 12, 31).timestamp()
    dates = [datetime.fromtimestamp(np.random.uniform(start_date, end_date)) for _ in range(n_samples)]

    day_of_week = [d.weekday() for d in dates]
    month = [d.month for d in dates]
    hour = [np.random.randint(0, 24) for _ in range(n_samples)]

    lat_center, lon_center = 11.004556, 76.961632
    lat = [lat_center + np.random.normal(0, 0.05) for _ in range(n_samples)]
    lon = [lon_center + np.random.normal(0, 0.05) for _ in range(n_samples)]

    crime_types = ['Theft', 'Assault', 'Burglary', 'Robbery', 'Vandalism']
    crime_type = [np.random.choice(crime_types) for _ in range(n_samples)]

    df = pd.DataFrame({
        'date': [d.strftime('%Y-%m-%d') for d in dates],
        'day_of_week': day_of_week,
        'month': month,
        'hour': hour,
        'latitude': lat,
        'longitude': lon,
        'crime_type': crime_type
    })

    print(f"Data sample:\n{df.to_string()}")  
    print(f"Data shape: {df.shape}")

    return df

def preprocess_data(df):
    print("Preprocessing data...")
    df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek

    lat_bins = 20
    lon_bins = 20

    lat_min, lat_max = df['latitude'].min(), df['latitude'].max()
    lon_min, lon_max = df['longitude'].min(), df['longitude'].max()

    df['lat_bin'] = pd.cut(df['latitude'], bins=lat_bins, labels=False)
    df['lon_bin'] = pd.cut(df['longitude'], bins=lon_bins, labels=False)
    df['grid_cell'] = df['lat_bin'] * lon_bins + df['lon_bin']

    crime_counts = df['grid_cell'].value_counts()
    hotspot_threshold = crime_counts.quantile(0.75)
    hotspot_cells = crime_counts[crime_counts >= hotspot_threshold].index

    df['is_hotspot'] = df['grid_cell'].apply(lambda x: 1 if x in hotspot_cells else 0)

    X = df[['day_of_week', 'month', 'hour', 'lat_bin', 'lon_bin']]
    y = df['is_hotspot']

    return X, y, (lat_min, lat_max, lon_min, lon_max, lat_bins, lon_bins)

def train_model(X, y):
    print("Training model...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    numeric_features = ['day_of_week', 'month', 'hour', 'lat_bin', 'lon_bin']
    numeric_transformer = StandardScaler()

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features)
        ])

    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'Gradient Boosting': GradientBoostingClassifier(random_state=42)
    }

    best_model = None
    best_accuracy = 0

    for name, model in models.items():
        pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', model)
        ])

        pipeline.fit(X_train, y_train)

        y_pred = pipeline.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)

        print(f"{name} Accuracy: {accuracy:.4f}")
        print(f"Classification Report:\n{classification_report(y_test, y_pred)}")

        cm = confusion_matrix(y_test, y_pred)
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title(f'Confusion Matrix - {name}')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.show()

        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = pipeline

    print(f"Best model accuracy: {best_accuracy:.4f}")
    return best_model

def save_model(model, grid_info, output_path='crime_hotspot_model.pkl'):
    print(f"Saving model to {output_path}...")
    joblib.dump({'model': model, 'grid_info': grid_info}, output_path)
    print("Model saved successfully!")

def predict_hotspots(model, grid_info, time_features):
    lat_min, lat_max, lon_min, lon_max, lat_bins, lon_bins = grid_info

    lat_step = (lat_max - lat_min) / lat_bins
    lon_step = (lon_max - lon_min) / lon_bins

    predictions = []

    for lat_bin in range(lat_bins):
        for lon_bin in range(lon_bins):
            grid_cell = lat_bin * lon_bins + lon_bin

            features = pd.DataFrame({
                'day_of_week': [time_features['day_of_week']],
                'month': [time_features['month']],
                'hour': [time_features['hour']],
                'lat_bin': [lat_bin],
                'lon_bin': [lon_bin]
            })

            is_hotspot = model.predict(features)[0]
            hotspot_prob = model.predict_proba(features)[0][1]

            lat = lat_min + (lat_bin + 0.5) * lat_step
            lon = lon_min + (lon_bin + 0.5) * lon_step

            predictions.append({
                'latitude': lat,
                'longitude': lon,
                'is_hotspot': is_hotspot,
                'probability': hotspot_prob
            })

    return pd.DataFrame(predictions)

def main():
    df = load_and_prepare_data("crime_data.csv")

    X, y, grid_info = preprocess_data(df)

    model = train_model(X, y)

    save_model(model, grid_info)

    time_features = {
        'day_of_week': 5,
        'month': 7,
        'hour': 22
    }

    predictions = predict_hotspots(model, grid_info, time_features)
    print("\nHotspot predictions:")
    print(predictions[predictions['is_hotspot'] == 1].head())

    plt.figure(figsize=(10, 8))
    plt.scatter(
        predictions['longitude'],
        predictions['latitude'],
        c=predictions['probability'],
        cmap='hot_r',
        alpha=0.6,
        s=50
    )
    plt.colorbar(label='Hotspot Probability')
    plt.title('Crime Hotspot Prediction')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.show()

if __name__ == "__main__":
    main()