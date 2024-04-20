const URL_Productos = import.meta.env.VITE_API_PRODUCTOS;
const URL_Usuarios = import.meta.env.VITE_API_USUARIOS;
const URL_Pedidos = import.meta.env.VITE_API_PEDIDOS;
const URL_Suspender=import.meta.env.VITE_API_SUSPENDER;
const URL_Levantar=import.meta.env.VITE_API_LEVANTAR;
const URL_Login=import.meta.env.VITE_API_LOGIN;
const URL_Ventas=import.meta.env.VITE_API_VENTA;
const URL_Resenias=import.meta.env.VITE_API_RESENIA;

export const crearVentaAPI = async (nuevaVenta) => {
  try {
    const resp = await fetch(URL_Ventas, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaVenta),
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const leerVentasAPI = async () => {
  try {
    const resp = await fetch(URL_Ventas);
    const listaVentas = await resp.json();
    return listaVentas;
  } catch (error) {
    console.log(error);
  }
};

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
        'x-token': JSON.parse(sessionStorage.getItem('usuarioRollingBistro')).token
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
        'x-token': JSON.parse(sessionStorage.getItem('usuarioRollingBistro')).token
      },
      body: JSON.stringify(productoModificado),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const borrarProductoAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Productos}/${id}`, {
      method: "DELETE",
      headers: {
        'x-token': JSON.parse(sessionStorage.getItem('usuarioRollingBistro')).token
        }
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const leerUsuariosAPI = async () => {
  try {
    const resp = await fetch(URL_Usuarios);
    if (!resp.ok) {
      throw new Error('No se pudo cargar la lista de usuarios');
    }
    const listaUsuarios = await resp.json();
    return listaUsuarios;
  } catch (error) {
    throw new Error('Error al cargar los usuarios desde la API: ' + error.message);
  }
};

export const crearUsuarioAPI = async (usuarioNuevo) => {
  try {
    const resp = await fetch(URL_Usuarios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioNuevo),
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const borrarUsuarioAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Usuarios}/${id}`, {
      method: "DELETE",
      headers: {
        'x-token': JSON.parse(sessionStorage.getItem('usuarioRollingBistro')).token
        }

    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};


export const crearPedidoAPI = async (pedidoNuevo) => {
  try {
    const resp = await fetch(URL_Pedidos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoNuevo),
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPedidosAPI = async () => {
  try {
    const resp = await fetch(URL_Pedidos); 
    const pedidos = await resp.json();
    return pedidos;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener los pedidos'); 
  }
};

export const cambiarEstadoPedidoAPI = async (estadoNuevo, id) => {
  try {
    const resp = await fetch(`${URL_Pedidos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: estadoNuevo }),
    });

    if (!resp.ok) {
      throw new Error("Error al actualizar el estado del pedido");
    }

    const pedidoActualizado = await resp.json();

    return pedidoActualizado;
  } catch (error) {
    console.error(error);
    throw new Error("Ocurrió un error al intentar actualizar el estado del pedido");
  }
};

export const cambiarPedidoAPI = async (pedidoActualizado, id) => {
  try {
    const respuesta = await fetch(`${URL_Pedidos}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoActualizado),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};


export const borrarPedidoAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Pedidos}/${id}`, {
      method: "DELETE",
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const suspenderUsuarioAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Suspender}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const levantarSuspensionUsuarioAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Levantar}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const crearReseniaAPI = async (resenaNueva) => {
  try {
    const resp = await fetch(URL_Resenias, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resenaNueva),
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const leerReseniasAPI = async () => {
  try {
    const resp = await fetch(URL_Resenias);
    const listaResenas = await resp.json();
    return listaResenas;
  } catch (error) {
    console.log(error);
  }
};

export const borrarReseniaAPI = async (id) => {
  try {
    const resp = await fetch(`${URL_Resenias}/${id}`, {
      method: "DELETE",
    });
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (usuario) =>{
  try {
    const respuesta = await fetch(URL_Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return  respuesta
  } catch (error) {
    console.log("errores en el login");
    return;
  }
}