import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  loginContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginFormContainer: {
    width: "900px",
    height: "500px",
    display: "flex",
    borderRadius: "10px",
    boxShadow:
      "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
  },
  left: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainerH1: {
    fontSize: "40px",
    marginTop: 0,
  },
  input: {
    outline: "none",
    border: "none",
    width: "370px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#edf5f3",
    margin: "5px 0",
    fontSize: "14px",
  },
  errorMsg: {
    width: "370px",
    padding: "15px",
    margin: "5px 0",
    fontSize: "14px",
    backgroundColor: "#f34646",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF69B4",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  rightH1: {
    marginTop: 0,
    color: "white",
    fontSize: "40px",
    alignSelf: "center",
  },
  whiteBtn: {
    border: "none",
    outline: "none",
    padding: "12px 0",
    backgroundColor: "white",
    borderRadius: "20px",
    width: "180px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },
  greenBtn: {
    border: "none",
    outline: "none",
    padding: "12px 0",
    backgroundColor: "#FF69B4",
    color: "white",
    borderRadius: "20px",
    width: "180px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    margin: "10px",
  },
};

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`;
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      navigate("/Dashboard");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginFormContainer}>
        <div style={styles.left}>
          <form style={styles.formContainer} onSubmit={handleSubmit}>
            <h1 style={styles.formContainerH1}>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              style={styles.input}
            />
            {error && <div style={styles.errorMsg}>{error}</div>}
            <button type="submit" style={styles.greenBtn}>
              Sign In
            </button>
          </form>
        </div>
        <div style={styles.right}>
          <h1 style={styles.rightH1}>New Here ?</h1>
          <Link to="/Sign-up">
            <button type="button" style={styles.whiteBtn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
