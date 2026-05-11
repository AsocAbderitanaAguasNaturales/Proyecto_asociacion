

def test_registro_usuario(client):
    """Prueba que un usuario se puede registrar correctamente"""
    nuevo_usuario = {
        "username": "testuser",
        "password": "Password123",
        "nombre": "Test",
        "apellidos": "User",
        "dni": "12345678A",
        "telefono": "666777888",
        "email": "test@example.com"
    }
    response = client.post('/api/registro', json=nuevo_usuario)
    assert response.status_code == 201
    assert response.get_json()['mensaje'] == "Usuario registrado correctamente"

def test_registro_duplicado(client):
    """Prueba que no se puede registrar un usuario con el mismo DNI"""
    usuario = {
        "username": "user1",
        "password": "Password123",
        "nombre": "User",
        "apellidos": "Uno",
        "dni": "88888888X",
        "telefono": "111222333",
        "email": "user1@example.com"
    }
    # Primer registro
    client.post('/api/registro', json=usuario)
    
    # Intento de segundo registro con mismo DNI
    response = client.post('/api/registro', json=usuario)
    assert response.status_code == 400
    assert "Ya existe un usuario con ese DNI" in response.get_json()['error']

def test_login_exitoso(client):
    """Prueba el login con credenciales correctas"""
    # Primero registramos un usuario
    password = "Password123"
    client.post('/api/registro', json={
        "username": "loginuser",
        "password": password,
        "nombre": "Login",
        "apellidos": "Test",
        "dni": "11111111L",
        "telefono": "999888777",
        "email": "login@example.com"
    })
    
    # Intentamos login
    response = client.post('/api/login', json={
        "username": "loginuser",
        "password": password
    })
    assert response.status_code == 200
    data = response.get_json()
    assert data['success'] is True
    assert data['rol'] == 'miembro'

def test_login_password_incorrecta(client):
    """Prueba el login con contraseña errónea"""
    # 1. Registramos usuario (validando que el registro sea exitoso)
    response_reg = client.post('/api/registro', json={
        "username": "wrongpass",
        "password": "Password123",  # 11 caracteres, válido
        "nombre": "Wrong",
        "apellidos": "Pass",
        "dni": "22222222W",
        "telefono": "444555666",
        "email": "wrong@example.com"
    })
    assert response_reg.status_code == 201, f"El registro falló: {response_reg.get_json()}"
    
    # 2. Intentamos login con password incorrecta
    response = client.post('/api/login', json={
        "username": "wrongpass",
        "password": "WrongPassword1" # Debe ser distinto pero válido para el login
    })
    
    # Si el usuario existe pero la pass es mal, debe dar 401
    assert response.status_code == 401
    assert response.get_json()['message'] == "Password incorrecta"

def test_logout(client):
    """Prueba que la sesión se cierra correctamente"""
    response = client.post('/api/logout')
    assert response.status_code == 200
    assert response.get_json()['success'] is True
