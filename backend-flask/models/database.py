from bson import ObjectId
from pymongo import MongoClient 
from passlib.hash import pbkdf2_sha256
import os
from dotenv import load_dotenv


# Clase BaseDatos
class BaseDatos:
    def __init__(self):
        try:
            # Cargar las variables de entorno
            load_dotenv()
            mong_url = os.getenv("MONGO_URL")

            # Conexión a MongoDB
            self.client = MongoClient(mong_url)
            self.db = self.client["Asociacion"]

            self.inicializar_colecciones()

            print("EXITO: Conexión a MongoDB establecida correctamente.")

        except Exception as e:
            print(f"\nERROR: Falló la conexión a MongoDB: {e}")

    def inicializar_colecciones(self):
        colecciones = ['Miembros', 'Noticias','Galeria','Comentarios']
        col_existentes = self.db.list_collection_names()

        for coleccion in colecciones:
            if coleccion not in col_existentes:
                self.db.create_collection(coleccion)
                print(f"INFO: Colección '{coleccion}' creada.")

    def insertar_admin(self):
        
        #Sólo se ejecutará si la tabla usuarios está vacía

        if self.db['Miembros'].count_documents({}) == 0:
            
            passwd = "Admin123"
            pass_hashed = pbkdf2_sha256.hash(passwd)

            usuario_inicial = {
                "username": "adminuser",
                "password": pass_hashed,
                "nombre": "Admin",
                "apellidos": "De la App",
                "dni": "99999999Z",
                "telefono": "600123213",
                "email": "admin@asociacion.com",
                "rol": "admin"
            }
            self.db['Miembros'].insert_one(usuario_inicial)
            print("INFO: Usuario administrador insertado en la colección 'Miembros'.")
        else:
            print("AVISO: La colección 'Miembros' ya contiene registros.")

    def insertar_miembro(self, user):
        self.db['Miembros'].insert_one(user)

    def lista_miembros(self,Miembros):
        return list(Miembros.find())
    
    def comprueba_registro(self, lista_miembro, nuevo_miembro):

        ### Devuelve un valor en función del error ###

        for miembro in lista_miembro:
            print(miembro)
            if miembro['dni'] == nuevo_miembro['dni']:
                return 1

            elif miembro['telefono'] == nuevo_miembro['telefono']:
                return 2

            elif miembro['email'] == nuevo_miembro['email']:
                return 3

            elif miembro['username'] == nuevo_miembro['username']:
                return 4
            
        return 0

    def lista_noticias(self,Noticias):
        return list(Noticias.find())
    
    def insertar_noticia(self,noticia):
        self.db['Noticias'].insert_one(noticia)

    def lista_comentarios(self, Comentarios):
        return list(Comentarios.find())

    def insertar_comentario(self, comentario):
        self.db['Comentarios'].insert_one(comentario)

    def eliminar_comentario(self, comentario_id):
        self.db['Comentarios'].delete_one({"_id": ObjectId(comentario_id)})

    def lista_galeria(self,Galeria):
        return list(Galeria.find())
    
    def insertar_galeria(self,galeria):
        self.db['Galeria'].insert_one(galeria)

    def eliminar_galeria(self, galeria_id):
        self.db['Galeria'].delete_one({"_id": ObjectId(galeria_id)})

    # Nos devuelve la coleccion (tabla) cuyo nombre le especifiquemos
    def obtener_colecciones(self,nombre):
        return self.db[nombre]
