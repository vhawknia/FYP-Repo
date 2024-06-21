import json

def jsonReader(filepath):
  """
  This function reads a JSON file from the specified path and returns the data as a Python object.

  Args:
      filepath (str): The path to the JSON file.

  Returns:
      object: The data parsed from the JSON file.

  Raises:
      FileNotFoundError: If the specified file is not found.
      JSONDecodeError: If there's an error parsing the JSON data.
      
  TODO: MAYBE, be able to decypt an encrypted json data. Maybe only the data needs to encrypted, the JSON format stays? IDK
  """
  try:
    with open(filepath, 'r') as json_file:
      data = json.load(json_file)
    return data
  except FileNotFoundError:
    raise FileNotFoundError(f"Error: JSON file not found at {filepath}")
  except json.JSONDecodeError:
    raise JSONDecodeError(f"Error: Unable to decode JSON data in {filepath}")

# Example usage (assuming the file is in the same directory)

"""
if __name__ == "__main__":
  data = read_json_file("accounts.json")
  print(data)
"""
