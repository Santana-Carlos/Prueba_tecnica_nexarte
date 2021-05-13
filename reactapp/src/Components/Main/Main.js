import React, { Component } from "react";
import { Container, Select, MenuItem } from "@material-ui/core";
import { StyledTextField, StyledInput } from "../StyledComponents";
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
      api_modelo: [],
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
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const check = e.target.checked;

    switch (name) {
      case "input_modelo":
        this.setState({ temp_modelo: value });
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

          <div className="o-label">{"Modelo"}</div>
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
        </div>
      </Container>
    );
  }
}

export default Main;
