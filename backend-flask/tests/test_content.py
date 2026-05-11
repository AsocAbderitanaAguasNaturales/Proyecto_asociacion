import pytest

def test_get_noticias_vacia(client):
    """Prueba que la lista de noticias se obtiene correctamente (vacía inicialmente)"""
    response = client.get('/api/noticias')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_get_galeria_vacia(client):
    """Prueba que la galería se obtiene correctamente"""
    response = client.get('/api/galeria')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_comentario_sin_autenticar(client):
    """Prueba que no se puede comentar sin estar logueado"""
    response = client.post('/api/comentarios', json={"comentario": "Hola mundo"})
    assert response.status_code == 401
    assert "No autenticado" in response.get_json()['message']

def test_comentario_autenticado(client):
    """Prueba que un usuario logueado puede comentar"""
    # 1. Registrar y loguear usuario
    user_data = {
        "username": "commenter",
        "password": "Password123",
        "nombre": "C",
        "apellidos": "M",
        "dni": "33333333C",
        "telefono": "777666555",
        "email": "comment@example.com"
    }
    client.post('/api/registro', json=user_data)
    client.post('/api/login', json={"username": "commenter", "password": "Password123"})
    
    # 2. Enviar comentario
    response = client.post('/api/comentarios', json={"comentario": "Mi primer comentario"})
    assert response.status_code == 201
    assert response.get_json()['success'] is True
