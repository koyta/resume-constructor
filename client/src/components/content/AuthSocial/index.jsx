import React, { Component } from "react";
import { Button } from "antd";
import axios from "axios";
import { observer, inject } from "mobx-react";

@inject("routing")
@observer
class AuthSocial extends Component {
  componentDidMount() {}

  onClick = async () => {
    try {
      const response = await axios.get("/auth/github", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
      console.log(response);
      // Возвращает ошибку: OPTIONS <ссылка на авторизацию приложения, которую я их хотел открыть в popup'е> net::ERR_ABORTED и ошибка о CORS
      /** Возвращает ошибку:
       *  OPTIONS <ссылка на авторизацию приложения, которую я их хотел открыть в popup'е> net::ERR_ABORTED
       *
       *  CORS error:
       * Failed to load
       * https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fauth%2Fgithub%2Fcallback&client_id=06c31414a3796833da7d:
       * Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
       * Origin 'http://127.0.0.1:3000' is therefore not allowed access. The response had HTTP status code 404.
       * If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
       */
    } catch (e) {
      console.error("Error: ", e);
    }

    const url = "http://127.0.0.1:5000/auth/github";
    const name = "github_login";
    const specs = "width=700,height=700";
    window.open(url, name, specs);
  };

  render() {
    return (
      <section className="auth-social">
        <Button icon="github" onClick={() => this.onClick()} type="primary">
          Login with GitHub
        </Button>
      </section>
    );
  }
}

export default AuthSocial;
