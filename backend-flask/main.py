# pyrefly: ignore [missing-import]
from flask import Flask, jsonify, request, session, redirect, url_for, flash, send_from_directory
from models.database import BaseDatos
from flask_cors import CORS
from passlib.hash import pbkdf2_sha256
import re
from bson.objectid import ObjectId
from werkzeug.utils import secure_filename
import time

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY", "clave_super_secreta")

frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
CORS(app,
     supports_credentials=True,
     origins=[frontend_url, "http://localhost:5173"])

is_production = os.environ.get("FLASK_ENV") == "production"
app.config['SESSION_COOKIE_SAMESITE'] = 'None' if is_production else 'Lax'
app.config['SESSION_COOKIE_SECURE'] = is_production

# Configuración de subida de imágenes
UPLOAD_FOLDER = os.path.join('static', 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db =BaseDatos()



noticias_col = db.obtener_colecciones('Noticias')
miembros_col = db.obtener_colecciones('Miembros')
galeria_col = db.obtener_colecciones('Galeria')
comentarios_col = db.obtener_colecciones('Comentarios')

@app.route('/')
def home():
    return "Servidor funcionando"

@app.route('/api/noticias')
def get_noticias():
    data = list(noticias_col.find())
   
    noticias = []
    for noticia in data:
        noticias.append({
            "id": str(noticia.get("_id")),
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
            "id": str(foto.get("_id")),
            "imagen": foto.get("imagen"),
            "titulo": foto.get("titulo")
        })

    return jsonify(galeria)

    

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"success": False, "message": "Faltan datos"}), 400

    username = username.lower()

    login_user = miembros_col.find_one({'username': username})

    if not login_user:
        return jsonify({"success": False, "message": "Usuario no existe"}), 404

    if not pbkdf2_sha256.verify(password, login_user['password']):
        return jsonify({"success": False, "message": "Password incorrecta"}), 401

    #  GUARDAR SESIÓN
    session['username'] = login_user['username']
    session['rol'] = login_user['rol']

    return jsonify({
        "success": True,
        "rol": login_user['rol']
    })
            


