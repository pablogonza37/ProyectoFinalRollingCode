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