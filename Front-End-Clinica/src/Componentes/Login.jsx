import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import {
  blanquearUsuario,
  getAllUsuarios,
  getJwtToken,
  getRolByUser,
  updatePassword,
} from "../services/usuario-services.js";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "./Header.jsx";
import { LoaderEmergente } from "./LoaderEmergente.jsx";

export const Login = () => {
  const navigate = useNavigate();

  const [bandAuth, setBandAuth] = useState(false);
  const [bandAuthProccess, setBandAuthProccess] = useState(false);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [nuevoPassword, setNuevoPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");

  const [bandBlanqueado, setBandBlanqueado] = useState(false);
  const [bandPasswordForgeted, setBandPasswordForgeted] = useState(false);

  const [emailPassForgeted, setEmailPassForgeted] = useState("");

  const [bandLoaderBlanqueado, setBandLoaderBlanqueado] =
    useState(false);
  const [bandLoaderPasswordForgeted, setBandLoaderPasswordForgeted] =
    useState(false);

  const [idUsuario, setIdUsuario] = useState(0);

  useEffect(() => {
    setBandAuth(false);
    setBandAuthProccess(false);
  }, [usuario, password]);

  const handlePasswordForgeted = async () => {
    setBandLoaderPasswordForgeted(true); // Establecer bandLoaderPasswordForgeted en true antes de la operación

    try {
      if (emailPassForgeted.length > 0) {
        const response = await blanquearUsuario(emailPassForgeted);
        if (!response?.err) {
          toast.success(
            "Se ha enviado un correo electrónico al usuario para cambiar su contraseña"
          );
          setBandPasswordForgeted(false);
          setEmailPassForgeted("");
        } else {
          toast.error("El correo electrónico no existe");
        }
      }
    } catch (error) {
      toast.error("Error al blanquear al usuario");
    } finally {
      setEmailPassForgeted("");
      setBandLoaderPasswordForgeted(false); // Establecer bandLoaderPasswordForgeted en false después de la operación
    }
  };

  const handleLogin = async () => {
    console.log(usuario);

    const { token, dni, id, blanqueado } = await getJwtToken(usuario, password);
    //el jwt tambien me devuelve el dni para conseguir traer las patologias de ese dni en el caso que sea paciente

    console.log(token, dni, id, blanqueado);

    if (token && !token?.error) {
      setIdUsuario(id);
      localStorage.setItem("idUsuario", id);
      localStorage.setItem("token", token);
      setBandAuth(true);
      //let rol = await getRolByUser(usuario);
      localStorage.setItem("usuario", usuario);
      //localStorage.setItem("rol", rol);
      //localStorage.setItem("dni", dni);

      if (blanqueado === 0) {
        setBandBlanqueado(true);
        toast("Usuario blanqueado, debe cambiar la contraseña!");
      } else {
        /*  toast.success('Logeado con exito!',{
          duration: 6000,
        }) */

        navigate("/home");
      }
    } else {
      setBandAuth(false);
      setError("Usuario o Contraseña invalidos");
    }
    setBandAuthProccess(true);
  };

  const handleChangePassword = async () => {
    if (nuevoPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setBandLoaderBlanqueado(true);
    const success = await updatePassword(idUsuario, nuevoPassword);
    console.log("resultado de updatepassword: ", success);
    if (success) {
      setBandBlanqueado(false);
      setNuevoPassword("");
      setConfirmarPassword("");
      setError("");
      setBandAuth(false);
      setBandAuthProccess(false);
      toast.success("Se actualizo la Contraseña!");
    } else {
      setError("Error al actualizar la contraseña");
    }
    setBandLoaderBlanqueado(false);
  };

  return (
    <div>
      {bandLoaderPasswordForgeted || bandLoaderBlanqueado ? <LoaderEmergente /> : null}

      <Header />
      <main className="main">
        <div className="cont_login">
          <Toaster position="top-center" reverseOrder={false} />

          {bandPasswordForgeted ? (
            <>
              <TextField
                label="Correo"
                variant="filled"
                value={emailPassForgeted}
                className="input_login"
                onChange={(e) => setEmailPassForgeted(e.target.value)}
                type="email"
              />
              <Space align="center">
                <Button onClick={handlePasswordForgeted}>Enviar</Button>
                <Button
                  onClick={() => {
                    setBandPasswordForgeted(false);
                    setEmailPassForgeted("");
                    setError("");
                    //se hace esto porque si se equivoca de contraseña primero le sale que el usuario y/o contraseña son erroneos
                    //y si quiere resetearla se debe quitar ese mensaje
                  }}
                >
                  Cancelar
                </Button>
              </Space>
            </>
          ) : bandBlanqueado ? (
            <>
              <TextField
                label="Nueva Contraseña"
                variant="filled"
                value={nuevoPassword}
                className="input_login"
                onChange={(e) => setNuevoPassword(e.target.value)}
                type="password"
              />
              <TextField
                label="Confirmar Contraseña"
                variant="filled"
                className="input_login"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                type="password"
              />
              <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
            </>
          ) : (
            <>
              <TextField
                className="input_login"
                label="Usuario"
                variant="filled"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <TextField
                className="input_login"
                label="Contraseña"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Button
                variant="contained"
                className="btn_login"
                onClick={handleLogin}
              >
                Ingresar
              </Button>
              <a
                href="#"
                className="password_forgeted"
                onClick={() => setBandPasswordForgeted(true)}
              >
                Has olvidado la Contraseña?
              </a>
            </>
          )}

          {error && <p>{error}</p>}

          {/*  {!bandAuth && bandAuthProccess ? (
        <p>Usuario o Contraseña invalidos</p>
      ) : null} */}
        </div>
      </main>
    </div>
  );
};
