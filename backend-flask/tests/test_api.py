def test_home(client):
    """Prueba que el servidor responde en la ruta raíz"""
    response = client.get('/')
    assert response.status_code == 200
    assert b"Servidor funcionando" in response.data

def test_login_no_data(client):
    """Prueba que el login falla si no se envían datos"""
    response = client.post('/api/login', json={})
    assert response.status_code == 400
    assert response.get_json()['message'] == "Faltan datos"
