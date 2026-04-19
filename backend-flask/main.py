from flask import Flask, jsonify, request
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

    

@app.route('/api/login')
def login():
    return  ['Apple','Banana','Cherry']
    

if __name__ ==  '__main__':
    BaseDatos.inicializar_colecciones(BaseDatos())
    BaseDatos.insertar_admin(BaseDatos())
    app.run()