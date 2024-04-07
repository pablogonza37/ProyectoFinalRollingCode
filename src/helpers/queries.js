const URL_Productos = import.meta.env.VITE_API_PRODUCTOS;

export const leerProductosAPI = async () => {
  try {
    const resp = await fetch(URL_Productos);
    const listaProductos = await resp.json();
    return listaProductos;
  } catch (error) {
    console.log(error);
  }
};

export const crearProductoAPI = async (productoNuevo) => {
  try {
    const resp = await fetch(URL_Productos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoNuevo),
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProductoAPI = async (id) => {
  try {
    const resp = await fetch(URL_Productos + "/" + id);
    return resp;
  } catch (error) {
    console.log(error);
  }
};


export const editarProductoAPI = async (productoModificado, id) => {
  try {
    const respuesta = await fetch(`${URL_Productos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productoModificado),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};





const userAdmin = {
    mail: "admin@rollingbistro.com",
    password: "prueba123",
  };

export const login = (usuario) => {
    if (
      usuario.mail === userAdmin.mail &&
      usuario.password === userAdmin.password
    ) {
      sessionStorage.setItem(
        "usuarioRollingBistro",
        JSON.stringify(usuario.mail)
      );
      return true;
    }else {
      return false;
    }
  };