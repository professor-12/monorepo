import csv
import json

csv_file = "s.csv"
json_file = "output.json"

data = []
with open(csv_file, encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

with open(json_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)




# pcsk_6tWRev_76dzB9qbe5s7k6rQbgdTg9acKT1uummcjcqJ5QuYWmXWPYoSknQP9ojctjQTGzK