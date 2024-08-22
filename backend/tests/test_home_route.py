from app import create_app

app = create_app()


def test_home_route():
    response = app.test_client().get("/")
    assert response.status_code == 200
    assert b"Hello World!!!" in response.data
