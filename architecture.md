flowchart TB
    User[👤 User (Browser)]
    
    subgraph Frontend["Angular Frontend (SPA)"]
        UI[Components & Pages]
        Services[Angular Services]
        Interceptor[Auth Interceptor]
        Routing[Route Guards]
    end

    subgraph Backend["Node.js + Express API"]
        API[REST Controllers]
        Middleware[Auth & Validation Middleware]
        ServicesBE[Business Services]
        Models[Mongoose Models]
    end

    subgraph Database["MongoDB"]
        Users[(Users)]
        Flights[(Flights)]
        Bookings[(Bookings)]
    end

    User -->|HTTP Requests| UI
    UI --> Services
    Services --> Interceptor
    Interceptor -->|JWT Token| API

    Routing -.-> UI

    API --> Middleware
    Middleware --> API
    API --> ServicesBE
    ServicesBE --> Models
    Models --> Database

    Database --> Models
    Models --> ServicesBE
    ServicesBE --> API
    API -->|JSON Response| UI
