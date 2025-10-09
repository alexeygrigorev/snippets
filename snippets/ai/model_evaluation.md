---
title: "Model Evaluation"
description: "Techniques and metrics for evaluating machine learning model performance."
libraries:
  - scikit-learn
  - pandas
tags:
  - ai
  - evaluation
  - metrics
  - ml
---

Model evaluation is essential for understanding how well your machine learning model performs.

## Classification Metrics

```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Calculate various classification metrics
y_true = [0, 1, 1, 0, 1, 1]
y_pred = [0, 1, 1, 0, 0, 1]

accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"Accuracy: {accuracy:.2f}")
print(f"Precision: {precision:.2f}")
print(f"Recall: {recall:.2f}")
print(f"F1 Score: {f1:.2f}")
```

## Confusion Matrix

```python
from sklearn.metrics import confusion_matrix
import pandas as pd

# Create a confusion matrix
cm = confusion_matrix(y_true, y_pred)
cm_df = pd.DataFrame(cm, 
                      columns=['Predicted 0', 'Predicted 1'],
                      index=['Actual 0', 'Actual 1'])
print(cm_df)
```

These metrics help you understand model performance from different perspectives.
