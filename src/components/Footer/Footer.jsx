import React from "react";

function Footer() {
  return (
    <div className="bg-gray-300 p-2 ">
      <h1 className="font-semibold text-3xl text-red-500">registered user info for testing :</h1>
      <ol class="list-decimal pl-5">
        <li>
          {" "}
          User 1
          <ul className="list-disc pl-5">
            <li>name : one</li>
            <li>email : one@mail.com </li>
            <li>password: one</li>
          </ul>
        </li>
        <li>
          {" "}
          User 2
          <ul className="list-disc pl-5">
            <li>name : two</li>
            <li>email : two@mail.com </li>
            <li>password: two</li>
          </ul>
        </li>
          
         <li>
            ....till user 7
         </li>
      </ol>
    </div>
  );
}

export default Footer;
