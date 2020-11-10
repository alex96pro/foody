import React from 'react';
//import axios from 'axios';
//import {Link} from 'react-router-dom';
function ChangePassword(){

        return (
        <div>
            <h2>Change Password</h2>
            <form>
                Old password<input
                type="password"
                name="oldPassword"
                /><br></br>
                New password<input
                type="password"
                name="oldPassword"
                /><br></br>
                Retype password<input
                type="password"
                name="oldPassword"
                /><br></br>
                <button type="submit">Confirm</button>
            </form>
        </div>
        );
}

export default ChangePassword;
