import pytest
from passlib.hash import pbkdf2_sha256

@pytest.fixture
def logged_admin(client):
    """Fixture para tener un administrador logueado"""
    # Crear admin directamente en el mock
    passwd_hash = pbkdf2_sha256.hash("Admin123")
    admin_data = {
        "username": "adminuser",
        "password": passwd_hash,
        "nombre": "Admin",
        "apellidos": "Test",
        "dni": "99999999Z",
        "telefono": "000000000",
        "email": "admin@test.com",
        "rol": "admin"
    }
    
    # Usamos el endpoint de login (después de registrarlo o insertarlo)
    # Para ser más realistas, lo registramos si el sistema lo permite o lo inyectamos
    # En este caso, lo inyectamos simulando el comportamiento de inicialización
    from main import miembros_col
    miembros_col.insert_one(admin_data)
    
    client.post('/api/login', json={"username": "adminuser", "password": "Admin123"})
    return client

def test_acceso_admin_denegado_a_miembro(client):
    """Prueba que un usuario normal no puede ver la lista de miembros"""
    # Registrar y loguear usuario normal
    client.post('/api/registro', json={
        "username": "normaluser", "password": "Password123", "nombre": "N", "apellidos": "U",
        "dni": "44444444D", "telefono": "123123123", "email": "normal@test.com"
    })
    client.post('/api/login', json={"username": "normaluser", "password": "Password123"})
    
    response = client.get('/api/miembros')
    assert response.status_code == 403
    assert "Acceso denegado" in response.get_json()['message']

def test_acceso_admin_permitido(logged_admin):
    """Prueba que el admin puede ver la lista de miembros"""
    response = logged_admin.get('/api/miembros')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_admin_crear_noticia(logged_admin):
    """Prueba que el admin puede crear una noticia"""
    noticia = {
        "titulo": "Noticia Test Admin",
        "descripcion": "Descripción de prueba",
        "imagen": "url_imagen.jpg"
    }
    response = logged_admin.post('/api/admin/noticias/nuevo', json=noticia)
    assert response.status_code == 201
    assert "Noticia añadida correctamente" in response.get_json()['mensaje']

def test_admin_eliminar_miembro(logged_admin):
    """Prueba que el admin puede eliminar a un usuario por su DNI"""
    # 1. Crear usuario a eliminar
    dni_a_borrar = "55555555K"
    from main import miembros_col
    miembros_col.insert_one({
        "username": "borrar", "dni": dni_a_borrar, "rol": "miembro"
    })
    
    # 2. Eliminarlo
    response = logged_admin.delete(f'/api/admin/miembros/{dni_a_borrar}')
    assert response.status_code == 200
    assert "Miembro eliminado correctamente" in response.get_json()['message']
