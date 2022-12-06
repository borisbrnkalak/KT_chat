import React, { useContext } from "react";
import SocketContext from "../Context/SocketContext";

const FormUser = () => {
  const { handleSubmitUsername } = useContext(SocketContext);

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitUsername}
        method="POST"
      >
        <label>Používateľove meno:</label>
        <input type="text" placeholder="Sem zadajte meno" />
        <button className="text-right">Prihlas</button>
      </form>
    </div>
  );
};

export default FormUser;
