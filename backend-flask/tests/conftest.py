import pytest
import mongomock
import os


# Forzamos que MONGO_URL exista antes de cargar nada
os.environ["MONGO_URL"] = "mongodb://localhost:27017/testdb"

@pytest.fixture(scope="session", autouse=True)
def setup_mock_mongodb():
    """Parchea la conexión a MongoDB para toda la sesión de tests"""
    with mongomock.patch():
        yield

@pytest.fixture
def client():
    # Importación tardía para asegurar que el parche de mongomock ya esté activo
    from main import app
    app.config['TESTING'] = True
    with app.test_client() as client:
        # Limpiar sesión
        with client.session_transaction() as sess:
            sess.clear()
        yield client

@pytest.fixture(autouse=True)
def clean_db():
    """Limpia las colecciones antes de cada test para asegurar aislamiento"""
    from main import db
    colecciones = db.db.list_collection_names()
    for col in colecciones:
        db.db[col].delete_many({})
    yield
