import "../Style/Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if passwords match
    if (password !== confpassword) {
      alert("Passwords don't match");
      return; // Stop the function if passwords don't match
    }

    const data = {
      email,
      password,
      firstName,
      lastName,
      age,
      phone,
      gender
    };

    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        console.log("Registered successfully");
        navigate("/login"); // Navigate to login on successful registration
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="bg-img">
      <div className="registerContent">
        <header>Register Form</header>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <h6>First name</h6>
            </div>
            <div className="col">
              <h6>Last name</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Last Name"
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Email</h6>
            </div>
            <div className="col">
              <h6>Phone number</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Phone"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Password</h6>
            </div>
            <div className="col">
              <h6>Confirm password</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="field">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Confirm password"
                  onChange={(event) => setconfPassword(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Age</h6>
            </div>
            <div className="col">
              <h6>Gender</h6>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field">
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Age"
                  onChange={(event) => setAge(event.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col inline">
                  <label className="radio-inline">
                    <input type="text" name="gender" onChange={(event) => setGender(event.target.value)} />
                  </label>
                </div>
                {/* Uncomment the below code for gender options */}
                {/* <div className="col inline">
                  <label className="radio-inline">
                    <input type="radio" name="gender" value="female"/>
                    Female
                  </label>
                </div> */}
              </div>
            </div>
          </div>
          <div className="field space">
            <input type="submit" value="Register Now" />
          </div>
        </form>
        <div className="signup space">
          Already have an account?
          <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
