import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider} from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from "sweetalert2";

function Header(props){
  let navigate = useNavigate();

let getTokenDetails = () => {
  let token = localStorage.getItem("auth-token")
  if(token === null)
  {
    return false;
  }
  else{
    return jwt_decode(token);
  }
}

let [userLogin,setUserLogin] = useState(getTokenDetails());

  let onSuccess = (credentialResponse)=>
  {
    let token = credentialResponse.credential;
    let data = jwt_decode(token);
    // console.log(data);
    // save the data
    localStorage.setItem("auth-token",token);
    Swal.fire({
      icon: 'success',
      title: 'Login Successfully ',
      text: 'Welcome to Zomato!',
    })
    .then(()=>
    { 
      window.location.reload();

    })
    
    // alert('user login successfully');
  };

  
  let onError =() =>{
    // alert("Login fail");
    Swal.fire({
      icon: 'error',
      title: 'Login Failed!!',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  };

  let logout =() =>
  {
    // remove the adta from the local storage
    localStorage.removeItem("auth-token");
    // alert("User Logout Successfully");
    Swal.fire({
      icon: 'success',
      title: 'User Logout Successfully ',
      text: 'LogOut to Zomato Site!',
    })
    .then(()=>
    { 
      setUserLogin(false);
      window.location.reload();

    })
    
    
   

  }
    return (<>


    
<GoogleOAuthProvider clientId ="67689682803-lk4a458n1sgcidj63m0bf5l92mmslbgv.apps.googleusercontent.com">
{/* Login */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sign-In</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <GoogleLogin onSuccess ={onSuccess}
        onerror={onError}
        
        />;
      </div>
     
    </div>
  </div>
</div>
{/* create Account */}

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Sign Up</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
   
      <div className="modal-body">
   <div class="form-floating mb-3">
  <input type="email" class="form-control " id="floatingInput" placeholder="Enter FullName" />
  <label for="floatingInput">Full Name</label>
</div>
      <div class="form-floating mb-3">
  <input type="email" class="form-control " id="floatingInput" placeholder="Enter Email-Address" />
  <label for="floatingInput">Email address</label>
</div>

<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Password" />
  <label for="floatingPassword">Password</label>
</div>
      </div>
      <div className="modal-footer d-flex flex-column" >
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary">Submit</button>
        <p className="pull-right" >Already registered <span className="text-danger">Go to Login Option!!</span></p>
      </div>
    </div>
  </div>
</div>

         <header className="row">
      <div className={"col-12  p-2 " + props.color}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p className="m-0 logo d-flex justify-content-center cursor-pointer align-items-center fw-bold fs-4" onClick={() =>{
            navigate("/")
          }}>
            e!
          </p>
          { userLogin ? ( <div className="d-flex">
            <p className="mt-2 me-3 fw-bold text-white">Welcome, {userLogin.given_name}</p>
            <button className="btn btn-outline-light" onClick={logout}>Logout</button>
          </div>) : (
            <div>
            <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
            <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create An account</button>
          </div>
          )}
           
        </div>
      </div>
    </header>
</GoogleOAuthProvider>
    </>);
}

export default Header;