import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  inputContainer: {
    position: "relative",
    width: "100%",
    margin: "10px 0",
  },
  input: {
    outline: "none",
    border: "none",
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#edf5f3",
    fontSize: "14px",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0",
  },
  checkbox: {
    marginRight: "10px",
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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved credentials if rememberMe was checked
    const savedCredentials = JSON.parse(localStorage.getItem("credentials"));
    if (savedCredentials) {
      setData(savedCredentials);
      setRememberMe(true);
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`, data);
      localStorage.setItem("token", res.data);

      // Save credentials if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem("credentials", JSON.stringify(data));
      } else {
        localStorage.removeItem("credentials");
      }

      navigate("/Dashboard");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again!");
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
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              style={styles.input}
            />

            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                style={styles.input}
              />
              <div style={styles.eyeIcon} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {error && <div style={styles.errorMsg}>{error}</div>}
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                style={styles.checkbox}
              />
              <label>Remember Me</label>
            </div>
            <button type="submit" style={styles.greenBtn}>
              Sign In
            </button>
          </form>
        </div>
        <div style={styles.right}>
          <h1 style={styles.rightH1}>New Here?</h1>
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
