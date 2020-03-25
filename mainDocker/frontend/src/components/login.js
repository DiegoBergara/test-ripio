import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Input
} from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Welcome extends React.Component {
  state = {
    mail: "",
    password: "",
    registerMail: "",
    registerPass: "",
    registerUsername: "",
    token: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ token });
  }

  onChangeCredential = field => value => {
    this.setState({ [field]: value.target.value });
  };

  login = user => {
    axios
      .post("api/user/login", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        //console.log(res);
        //console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.props.history.push("/home");
      })
      .catch(error => {
        //console.log(error);
      });
  };

  register = user => {
    axios
      .post("api/user/register", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        //console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.props.history.push("/home");
      })
      .catch(error => {
        //console.log(error);
      });
  };

  onLogin = () => {
    const user = {
      username: this.state.mail,
      password: this.state.password
    };
    this.login(user);
  };

  onRegister = () => {
    const user = {
      username: this.state.registerUsername,
      password: this.state.registerPass,
      email: this.state.registerMail
    };
    this.register(user);
  };

  render() {
    if (this.state.token) {
      return <Redirect to="/home"></Redirect>;
    }
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <div
          style={{
            width: 600
          }}
        >
          <Segment basic>
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical>Or</Divider>

              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header icon>
                    <Icon name="sign-in" color="violet" />
                    Log in
                  </Header>
                  <div
                    style={{
                      height: 150,
                      alignItems: "center",
                      justifyContent: "space-around",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Input
                      value={this.state.mail}
                      placeholder="username"
                      onChange={this.onChangeCredential("mail")}
                    />
                    <Input
                      value={this.state.password}
                      type="password"
                      placeholder="password"
                      onChange={this.onChangeCredential("password")}
                    />
                    <Button color="violet" onClick={this.onLogin}>
                      Enter
                    </Button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <Header icon>
                    <Icon name="signup" color="violet" />
                    Register
                  </Header>
                  <div
                    style={{
                      height: 250,
                      alignItems: "center",
                      justifyContent: "space-around",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Input
                      value={this.state.registerMail}
                      placeholder="mail"
                      onChange={this.onChangeCredential("registerMail")}
                    />
                    <Input
                      value={this.state.registerUsername}
                      placeholder="username"
                      onChange={this.onChangeCredential("registerUsername")}
                    />
                    <Input
                      value={this.state.registerPass}
                      type="password"
                      placeholder="password"
                      onChange={this.onChangeCredential("registerPass")}
                    />
                    <Button color="violet" onClick={this.onRegister}>
                      Register
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
