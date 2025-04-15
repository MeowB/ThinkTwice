graph TD
A[User browsing site] -->|Types comment| B[Content Script]
B -->|Sends text| C[Backend API /analyze]
C -->|Calls| D[Perspective API]
D -->|Returns scores| C
C -->|Stores in DB + returns to extension| B
B -->|Blur / highlight toxic content| A

E[Dashboard UI] -->|GET /logs| C
