from flask import Flask, jsonify, request, session,redirect,url_for,flash
from models.database import BaseDatos
from flask_cors import CORS
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
CORS(app)

db =BaseDatos()

# <db password> -> %3Cdb_password%3E

noticias_col = db.obtener_colecciones('Noticias')
miembros_col = db.obtener_colecciones('Miembros')
galeria_col = db.obtener_colecciones('Galeria')

@app.route('/api/noticias')
def get_noticias():
    data = list(noticias_col.find())
   

    noticias = []
    for noticia in data:
        noticias.append({
            "titulo": noticia.get("titulo"),
            "descripcion": noticia.get("descripcion"),
            "imagen": noticia.get("imagen")
        })

    return jsonify(noticias)

@app.route('/api/galeria')
def get_fotos():
    
    data = list(galeria_col.find())
   
    galeria = []
    for foto in data:
        galeria.append({
            "imagen": foto.get("imagen"),
            "titulo": foto.get("titulo")
        })

    return jsonify(galeria)

    

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    usuarios = db.lista_miembros(miembros_col)

    login_user = None

    for usuario in usuarios:
        if usuario['username'] == username:
            login_user = usuario
            break

    
        # Validar si existe el usuario y la contraseña

        if login_user and pbkdf2_sha256.verify(password, login_user['password']):
            
            session['username'] = login_user['username']
            session['rol'] = login_user['rol']
            session['dni'] = login_user.get('dni')

            return jsonify({
                "success": True,
                "rol": login_user['rol']
            })
            
    return({
        "success": False,
        "message":"Credenciales incorrectas"
    }),401

    return  jsonify()
    

if __name__ ==  '__main__':
    BaseDatos.inicializar_colecciones(BaseDatos())
    BaseDatos.insertar_admin(BaseDatos())
    app.run()