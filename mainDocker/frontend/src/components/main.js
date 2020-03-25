import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Grid,
  Header,
  Dropdown,
  Input,
  Table
} from "semantic-ui-react";
import moment from "moment";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Welcome extends React.Component {
  state = {
    accounts: [],
    currencies: [],
    transactions: [],
    origin: "",
    destiny: "",
    amount: "",
    currency: ""
  };
  componentDidMount() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    this.setState({ token });
    this.setState({ user: JSON.parse(user) });
    this.getAccounts();
    this.getCurrency();
    this.getTransactions();
  }

  onChangeField = field => value => {
    //console.log(value);
    this.setState({ [field]: value.target.value });
  };

  getAccounts = () => {
    const token = localStorage.getItem("token");
    //console.log(token);

    Axios.get("api/data/accountlist", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`
      }
    })
      .then(res => {
        //console.log(res);
        this.setState({ accounts: res.data });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  getCurrency = () => {
    Axios.get("api/data/currency", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        //console.log(res);
        this.setState({ currencies: res.data });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  getTransactions = () => {
    const token = localStorage.getItem("token");
    //console.log(token);

    Axios.get("api/data/transactionlist", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`
      }
    })
      .then(res => {
        //console.log(res);
        this.setState({ transactions: res.data });
      })
      .catch(error => {
        //console.log(error);
      });
  };

  makeTransaction = transaction => {
    const token = localStorage.getItem("token");
    Axios.post("api/data/transaction", JSON.stringify(transaction), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`
      }
    })
      .then(res => {
        alert("Your transaction has been sent");
        //console.log(res);
        this.getTransactions();
        this.getAccounts();
      })
      .catch(error => {
        alert("Error making your transaction.");
        //console.log(error);
      });
  };

  creteAccount = account => {
    const token = localStorage.getItem("token");
    Axios.post("api/data/account", JSON.stringify(account), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`
      }
    })
      .then(res => {
        alert("Your account has been created with gift funds!");
        //console.log(res);
        this.getAccounts();
      })
      .catch(error => {
        alert("Error creating your account.");
        //console.log(error);
      });
  };

  logOut = () => {
    const token = localStorage.getItem("token");
    Axios.post(
      "api/user/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`
        }
      }
    )
      .then(res => {
        //console.log(res);
        alert("You logged out.");
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        this.props.history.push("/");
      })
      .catch(error => {
        //console.log(error);
      });
  };

  onCreateAccount = () => {
    const account = { currency: this.state.currency };
    this.creteAccount(account);
  };

  onMakeTransaction = () => {
    const transaction = {
      origin: this.state.origin,
      destiny: this.state.destiny,
      amount: this.state.amount,
      description: ""
    };
    this.makeTransaction(transaction);
  };

  handleOnChange = (e, data) => {
    this.setState({ currency: data.value });
  };

  render() {
    if (this.state.token === "") {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div style={{ alignItems: "center" }}>
        <div
          style={{
            right: 30,
            width: 200,
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline"
          }}
        >
          <Header as="h3" color="violet" style={{ width: 1000 }}>
            {`User: ${this.state.user ? this.state.user.username : ""}`}
          </Header>
          <Button onClick={this.logOut} color="red">
            Logout
          </Button>
        </div>
        <div
          style={{
            padding: 40
            //   position: "fixed",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%,-50%)"
          }}
        >
          <div style={{}}>
            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h3" color="violet">
                    Accounts
                  </Header>
                  <div style={{ overflow: "auto", maxHeight: 350 }}>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Number</Table.HeaderCell>
                          <Table.HeaderCell>Currency</Table.HeaderCell>
                          <Table.HeaderCell>Balance</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {this.state.accounts.map((account, index) => {
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{account.account_id}</Table.Cell>
                              <Table.Cell>{account.currency}</Table.Cell>
                              <Table.Cell>
                                {account.funds.toFixed(3)}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" color="violet">
                    Make Transaction
                  </Header>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Input
                      onChange={this.onChangeField("origin")}
                      placeholder="From"
                      style={{ width: "45%" }}
                    ></Input>
                    :
                    <Input
                      onChange={this.onChangeField("destiny")}
                      style={{ width: "45%" }}
                      placeholder="To"
                    ></Input>
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Input
                      onChange={this.onChangeField("amount")}
                      placeholder="Amount"
                      style={{ width: "100%" }}
                    ></Input>
                  </div>
                  <Button
                    onClick={this.onMakeTransaction}
                    style={{ marginTop: 10 }}
                    fluid
                    color="violet"
                  >
                    Send!
                  </Button>
                  <Header as="h3" color="violet">
                    Create Account
                  </Header>
                  <Header style={{ marginTop: -10 }} as="h4">
                    For the currency:
                  </Header>
                  <Dropdown
                    onChange={this.handleOnChange}
                    clearable
                    fluid
                    search
                    selection
                    options={this.state.currencies.map((cur, index) => ({
                      key: index,
                      text: `${cur.currency_name} => USD ${cur.exchange_rate}`,
                      value: cur.currency_name
                    }))}
                    placeholder="Select Currency"
                  />
                  <Button
                    onClick={this.onCreateAccount}
                    style={{ marginTop: 10 }}
                    color="violet"
                    fluid
                  >
                    Create
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3" color="violet">
                    Transactions
                  </Header>
                  <div style={{ overflow: "auto", maxHeight: 350 }}>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Number</Table.HeaderCell>
                          <Table.HeaderCell>Origin Account</Table.HeaderCell>
                          <Table.HeaderCell>Destiny Account</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {this.state.transactions.map((transaction, index) => {
                          let date = moment(transaction.date_time).format(
                            "DD/MM/YY"
                          );
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>
                                {transaction.transaction_id}
                              </Table.Cell>
                              <Table.Cell>{transaction.origin}</Table.Cell>
                              <Table.Cell>{transaction.destiny}</Table.Cell>
                              <Table.Cell>{`${transaction.transaction_currency} ${transaction.amount}`}</Table.Cell>
                              <Table.Cell>{date}</Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img src={require("../assets/ripio-footer.png")} alt="footer" />
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
