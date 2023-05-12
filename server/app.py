from api import create_app

app = create_app("dev")

if __name__ == "__main__":
    print(app.url_map)
    app.run(port=5000)
