Exercise 0.6 from https://fullstackopen.com/en/part0/fundamentals_of_web_apps

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Request payload: {"content": "Esko tests AGAIN","date": "2023-01-19T13:10:35.913Z"}
    server->>browser: JSON string
    deactivate server
    Note left of server: {"message":"note created"}


```