@app.route('/api/registro', methods=['POST'])
def registro():
    
    data = request.get_json()

    if not data:
        return jsonify({"success": False, "message": "JSON inválido"}), 400

    passwd = data.get('password')

    if not passwd:
        return jsonify({'error': 'Password requerido'}), 400

    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$'

    if not re.match(password_regex, passwd):
        return jsonify({
            'error': 'La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números'
        }), 400

    passwd_hash = pbkdf2_sha256.hash(passwd)

    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email requerido'}), 400

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'

    if not re.match(email_regex, email):
        return jsonify({'error': 'Formato de email inválido'}), 400

     # Validar campos antes de usar .upper() o .lower()
    username = data.get('username')
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    dni = data.get('dni')
    telefono = data.get('telefono')
    email = data.get('email')
    

    if not all([username, nombre, apellidos,dni, telefono, email ]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    dict_usuario = {
        'username': data.get('username').lower(),
        'password': passwd_hash,
        'nombre': data.get('nombre').title(),
        'apellidos': data.get('apellidos').title(),
        'dni': data.get('dni').upper(),
        'telefono': data.get('telefono'),
        'email': data.get('email').lower(),
        'rol': 'miembro'
    }

    #  Validaciones (Mongo directamente)
    if miembros_col.find_one({'dni': dict_usuario['dni']}):
        return jsonify({'error': 'Ya existe un usuario con ese DNI'}), 400

    if miembros_col.find_one({'telefono': dict_usuario['telefono']}):
        return jsonify({'error': 'Ya existe un usuario con ese telefono'}), 400

    if miembros_col.find_one({'email': dict_usuario['email']}):
        return jsonify({'error': 'Ya existe un usuario con ese email'}), 400

    if miembros_col.find_one({'username': dict_usuario['username']}):
        return jsonify({'error': 'Ya existe un usuario con ese username'}), 400

    miembros_col.insert_one(dict_usuario)

    return jsonify({'mensaje': 'Usuario registrado correctamente'}), 201




@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Sesión cerrada correctamente"})


@app.route('/api/comentarios', methods=['POST'])
def guardar_comentario():
    if 'username' not in session:
        return jsonify({"success": False, "message": "No autenticado"}), 401

    data = request.get_json()
    comentario = data.get('comentario', '').strip()

    if not comentario:
        return jsonify({"success": False, "message": "El comentario no puede estar vacío"}), 400

    comentarios_col.insert_one({
        "username": session['username'],
        "comentario": comentario
    })

    return jsonify({"success": True, "message": "Comentario guardado correctamente"}), 201


@app.route('/api/comentarios', methods=['GET'])
def obtener_comentarios():
    datos = list(comentarios_col.find())
    comentarios = []
    for c in datos:
        comentarios.append({
            "id": str(c.get("_id")),
            "username": c.get("username"),
            "comentario": c.get("comentario")
        })
    return jsonify(comentarios)


@app.route('/api/miembros', methods=['GET'])
def obtener_miembros():
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    datos = list(miembros_col.find({}, {'_id': 0, 'password': 0}))
    return jsonify(datos)


@app.route('/api/admin/miembros/nuevo', methods=['POST'])
def crear_miembro_admin():
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    passwd = data.get('password')
    if not passwd:
        return jsonify({"error": "Password requerido"}), 400

    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$'
    if not re.match(password_regex, passwd):
        return jsonify({"error": "La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números"}), 400

    email = data.get('email', '')
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'
    if not re.match(email_regex, email):
        return jsonify({"error": "Formato de email inválido"}), 400

    username = data.get('username')
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    dni = data.get('dni')
    telefono = data.get('telefono')
    rol = data.get('rol', 'miembro')

    if rol not in ['admin', 'miembro']:
        return jsonify({"error": "Rol inválido"}), 400

    if not all([username, nombre, apellidos, dni, telefono, email]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    passwd_hash = pbkdf2_sha256.hash(passwd)

    dict_usuario = {
        'username': username.lower(),
        'password': passwd_hash,
        'nombre': nombre.title(),
        'apellidos': apellidos.title(),
        'dni': dni.upper(),
        'telefono': telefono,
        'email': email.lower(),
        'rol': rol
    }

    if miembros_col.find_one({'dni': dict_usuario['dni']}):
        return jsonify({"error": "Ya existe un usuario con ese DNI"}), 400
    if miembros_col.find_one({'telefono': dict_usuario['telefono']}):
        return jsonify({"error": "Ya existe un usuario con ese teléfono"}), 400
    if miembros_col.find_one({'email': dict_usuario['email']}):
        return jsonify({"error": "Ya existe un usuario con ese email"}), 400
    if miembros_col.find_one({'username': dict_usuario['username']}):
        return jsonify({"error": "Ya existe un usuario con ese username"}), 400

    miembros_col.insert_one(dict_usuario)
    return jsonify({"mensaje": "Miembro creado correctamente"}), 201



@app.route('/api/admin/miembros/<dni>', methods=['GET'])
def obtener_miembro(dni):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    miembro = miembros_col.find_one({'dni': dni.upper()}, {'_id': 0, 'password': 0})
    if not miembro:
        return jsonify({"success": False, "message": "Miembro no encontrado"}), 404
    return jsonify(miembro)


@app.route('/api/admin/miembros/<dni>', methods=['PUT'])
def modificar_miembro(dni):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    miembro_actual = miembros_col.find_one({'dni': dni.upper()})
    if not miembro_actual:
        return jsonify({"error": "Miembro no encontrado"}), 404

    actualizacion = {}

    if data.get('username'):
        actualizacion['username'] = data['username'].lower()
    if data.get('nombre'):
        actualizacion['nombre'] = data['nombre'].title()
    if data.get('apellidos'):
        actualizacion['apellidos'] = data['apellidos'].title()
    if data.get('telefono'):
        actualizacion['telefono'] = data['telefono']
    if data.get('email'):
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w{2,}$'
        if not re.match(email_regex, data['email']):
            return jsonify({"error": "Formato de email inválido"}), 400
        actualizacion['email'] = data['email'].lower()
    if data.get('rol') in ['admin', 'miembro']:
        actualizacion['rol'] = data['rol']

    # Password opcional: solo se actualiza si se proporciona
    if data.get('password'):
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$'
        if not re.match(password_regex, data['password']):
            return jsonify({"error": "La contraseña debe tener entre 8 y 15 caracteres, incluir mayúsculas, minúsculas y números"}), 400
        actualizacion['password'] = pbkdf2_sha256.hash(data['password'])

    if not actualizacion:
        return jsonify({"error": "No hay campos para actualizar"}), 400

    miembros_col.update_one({'dni': dni.upper()}, {'$set': actualizacion})
    return jsonify({"mensaje": "Miembro actualizado correctamente"})


@app.route('/api/admin/miembros/<dni>', methods=['DELETE'])
def eliminar_miembro(dni):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    resultado = miembros_col.delete_one({'dni': dni.upper()})
    if resultado.deleted_count == 0:
        return jsonify({"success": False, "message": "Miembro no encontrado"}), 404
    return jsonify({"success": True, "message": "Miembro eliminado correctamente"})


@app.route('/api/admin/galeria/nuevo', methods=['POST'])
def crear_foto_admin():
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    titulo = data.get('titulo')
    imagen = data.get('imagen')

    if not all([titulo, imagen]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    galeria_col.insert_one({
        'titulo': titulo,
        'imagen': imagen
    })
    return jsonify({"success": True, "mensaje": "Foto añadida correctamente"}), 201


@app.route('/api/admin/galeria/<id>', methods=['GET'])
def obtener_foto(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    try:
        foto = galeria_col.find_one({'_id': ObjectId(id)})
        if not foto:
            return jsonify({"success": False, "message": "Foto no encontrada"}), 404
        return jsonify({
            "id": str(foto['_id']),
            "titulo": foto.get('titulo'),
            "imagen": foto.get('imagen')
        })
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/galeria/<id>', methods=['PUT'])
def modificar_foto(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    actualizacion = {}
    if data.get('titulo'):
        actualizacion['titulo'] = data['titulo']
    if data.get('imagen'):
        actualizacion['imagen'] = data['imagen']

    if not actualizacion:
        return jsonify({"error": "No hay campos para actualizar"}), 400

    try:
        resultado = galeria_col.update_one({'_id': ObjectId(id)}, {'$set': actualizacion})
        if resultado.matched_count == 0:
            return jsonify({"success": False, "message": "Foto no encontrada"}), 404
        return jsonify({"success": True, "mensaje": "Foto actualizada correctamente"})
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/galeria/<id>', methods=['DELETE'])
def eliminar_foto(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    try:
        resultado = galeria_col.delete_one({'_id': ObjectId(id)})
        if resultado.deleted_count == 0:
            return jsonify({"success": False, "message": "Foto no encontrada"}), 404
        return jsonify({"success": True, "message": "Foto eliminada correctamente"})
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/noticias/nuevo', methods=['POST'])
def crear_noticia_admin():
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    titulo = data.get('titulo')
    descripcion = data.get('descripcion')
    imagen = data.get('imagen')

    if not all([titulo, descripcion, imagen]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    noticias_col.insert_one({
        'titulo': titulo,
        'descripcion': descripcion,
        'imagen': imagen
    })
    return jsonify({"success": True, "mensaje": "Noticia añadida correctamente"}), 201


@app.route('/api/admin/noticias/<id>', methods=['GET'])
def obtener_noticia(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    try:
        noticia = noticias_col.find_one({'_id': ObjectId(id)})
        if not noticia:
            return jsonify({"success": False, "message": "Noticia no encontrada"}), 404
        return jsonify({
            "id": str(noticia['_id']),
            "titulo": noticia.get('titulo'),
            "descripcion": noticia.get('descripcion'),
            "imagen": noticia.get('imagen')
        })
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/noticias/<id>', methods=['PUT'])
def modificar_noticia(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    actualizacion = {}
    if data.get('titulo'):
        actualizacion['titulo'] = data['titulo']
    if data.get('descripcion'):
        actualizacion['descripcion'] = data['descripcion']
    if data.get('imagen'):
        actualizacion['imagen'] = data['imagen']

    if not actualizacion:
        return jsonify({"error": "No hay campos para actualizar"}), 400

    try:
        resultado = noticias_col.update_one({'_id': ObjectId(id)}, {'$set': actualizacion})
        if resultado.matched_count == 0:
            return jsonify({"success": False, "message": "Noticia no encontrada"}), 404
        return jsonify({"success": True, "mensaje": "Noticia actualizada correctamente"})
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/noticias/<id>', methods=['DELETE'])
def eliminar_noticia(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    try:
        resultado = noticias_col.delete_one({'_id': ObjectId(id)})
        if resultado.deleted_count == 0:
            return jsonify({"success": False, "message": "Noticia no encontrada"}), 404
        return jsonify({"success": True, "message": "Noticia eliminada correctamente"})
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400


@app.route('/api/admin/comentarios/<id>', methods=['DELETE'])
def eliminar_comentario(id):
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403
    try:
        resultado = comentarios_col.delete_one({'_id': ObjectId(id)})
        if resultado.deleted_count == 0:
            return jsonify({"success": False, "message": "Comentario no encontrado"}), 404
        return jsonify({"success": True, "message": "Comentario eliminado correctamente"})
    except:
        return jsonify({"success": False, "message": "ID inválido"}), 400



@app.route('/api/session', methods=['GET'])

def session_check():
    if 'username' in session:
        user = miembros_col.find_one({'username': session['username']}, {'_id': 0, 'password': 0})
        if user:
            return jsonify({
                "logged": True,
                "username": session['username'],
                "rol": session['rol'],
                "user": user
            })
    return jsonify({"logged": False}), 401
@app.route('/api/admin/upload', methods=['POST'])
def upload_file():
    if session.get('rol') != 'admin':
        return jsonify({"success": False, "message": "Acceso denegado"}), 403

    if 'file' not in request.files:
        return jsonify({"error": "No hay parte de archivo"}), 400

    file = request.files['file']
    if not file or file.filename is None or file.filename == '':
        return jsonify({"error": "No se seleccionó ningún archivo"}), 400

    filename = secure_filename(file.filename)
        # Añadir timestamp para evitar sobrescribir archivos con el mismo nombre
    name, ext = os.path.splitext(filename)
    filename = f"{name}_{int(time.time())}{ext}"

    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Devolvemos la ruta que el frontend usará para mostrar la imagen
    return jsonify({
        "success": True,
        "url": f"/api/uploads/{filename}"
    }), 201


@app.route('/api/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)



if __name__ ==  '__main__':
    BaseDatos.inicializar_colecciones(BaseDatos())
    BaseDatos.insertar_admin(BaseDatos())
    app.run()