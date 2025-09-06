flowchart TD
    A[Landing Page] --> B[Click Sign Up]
    A --> G[Click Sign In]
    B --> C[Sign Up Page]
    C --> D[Submit Sign Up Form]
    D --> E{Sign Up Success}
    E -- Yes --> G
    E -- No --> C
    G --> H[Sign In Page]
    H --> I[Submit Sign In Form]
    I --> J{Sign In Success}
    J -- Yes --> K[Dashboard]
    J -- No --> H
    H --> L[Forgot Password]
    L --> M[Password Reset Request Page]
    M --> N[Submit Email for Password Reset]
    N --> O[Email Sent Confirmation]
    O --> P[Reset Password Page via Link]
    P --> Q[Submit New Password]
    Q --> H
    K --> R[Header Dropdown]
    K --> U[Sidebar Navigation]
    U -- Overview --> K
    U -- Filters --> X[Filters Panel]
    U -- Settings --> S[Settings Page]
    X --> Y[Apply Filters]
    Y --> K
    S --> T[Submit Account Settings]
    T --> Z{Settings Update Success}
    Z -- Yes --> AA[Show Confirmation and Back Link]
    AA --> K
    Z -- No --> S
    R -- Sign Out --> AB[Sign Out Action]
    R -- Settings --> S
    AB --> AC[Call Sign Out API]
    AC --> AD[Clear Session]
    AD --> H
    AE{Authenticated User}
    AE -- No --> H
    AE -- Yes --> K
    AF{API Call Returns Unauthorized}
    AF -- Yes --> AD
    AF -- No --> AG[Continue Normal Flow]
    AG --> AH[Fallback Error Page]
    AH --> A