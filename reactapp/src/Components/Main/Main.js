import React, { Component } from "react";
import {
  Container,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import {
  StyledTextField,
  StyledInput,
  BlackButton,
  GreenButton,
  StyledCheckbox,
} from "../StyledComponents";
import background from "../../Assets/logo.png";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_modelo: "",
      temp_precio: "",
      temp_nombre: "",
      temp_email: "",
      temp_numero: "",
      temp_ciudad: "",
      temp_depart: "",
      set_terms: false,
      api_modelo: [],
      api_depart: [],
      api_ciudad: [],
      show_diag: false,
      diag_title: "",
      diag_message: "",
      loading: true,
    };
  }

  componentDidMount() {
    fetch("https://integrador.processoft.com.co/api/menutest", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ api_modelo: data[1].subitems });
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(process.env.REACT_APP_API_URL + "Departamento", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success)
          this.setState({ loading: false, api_depart: data.departamentos });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  callApiCiudad = () => {
    fetch(
      process.env.REACT_APP_API_URL +
        "CiudadByDepartamento/" +
        this.state.temp_depart,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) this.setState({ api_ciudad: data.ciudades });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  callApiPost = () => {
    this.setState({
      loading: true,
    });
    const data = {
      modelo: this.state.temp_modelo,
      precio: this.state.temp_precio,
      nombre_cotizante: this.state.temp_nombre,
      email_cotizante: this.state.temp_email,
      numero_cotizante: this.state.temp_numero,
      departamento_id: this.state.temp_depart,
      ciudad_id: this.state.temp_ciudad,
    };

    fetch(process.env.REACT_APP_API_URL + "Cotizacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success)
          this.setState(
            {
              loading: false,
              show_diag: true,
              diag_title: "Cotización realizada",
              diag_message:
                "Los datos de la cotización se han enviado satisfactoriamente",
            },
            this.clearTemp
          );
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  clearTemp = () => {
    this.setState({
      temp_modelo: "",
      temp_precio: "",
      temp_nombre: "",
      temp_email: "",
      temp_numero: "",
      temp_ciudad: "",
      temp_depart: "",
      set_terms: false,
      api_ciudad: [],
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const check = e.target.checked;

    switch (name) {
      case "input_modelo":
        this.setState({
          temp_modelo: value,
          temp_precio:
            this.state.api_modelo[
              this.state.api_modelo.findIndex((x) => x.subtitle === value)
            ].price,
        });
        break;
      case "input_nombre":
        this.setState({ temp_nombre: value });
        break;
      case "input_email":
        this.setState({ temp_email: value });
        break;
      case "input_numero":
        if (value.length <= 10) this.setState({ temp_numero: value });
        break;
      case "input_depart":
        this.setState({ temp_depart: value }, this.callApiCiudad);
        break;
      case "input_ciudad":
        this.setState({ temp_ciudad: value });
        break;
      case "input_terms":
        this.setState({ set_terms: check });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Container maxWidth="lg">
        <div style={{ padding: "0 2rem 0 1.7rem" }}>
          <img src={background} alt="logo_ssangyong" className="o-logo" />
        </div>

        <div className="o-form-container">
          <h1>{"¡Cotiza la tuya!"}</h1>

          <div className="o-label">{"Selecciona un modelo"}</div>
          <Select
            variant="outlined"
            name="input_modelo"
            value={this.state.temp_modelo}
            onChange={this.handleChange}
            input={<StyledInput />}
            renderValue={() => this.state.temp_modelo}
            margin="dense"
          >
            {this.state.api_modelo.map((x, i) => (
              <MenuItem
                key={i}
                value={x.subtitle}
                style={{ justifyContent: "center" }}
              >
                <div className="o-option">
                  <img
                    src={x.img}
                    alt={"imagen_camioneta_" + x.subtitle}
                    className="o-option-img"
                  />
                  <div className="o-label">{x.subtitle}</div>
                  {x.price}
                </div>
              </MenuItem>
            ))}
          </Select>

          <div className="o-label">{"Nombre completo"}</div>
          <StyledTextField
            variant="outlined"
            name="input_nombre"
            value={this.state.temp_nombre}
            onChange={this.handleChange}
            margin="dense"
          />

          <div className="o-label">{"Email"}</div>
          <StyledTextField
            variant="outlined"
            name="input_email"
            value={this.state.temp_email}
            onChange={this.handleChange}
            margin="dense"
          />

          <div className="o-label">{"Número celular"}</div>
          <StyledTextField
            variant="outlined"
            type="number"
            name="input_numero"
            value={this.state.temp_numero}
            onChange={this.handleChange}
            margin="dense"
          />

          <div className="o-dobleinput-container">
            <div className="o-dobleinput">
              <div className="o-label">{"Departamento"}</div>
              <Select
                variant="outlined"
                name="input_depart"
                value={this.state.temp_depart}
                onChange={this.handleChange}
                input={<StyledInput />}
                margin="dense"
              >
                {this.state.api_depart.map((x, i) => (
                  <MenuItem key={i} value={x.id}>
                    {x.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="o-dobleinput">
              <div className="o-label">{"Ciudad"}</div>
              <Select
                variant="outlined"
                name="input_ciudad"
                value={this.state.temp_ciudad}
                onChange={this.handleChange}
                input={<StyledInput />}
                margin="dense"
              >
                {this.state.api_ciudad[0] === undefined ? (
                  <MenuItem disabled={true} value={""}>
                    {"Selecciona un departamento"}
                  </MenuItem>
                ) : (
                  this.state.api_ciudad.map((x, i) => (
                    <MenuItem key={i} value={x.id}>
                      {x.nombre}
                    </MenuItem>
                  ))
                )}
              </Select>
            </div>
          </div>
          <div className="o-terms">
            <StyledCheckbox
              checked={this.state.set_terms || false}
              color="primary"
              name="input_terms"
              onChange={this.handleChange}
            />
            {"Acepto la Politica de"}
            <button
              className="o-link"
              onClick={() =>
                this.setState({
                  show_diag: true,
                  diag_title: "Política de Tratamiento de Datos",
                  diag_message: "Politica de tratamiento",
                })
              }
            >
              {"Tratamiento de Datos"}
            </button>
          </div>

          <div className="o-button-post">
            <BlackButton onClick={this.callApiPost}>
              {"Enviar datos"}
            </BlackButton>
          </div>
        </div>

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.show_diag}
          maxWidth={false}
        >
          <DialogTitle style={{ textAlign: "center" }}>
            {this.state.diag_title}
          </DialogTitle>
          <DialogContent>{this.state.diag_message}</DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <div className="o-button-diag">
              <GreenButton
                onClick={() =>
                  this.setState({
                    show_diag: false,
                  })
                }
              >
                {"Aceptar"}
              </GreenButton>
            </div>
          </DialogActions>
        </Dialog>

        <Backdrop
          open={this.state.loading}
          onClick={() => this.setState({ loading: false })}
          style={{ zIndex: 2, color: "#fff" }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    );
  }
}

export default Main;
