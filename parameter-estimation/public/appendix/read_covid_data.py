#!/usr/bin/env python3
"""
Python script to read UM_C19_2021.csv and print the first 5 rows.
This script demonstrates basic CSV file reading using pandas.
"""

import pandas as pd
import sys
from pathlib import Path

def main():
    """Main function to read CSV and display first 5 rows."""
    try:
        # Define the CSV file path
        csv_file = "UM_C19_2021.csv"
        
        # Check if file exists
        if not Path(csv_file).exists():
            print(f"Error: File '{csv_file}' not found in current directory.")
            print("Please ensure the CSV file is in the same directory as this script.")
            sys.exit(1)
        
        # Read the CSV file
        print(f"Reading data from {csv_file}...")
        df = pd.read_csv(csv_file)
        
        # Add a new 'Total' column = Positive + Negative
        df['Total'] = df['Positive'] + df['Negative']
        
        # Display basic information about the dataset
        print(f"\nDataset shape: {df.shape[0]} rows, {df.shape[1]} columns")
        print(f"Columns: {list(df.columns)}")
        
        # Print the first 5 rows
        print("\nFirst 5 rows of the dataset:")
        print("=" * 50)
        print(df.head())
        
        # Display data types
        print("\nData types:")
        print("=" * 20)
        print(df.dtypes)
        
    except FileNotFoundError:
        print(f"Error: Could not find the file '{csv_file}'")
        sys.exit(1)
    except pd.errors.EmptyDataError:
        print("Error: The CSV file is empty")
        sys.exit(1)
    except pd.errors.ParserError as e:
        print(f"Error parsing CSV file: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
